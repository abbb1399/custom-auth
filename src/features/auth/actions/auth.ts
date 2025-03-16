"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "../schemas/auth";
import { db } from "@/drizzle/db";
import { OAuthProvider, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../../../auth/passwordHasher";
import { cookies } from "next/headers";
import {
  createUserSession,
  removeUserFromSession,
} from "../../../auth/session";
import { getOAuthClient } from "@/auth/oauth/base";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "로그인 할 수 없습니다.";

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  });

  if (user == null || user.password == null || user.salt == null) {
    return "로그인 할 수 없습니다.";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "로그인 할 수 없습니다.";

  await createUserSession(user, await cookies());

  redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "계정을 생성할 수 없습니다.";

  // 유저가 존재 할때
  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return "Account already exists for this email";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) return "계정을 생성할 수 없습니다.";
    await createUserSession(user, await cookies());
  } catch {
    return "계정을 생성할 수 없습니다.";
  }

  redirect("/");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
}

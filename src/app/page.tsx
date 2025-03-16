import { LogOutButton } from "@/features/auth/components/LogOutButton";
import { getCurrentUser } from "@/features/auth/db/currentUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function HomePage() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <div className="container mx-auto p-4">
      {fullUser == null ? (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">로그인</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">회원가입</Link>
          </Button>
        </div>
      ) : (
        <Card className="max-w-[500px] mt-4">
          <CardHeader>
            <CardTitle>유저: {fullUser.name}</CardTitle>
            <CardDescription>권한: {fullUser.role}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/private">권한 페이지</Link>
            </Button>
            {fullUser.role === "admin" && (
              <Button asChild variant="outline">
                <Link href="/admin">어드민 페이지</Link>
              </Button>
            )}
            <LogOutButton />
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

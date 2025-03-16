import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToggleRoleButton } from "./ToggleRoleButton";
import { getCurrentUser } from "@/features/auth/db/currentUser";

export default async function PrivatePage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-8">권한: {currentUser.role}</h1>
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}

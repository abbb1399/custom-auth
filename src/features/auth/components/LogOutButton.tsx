"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions/auth";

export function LogOutButton() {
  return (
    <Button variant="destructive" onClick={async () => await logOut()}>
      로그아웃
    </Button>
  );
}

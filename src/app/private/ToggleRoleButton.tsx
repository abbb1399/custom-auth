"use client";

import { toggleRole } from "@/features/auth/actions/toggleRole";
import { Button } from "@/components/ui/button";

export function ToggleRoleButton() {
  return <Button onClick={toggleRole}>권한 변경</Button>;
}

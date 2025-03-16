import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUp() {
  return (
    <div className="container mx-auto p-4 max-w-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}

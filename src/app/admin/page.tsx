import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-8">어드민</h1>
      <Button asChild>
        <Link href="/">홈</Link>
      </Button>
    </div>
  )
}

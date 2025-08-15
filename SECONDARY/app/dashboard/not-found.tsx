import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, AlertCircle } from "lucide-react"

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">Dashboard Page Not Found</CardTitle>
          <CardDescription className="text-gray-600">
            The dashboard page you're looking for doesn't exist or you don't have permission to access it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/help">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Get Help
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

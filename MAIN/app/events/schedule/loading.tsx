import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ScheduleLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <Skeleton className="h-6 w-6" />
        <div className="h-4 w-px bg-gray-200 mx-2" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-9 w-32" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Tabs skeleton */}
          <div className="space-y-6">
            <div className="flex space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>

            {/* Week view skeleton */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="min-h-[200px] p-3 border rounded-lg bg-white">
                      <div className="text-center mb-3">
                        <Skeleton className="h-4 w-8 mx-auto mb-1" />
                        <Skeleton className="h-6 w-6 mx-auto" />
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, j) => (
                          <div key={j} className="p-2 rounded bg-gray-50">
                            <Skeleton className="h-3 w-full mb-1" />
                            <Skeleton className="h-3 w-16 mb-1" />
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-12" />
                              <Skeleton className="h-3 w-8" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

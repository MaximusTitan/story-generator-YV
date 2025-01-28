import { Nav } from "@/components/nav"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="container py-8 flex-1">
        <div className="grid md:grid-cols-[400px_1fr] gap-8">
          {/* Left Column - Image Skeleton */}
          <Skeleton className="aspect-square rounded-lg" />

          {/* Right Column - Content Skeletons */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              
              <div className="space-y-2 border-b pb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


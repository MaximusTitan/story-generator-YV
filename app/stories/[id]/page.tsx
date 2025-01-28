import { getStory } from "@/app/actions"
import { Nav } from "@/components/nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Download } from "lucide-react"
import { PdfDownloadButton } from "@/components/pdf-download-button"

export default async function StoryPage({
  params,
}: {
  params: { id: string }
}) {
  const story = await getStory(params.id)

  if (!story) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="container mx-auto max-w-7xl py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{story.title}</h1>
          <PdfDownloadButton story={story} />
        </div>
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Left Column - Image and Metadata */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={story.image_url || "/placeholder.svg"}
                alt={`Illustration for ${story.title}`}
                fill
                className="object-cover"
                priority
                unoptimized={story.image_url?.startsWith('https://gwezhkxsqxczwxcptmhw.supabase.co')}
              />
            </div>
            <div className="space-y-2">
              <div>
                <div className="font-semibold">Story Description</div>
                <div className="text-sm text-muted-foreground">{story.description}</div>
              </div>
              <div>
                <div className="font-semibold">Target Age</div>
                <div className="text-sm text-muted-foreground">{story.target_age}</div>
              </div>
              <div>
                <div className="font-semibold">Genre</div>
                <div className="text-sm text-muted-foreground capitalize">{story.genre}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Story Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">{story.title}</h1>
              <p className="text-lg text-muted-foreground">{story.summary}</p>
            </div>

            <div className="space-y-8 leading-relaxed">
              {story.scenes.map((scene) => (
                <div key={scene.id} className="prose prose-slate dark:prose-invert max-w-none">
                  {scene.title && <h2 className="text-2xl font-semibold mb-4">{scene.title}</h2>}
                  <p className="whitespace-pre-wrap">{scene.content}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-6 border-t">
              <div className="space-x-4">
                <Link href="/stories">
                  <Button variant="outline">Back to Stories</Button>
                </Link>
                <Link href="/create">
                  <Button>Create Another Story</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import { getAllStories } from "@/app/actions"
import { Nav } from "@/components/nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { PdfDownloadButton } from "@/components/pdf-download-button"

export default async function StoriesPage() {
  const stories = await getAllStories()

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="container mx-auto max-w-7xl py-8 flex-1">
        <h1 className="text-2xl font-semibold mb-6">All Stories</h1>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Story Title</TableHead>
                <TableHead className="hidden md:table-cell">Story Description</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Story Genre</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="font-medium">{formatDate(story.created_at)}</TableCell>
                  <TableCell>
                    <Link href={`/stories/${story.id}`} className="text-blue-600 hover:underline">
                      {story.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-md truncate">{story.description}</TableCell>
                  <TableCell>{story.target_age}</TableCell>
                  <TableCell className="capitalize">{story.genre}</TableCell>
                  <TableCell>
                    <PdfDownloadButton 
                      story={story} 
                      variant="outline" 
                      showLabel={false} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}


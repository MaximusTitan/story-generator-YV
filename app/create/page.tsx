import { StoryForm } from "@/components/story-form"
import { Nav } from "@/components/nav"

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="container mx-auto max-w-3xl py-8 flex-1">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Create a New Story</h1>
        <StoryForm />
      </div>
    </div>
  )
}


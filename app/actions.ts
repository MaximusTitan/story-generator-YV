"use server"

import { createClient } from "@supabase/supabase-js"
import { generateStoryContent } from "@/lib/story-generator"
import { generateImage } from "@/lib/image-generator"
import { downloadAndStoreImage } from "@/lib/image-storage"
import type { Story, StoryFormData } from "@/lib/types"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function createStory(data: StoryFormData): Promise<{ id: string }> {
  try {
    const content = await generateStoryContent(data)

    let imageUrl = "/placeholder.svg"
    try {
      console.log("Generating image with prompt:", content.imagePrompt)
      const dalleImageUrl = await generateImage(content.imagePrompt)
      console.log("Generated DALL-E image URL:", dalleImageUrl)

      imageUrl = await downloadAndStoreImage(dalleImageUrl, data.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase())
      console.log("Stored image URL:", imageUrl)
    } catch (imageError) {
      console.error("Failed to generate/store image:", imageError)
    }

    const { data: story, error: storyError } = await supabase
      .from("stories")
      .insert({
        title: data.title,
        description: data.description,
        target_age: data.targetAge,
        genre: data.genre,
        summary: content.summary,
        image_url: imageUrl,
      })
      .select()
      .single()

    if (storyError) throw storyError

    for (let i = 0; i < content.scenes.length; i++) {
      const scene = content.scenes[i]

      const { error: sceneError } = await supabase.from("scenes").insert({
        story_id: story.id,
        title: scene.title,
        content: scene.content,
        sequence_number: i + 1,
      })

      if (sceneError) throw sceneError
    }

    return { id: story.id }
  } catch (error) {
    console.error("Error creating story:", error)
    throw new Error("Failed to create story")
  }
}

export async function getStory(id: string): Promise<Story | null> {
  try {
    const { data: story, error: storyError } = await supabase
      .from("stories")
      .select(`
        *,
        scenes (*)
      `)
      .eq("id", id)
      .single()

    if (storyError) throw storyError

    return story
  } catch (error) {
    console.error("Error fetching story:", error)
    return null
  }
}

export async function getAllStories(): Promise<Story[]> {
  try {
    const { data: stories, error } = await supabase
      .from("stories")
      .select(`
        *,
        scenes (*)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    return stories || []
  } catch (error) {
    console.error("Error fetching stories:", error)
    return []
  }
}


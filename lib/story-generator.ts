import { StoryContent, StoryFormData } from "./types"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { generateImage } from "./image-generator"
import { downloadAndStoreImage } from "./image-storage"

export async function generateStoryContent(data: StoryFormData): Promise<StoryContent> {
  try {
    const prompt = `Create an engaging story based on:
Title: ${data.title}
Description: ${data.description}
Target Age: ${data.targetAge}
Genre: ${data.genre}

Generate a story with 3 scenes. Provide:
1. A brief summary of the entire story
2. A detailed image prompt that captures the essence of the entire story
3. For each scene, provide:
   a. A scene title
   b. The scene content

Format the response as a JSON object with this structure:
{
  "summary": "Brief story summary",
  "imagePrompt": "Detailed image generation prompt for the entire story",
  "scenes": [
    {
      "id": "scene-1",
      "title": "Scene title",
      "content": "Scene content"
    }
  ]
}

Do not include triple backticks or any code fences in your reply. Only return valid JSON.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    const content: StoryContent = JSON.parse(text)

    console.log("Generated story content:", content)

    return content
  } catch (error) {
    console.error("Error generating story content:", error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw new Error("Failed to generate story content")
  }
}


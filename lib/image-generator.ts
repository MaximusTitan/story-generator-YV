import { openai } from "@ai-sdk/openai"

export async function generateImage(prompt: string): Promise<string> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    
    if (!response.ok || !data.url) {
      console.error('Image generation failed:', data);
      throw new Error(data.error || 'Failed to generate image');
    }

    return data.url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}


import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function downloadAndStoreImage(imageUrl: string, storyId: string, sceneNumber: number): Promise<string> {
  try {
    console.log('Downloading image from:', imageUrl)
    
    // Download the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`)
    }
    const imageBuffer = await response.arrayBuffer()

    // Generate a unique file name
    const fileName = `story_${storyId}_scene${sceneNumber}_${Date.now()}.png`
    const filePath = `stories/${fileName}`

    console.log('Uploading image to Supabase Storage:', filePath)

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('story-images')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        upsert: true
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      throw new Error(`Failed to upload image: ${uploadError.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('story-images')
      .getPublicUrl(filePath)

    console.log('Generated public URL:', publicUrl)
    return publicUrl
  } catch (error) {
    console.error('Error storing image:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw error
  }
}


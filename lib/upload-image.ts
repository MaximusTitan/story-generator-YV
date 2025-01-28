import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function uploadImageToSupabase(imageUrl: string): Promise<string> {
  try {
    // Download the image
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error('Failed to download image')
    const imageBuffer = await response.arrayBuffer()

    // Generate a unique file name
    const fileName = `hero-image-${Date.now()}.png`
    const filePath = `public/${fileName}`

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('story-images')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        upsert: true
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('story-images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}


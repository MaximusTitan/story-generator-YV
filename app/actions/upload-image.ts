"use server"

import { uploadImageToSupabase } from "@/lib/upload-image"

export async function uploadHeroImage(imageUrl: string) {
  try {
    const publicUrl = await uploadImageToSupabase(imageUrl)
    return { url: publicUrl }
  } catch (error) {
    console.error('Error in uploadHeroImage:', error)
    throw new Error('Failed to upload hero image')
  }
}


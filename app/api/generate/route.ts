import { NextResponse } from 'next/server'
import { fal } from "@fal-ai/client"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    fal.config({
      credentials: process.env.FAL_KEY
    })

    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: body.prompt,
        image_size: "square_hd",
        num_inference_steps: 10,
        num_images: 1,
        enable_safety_checker: true,
        seed: Math.floor(Math.random() * 1000000)
      }
    })

    if (!result.data?.images?.[0]) {
      console.error('No image generated:', result)
      throw new Error('No image generated')
    }

    return NextResponse.json({ url: result.data.images[0].url })
  } catch (error) {
    console.error('Error details:', error)
    return NextResponse.json(
      { error: 'Failed to generate image', details: error }, 
      { status: 500 }
    )
  }
}
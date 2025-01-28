export type Story = {
  id: string
  user_id?: string
  title: string
  description: string
  target_age: string
  genre: string
  summary: string
  image_url?: string
  created_at: string
  updated_at: string
  scenes: Scene[]
}

export type Scene = {
  id: string
  story_id: string
  title: string
  content: string
  sequence_number: number
  created_at: string
  updated_at: string
}

export type StoryFormData = {
  title: string
  description: string
  targetAge: string
  genre: string
}

export type StoryContent = {
  summary: string
  imagePrompt: string
  scenes: {
    id: string
    title: string
    content: string
  }[]
}


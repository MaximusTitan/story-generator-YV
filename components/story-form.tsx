"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createStory } from "@/app/actions"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { StoryFormData } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  targetAge: z.string().min(1, {
    message: "Please select a target age group.",
  }),
  genre: z.string().min(1, {
    message: "Please select a genre.",
  }),
})

export function StoryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<StoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      targetAge: "",
      genre: "",
    },
  })

  async function onSubmit(values: StoryFormData) {
    setIsLoading(true)
    try {
      const { id } = await createStory(values)
      router.push(`/stories/${id}`)
      toast({
        title: "Story created successfully!",
        description: "Your new story has been generated and saved.",
      })
    } catch (error) {
          console.error(error)
          toast({
            title: "Error creating story",
            description: "There was a problem creating your story. Please try again."
          })
        } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of Your Story</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe Your Story</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the Description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Age</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target age group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="children">Children (5-12)</SelectItem>
                  <SelectItem value="teens">Teens (13-17)</SelectItem>
                  <SelectItem value="youngAdult">Young Adult (18-25)</SelectItem>
                  <SelectItem value="adult">Adult (26+)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre of the Story</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="scifi">Science Fiction</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="mystery">Mystery</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating Story..." : "Generate Story"}
        </Button>
      </form>
    </Form>
  )
}


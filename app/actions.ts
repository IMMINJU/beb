"use server"

import { createClient } from "@/utils/supabase/server"

export async function createPost(category: string, tweet_url: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .insert([{ category, tweet_url }])

  if (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }

  return data
}

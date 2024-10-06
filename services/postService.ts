import type { Category } from "@/constant/categories"
import { PAGE_SIZE } from "@/constant/pagination"
import supabase from "@/lib/supabaseClient"

export const fetchPosts =
  (category?: Category) =>
  async ({ pageParam = 1 }) => {
    const query = supabase.from("posts").select("*")

    if (category) {
      query.eq("category", category)
    }

    const { data, error } = await query
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }
    return data
  }

export const createPost = async (
  category: string,
  tweet_url: string,
  comment?: string
) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ category, tweet_url, comment }])

  if (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }

  return data
}

export const editPost = async (
  id: string,
  category: string,
  comment?: string
): Promise<void> => {
  const { data, error } = await supabase
    .from("posts")
    .update({ category, comment })
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deletePost = async (id: string): Promise<void> => {
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  return
}

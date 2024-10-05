import { createClient } from "@/utils/supabase/server"
import { QueryClient } from "@tanstack/react-query"
import MainList from "./main-list"
import type { Category } from "@/constant/categories"
import { PAGE_SIZE } from "@/constant/pagination"

export const revalidate = 0

async function fetchPosts(category?: Category) {
  const supabase = createClient()

  let query = supabase.from("posts").select("*")

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query
    .range(0, PAGE_SIZE - 1)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

interface Props {
  category?: Category
}

export default async function Main({ category }: Props) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["posts", category],
    queryFn: async () => await fetchPosts(category),
  })

  return <MainList category={category} />
}

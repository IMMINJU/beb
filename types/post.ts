import type { Category } from "@/constant/categories"

export type PostType = {
  id: string
  tweet_url: string
  category: Category
  comment?: string
}

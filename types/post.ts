export type Category = "all" | "design" | "humor" | "tech"

export type PostType = {
  id: string
  tweet_url: string
  category: Category
  comment?: string
}

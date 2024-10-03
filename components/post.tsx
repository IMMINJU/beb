"use client"

import { Card, CardContent } from "./ui/card"
import TweetEmbed from "./embed"
import clsx from "clsx"
import type { PostType } from "@/types/post"

interface Props {
  post: PostType
}

export default function Post({ post }: Props) {
  // const supabase = createClient()
  // const queryClient = useQueryClient()

  // const deleteMutation = useMutation({
  //   mutationFn: async () => {
  //     const { data, error } = await supabase
  //       .from("posts")
  //       .delete()
  //       .eq("id", post.id)
  //     if (error) {
  //       throw error
  //     }
  //     return data
  //   },
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  // })

  // const handleDelete = () => {
  //   deleteMutation.mutate()
  // }

  return (
    <Card className="mx-auto p-0 bg-[#1e1e1e] border-none max-w-[560px]">
      <CardContent className="relative p-0">
        <div
          className={clsx("relative px-2 dark border-2 rounded-xl", {
            "border-[#0e639c]": post.category === "tech",
            "border-[#FFA500]": post.category === "humor",
            "border-[#8A2BE2]": post.category === "design",
          })}
        >
          <TweetEmbed
            tweetId={post.tweet_url.split("/").slice(-1)[0]}
            {...post}
          />
        </div>
      </CardContent>
    </Card>
  )
}

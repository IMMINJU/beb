"use client"

import { Card, CardContent } from "./ui/card"
import TweetEmbed from "./embed"
import clsx from "clsx"
import type { PostType } from "@/types/post"

interface Props {
  post: PostType
}

export default function Post({ post }: Props) {
  return (
    <Card className="mx-auto p-0 bg-[#1e1e1e] border-none max-w-[560px]">
      <CardContent className="relative p-0">
        <div
          className={clsx("relative px-2 dark border-2 rounded-xl", {
            "border-[#0e639c]": post.category === "tech",
            "border-[#FFA500]": post.category === "humor",
            "border-[#8A2BE2]": post.category === "design",
            "border-[#10B981]": post.category === "book",
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

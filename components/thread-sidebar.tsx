"use client"

import { Send } from "lucide-react"
import { useState } from "react"
import "react-loading-skeleton/dist/skeleton.css"
import { Button } from "./ui/button"
import type { PostType } from "@/types/post"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"

type Comemnt = {
  id: number
  author: string
  content: string
}

function ThreadSidebar({ post }: { post: PostType }) {
  const [newComment, setNewComment] = useState("")

  const threadComments: Comemnt[] = [
    // {
    //   id: 1,
    //   author: "홍길동",
    //   content: "정말 그러네요. 산책하기 좋은 날씨예요!",
    // },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4]">
      <div className="mb-4 p-4 bg-[#252526] rounded-lg">
        {/* <p className="font-semibold">{post.author}</p> */}
        <p>{post.comment}</p>
      </div>
      <ScrollArea className="flex-grow mb-4">
        {threadComments.map((comment) => (
          <div
            key={comment.id}
            className="text-sm mb-4 p-2 bg-[#2d2d2d] rounded-lg"
          >
            <p className="font-semibold text-[#9cdcfe]">{comment.author}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmitComment} className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-grow bg-[#3c3c3c] border-[#007acc] text-[#d4d4d4]"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-[#007acc] hover:bg-[#1f8ad2]"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

export default ThreadSidebar

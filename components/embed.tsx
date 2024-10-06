"use client"

import clsx from "clsx"
import { MessageSquarePlus } from "lucide-react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import type { PostType } from "@/types/post"
import { Sheet, SheetContent } from "./ui/sheet"
import useMediaQuery from "@/hooks/useMediaQuery"
import EditModal from "./edit-modal"
import ThreadSidebar from "./thread-sidebar"
import useEmbed from "@/hooks/useEmbed"

interface TweetEmbedProps extends PostType {
  tweetId: string
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ tweetId, ...post }) => {
  const isLargeScreen = useMediaQuery("(min-width: 640px)")
  const { containerRef, isLoading, iframePosition } = useEmbed({ tweetId })
  const [selectedPostId, setSelectedPostId] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <div className="relative">
        <div className={clsx({ hidden: !isLoading })}>
          <Skeleton height={300} baseColor="#1a1a1a" highlightColor="#333333" />
        </div>

        {iframePosition && (
          <div className={clsx("mt-2", { hidden: isLoading })}>
            {post.comment ? (
              <div className="bg-gray-700 rounded-lg flex items-stretch h-8 overflow-hidden">
                <Badge
                  variant="secondary"
                  onClick={() => setIsEditModalOpen((prev) => !prev)}
                  className={clsx(
                    "text-white text-xs rounded-none flex items-center justify-center px-2 py-1 transition-opacity hover:opacity-80 cursor-pointer",
                    {
                      "bg-[#0e639c] hover:bg-[#0e639c]":
                        post.category === "tech",
                      "bg-[#FFA500] hover:bg-[#FFA500]":
                        post.category === "humor",
                      "bg-[#8A2BE2] hover:bg-[#8A2BE2]":
                        post.category === "design",
                      "bg-[#10B981] hover:bg-[#10B981]":
                        post.category === "book",
                    }
                  )}
                >
                  {post.category}
                </Badge>
                <div className="flex-grow flex items-center px-2 space-x-2 min-w-0">
                  <p className="text-sm text-gray-300 truncate flex-grow">
                    {post.comment}
                  </p>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 p-0 h-auto flex-shrink-0"
                    onClick={() => setSelectedPostId(true)}
                  >
                    <MessageSquarePlus className="h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            ) : (
              <Badge
                variant="secondary"
                onClick={() => setIsEditModalOpen((prev) => !prev)}
                className={clsx(
                  "text-white text-xs rounded-lg h-8 w-min flex items-center justify-center px-2 py-1 transition-opacity hover:opacity-80 cursor-pointer",
                  {
                    "bg-[#0e639c] hover:bg-[#0e639c]": post.category === "tech",
                    "bg-[#FFA500] hover:bg-[#FFA500]":
                      post.category === "humor",
                    "bg-[#8A2BE2] hover:bg-[#8A2BE2]":
                      post.category === "design",
                    "bg-[#10B981] hover:bg-[#10B981]": post.category === "book",
                  }
                )}
              >
                {post.category}
              </Badge>
            )}
          </div>
        )}

        <div ref={containerRef} className={clsx({ "opacity-0": isLoading })} />
      </div>

      <EditModal
        post={post}
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
      />

      <Sheet
        open={selectedPostId}
        onOpenChange={() => setSelectedPostId(false)}
      >
        <SheetContent
          side={isLargeScreen ? "right" : "bottom"}
          className="sm:w-[500px] bg-[#252526] border-l-[#007acc]"
        >
          <ThreadSidebar post={post} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default TweetEmbed

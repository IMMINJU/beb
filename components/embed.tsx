"use client"

import clsx from "clsx"
import { MessageSquarePlus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import type { PostType } from "@/types/post"

interface TweetEmbedProps extends PostType {
  tweetId: string
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({
  category,
  comment,
  tweetId,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const messageRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [iframePosition, setIframePosition] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // 이전에 삽입된 트윗 제거
    containerRef.current.innerHTML = ""
    if (messageRef.current) messageRef.current.innerHTML = ""
    // 트윗 삽입을 위한 blockquote 생성
    const blockquote = document.createElement("blockquote")
    blockquote.className = "twitter-tweet"
    blockquote.setAttribute("data-theme", "dark")

    const anchor = document.createElement("a")
    anchor.href = `https://twitter.com/x/status/${tweetId}`
    blockquote.appendChild(anchor)

    // blockquote를 container에 삽입
    containerRef.current.appendChild(blockquote)

    // 트위터 embed script 로드
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    const observer = new MutationObserver(() => {
      if (containerRef.current && containerRef.current.clientHeight > 0) {
        // 트윗이 로드되었으면 스켈레톤을 숨기고 observer를 해제
        setIsLoading(false)
        observer.disconnect()
      }
    })

    // containerRef에 observer를 연결
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      })
    }

    script.onload = () => {
      const iframe = document.querySelector("iframe")
      if (iframe) {
        // `getBoundingClientRect`를 사용해 `iframe`의 위치와 크기 가져오기
        const iframeRect = iframe.getBoundingClientRect()
        setIframePosition(iframeRect)
      }
    }

    // 컴포넌트 언마운트 시 script 제거
    return () => {
      document.body.removeChild(script)
      observer.disconnect()
    }
  }, [tweetId])

  const addComment = () => {}

  return (
    <div className="relative">
      <div className={clsx({ hidden: !isLoading })}>
        <Skeleton
          height={300}
          baseColor="#1a1a1a" // 스켈레톤의 기본 배경색
          highlightColor="#333333"
        />
      </div>

      {iframePosition && (
        <div className={clsx("mt-2", { hidden: isLoading })}>
          {comment ? (
            <div className="bg-gray-700 rounded-lg flex items-stretch h-8 overflow-hidden">
              <Badge
                variant="secondary"
                className={clsx(
                  "text-white text-xs rounded-none flex items-center justify-center px-2 py-1",
                  {
                    "bg-[#0e639c] hover:bg-[#0e639c]": category === "tech",
                    "bg-[#FFA500] hover:bg-[#FFA500]": category === "humor",
                    "bg-[#8A2BE2] hover:bg-[#8A2BE2]": category === "design",
                  }
                )}
              >
                {category}
              </Badge>
              <div className="flex-grow flex items-center px-2 space-x-2 min-w-0">
                <p className="text-sm text-gray-300 truncate flex-grow">
                  {comment}
                </p>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto flex-shrink-0"
                  onClick={() => {}}
                >
                  <MessageSquarePlus className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          ) : (
            <button type="button" onClick={addComment}>
              <Badge
                variant="secondary"
                className={clsx(
                  "text-white text-xs rounded-lg h-8 w-min flex items-center justify-center px-2 py-1",
                  {
                    "bg-[#0e639c] transition-opacity hover:opacity-80 hover:bg-[#0e639c]":
                      category === "tech",
                    "bg-[#FFA500] transition-opacity hover:opacity-80 hover:bg-[#FFA500]":
                      category === "humor",
                    "bg-[#8A2BE2] transition-opacity hover:opacity-80 hover:bg-[#8A2BE2]":
                      category === "design",
                  }
                )}
              >
                {category}
              </Badge>
            </button>
          )}
        </div>
      )}

      <div ref={containerRef} className={clsx({ "opacity-0": isLoading })} />
    </div>
  )
}

export default TweetEmbed

"use client"

import { useState } from "react"
import TopMenuBar from "@/components/top-menu-bar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import InfiniteScroll from "react-infinite-scroll-component"
import { createClient } from "@/utils/supabase/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import clsx from "clsx"
import {
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
} from "lucide-react"
import { Button } from "./ui/button"
import Post from "./post"

const fetchData =
  (category: string) =>
  async ({ pageParam = 1 }) => {
    const supabase = createClient()
    const query = supabase.from("posts").select("*")

    if (category !== "all") {
      query.eq("category", category)
    }

    const { data, error } = await query
      .range((pageParam - 1) * 10, pageParam * 10 - 1)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }
    return data
  }

export default function Main({ category }: { category: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(true)

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", category],
    queryFn: fetchData(category),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
  })

  const posts = data?.pages.flat() || []

  return (
    <div className="flex flex-col h-screen font-['Consolas',_'Courier_New'] text-sm bg-[#1e1e1e] text-[#d4d4d4]">
      <TopMenuBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
        />

        <div className="flex-1 overflow-hidden bg-[#1e1e1e] p-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center border-b border-[#3c3c3c] pb-2">
              <h2 className="text-xl font-bold text-[#cccccc]">
                Explore Tweets
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTwoColumnLayout((prev) => !prev)}
                className="max-md:hidden bg-zinc-800 border-none hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-sm"
              >
                {isTwoColumnLayout ? (
                  <AlignHorizontalJustifyCenter className="h-4 w-4" />
                ) : (
                  <AlignVerticalJustifyCenter className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div
              id="scrollableDiv"
              className="overflow-auto h-[calc(100vh-60px)] scrollbar-hide"
            >
              <InfiniteScroll
                dataLength={posts.length || 0}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                <div
                  className={clsx("columns-1 gap-4 space-y-4", {
                    "md:columns-2": isTwoColumnLayout,
                  })}
                >
                  {posts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import InfiniteScroll from "react-infinite-scroll-component"
import { useInfiniteQuery } from "@tanstack/react-query"
import Masonry from "react-masonry-css"
import Post from "./post"
import { PAGE_SIZE } from "@/constant/pagination"
import type { Category } from "@/constant/categories"
import { fetchPosts } from "@/services/postService"

interface Props {
  category?: Category
}

export default function Main({ category }: Props) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", category],
    queryFn: fetchPosts(category),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
  })

  const posts = data?.pages.flat() || []

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-[#3c3c3c] pb-2">
        <h2 className="text-xl font-bold text-[#cccccc]">Explore Tweets</h2>
      </div>

      <div
        id="scrollableDiv"
        className="overflow-auto h-[calc(100vh-60px)] scrollbar-hide pb-28"
      >
        <InfiniteScroll
          dataLength={posts.length || 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <Masonry
            breakpointCols={{ default: 2, 1024: 1 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import {
  Palette,
  Laugh,
  Cpu,
  Globe,
  Files,
  Search,
  GitBranch,
  Bug,
  Box,
  GitCommit,
  GitMerge,
  GitPullRequest,
  LayoutGrid,
  Pause,
  Play,
  Repeat,
  StepForward,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { usePathname, useRouter } from "next/navigation"
import type { Category } from "@/types/post"

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

type SidebarView =
  | "explorer"
  | "search"
  | "git"
  | "debug"
  | "extensions"
  | "hidden"

interface Props {
  searchQuery: string
  onChangeSearchQuery: (searchQuery: string) => void
}

const categories: Category[] = ["all", "tech", "design", "humor"]

export default function Sidebar({ searchQuery, onChangeSearchQuery }: Props) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")
  const [sidebarView, setSidebarView] = useState<SidebarView>(
    isLargeScreen ? "explorer" : "hidden"
  )
  const router = useRouter()
  const path = usePathname()
  const pathname = path === "/" ? "all" : path.split("/")[1]

  const categoryIcons = {
    all: <Globe className="h-4 w-4" />,
    design: <Palette className="h-4 w-4" />,
    humor: <Laugh className="h-4 w-4" />,
    tech: <Cpu className="h-4 w-4" />,
  }

  const toggleSidebar = (mode: SidebarView) => {
    setSidebarView((prev) => {
      if (prev === mode) {
        return "hidden"
      }
      return mode
    })
  }

  const ExplorerView = () => (
    <div className="flex flex-col h-full">
      <div className="p-2 flex justify-between items-center">
        <h2 className="text-xs font-semibold text-[#cccccc] uppercase">
          Explorer
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`w-full justify-start text-left pl-2 ${
                category === pathname ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"
              }`}
              onClick={() => router.push(category === "all" ? "/" : category)}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              <span className="text-xs capitalize">{category}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  const SearchView = () => (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <h2 className="text-xs font-semibold text-[#cccccc] uppercase mb-2">
          Search
        </h2>
        <Input
          type="text"
          placeholder="Search tweets..."
          value={searchQuery}
          onChange={(e) => onChangeSearchQuery(e.target.value)}
          className="w-full bg-[#3c3c3c] border-[#6b6b6b] text-[#cccccc] focus:ring-[#007acc] focus:border-[#007acc]"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {/* {filteredProjects.map((post) => (
            <Button
              key={post.id}
              variant="ghost"
              className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
            >
              <FileIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-xs truncate">
                {post.tweet_url.split("/").pop()}
              </span>
            </Button>
          ))} */}
        </div>
      </ScrollArea>
    </div>
  )

  const GitView = () => (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <h2 className="text-xs font-semibold text-[#cccccc] uppercase mb-2">
          Source Control
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <GitCommit className="h-4 w-4 mr-2" />
            <span className="text-xs">Commit changes</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <GitBranch className="h-4 w-4 mr-2" />
            <span className="text-xs">Create branch...</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <GitMerge className="h-4 w-4 mr-2" />
            <span className="text-xs">Merge branch...</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <GitPullRequest className="h-4 w-4 mr-2" />
            <span className="text-xs">Create pull request</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )

  const DebugView = () => (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <h2 className="text-xs font-semibold text-[#cccccc] uppercase mb-2">
          Run and Debug
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <Play className="h-4 w-4 mr-2" />
            <span className="text-xs">Start Debugging</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <Pause className="h-4 w-4 mr-2" />
            <span className="text-xs">Pause</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <StepForward className="h-4 w-4 mr-2" />
            <span className="text-xs">Step Over</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <Repeat className="h-4 w-4 mr-2" />
            <span className="text-xs">Restart</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )

  const ExtensionsView = () => (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <h2 className="text-xs font-semibold text-[#cccccc] uppercase mb-2">
          Extensions
        </h2>
        <Input
          type="text"
          placeholder="Search extensions..."
          className="w-full bg-[#3c3c3c] border-[#6b6b6b] text-[#cccccc] focus:ring-[#007acc] focus:border-[#007acc] mb-2"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {["Python", "JavaScript", "Git Graph", "Prettier"].map(
            (extension) => (
              <div
                key={extension}
                className="flex items-center justify-between p-2 hover:bg-[#2a2d2e]"
              >
                <div className="flex items-center">
                  <LayoutGrid className="h-4 w-4 mr-2 text-[#cccccc]" />
                  <span className="text-xs text-[#cccccc]">{extension}</span>
                </div>
                <Switch />
              </div>
            )
          )}
        </div>
      </ScrollArea>
    </div>
  )

  useEffect(() => {
    setSidebarView(isLargeScreen ? "explorer" : "hidden")
  }, [isLargeScreen])

  return (
    <>
      <aside className="w-12 bg-[#333333] flex flex-col items-center py-2 space-y-4">
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-[#505050] ${
            sidebarView === "explorer" ? "bg-[#505050]" : ""
          }`}
          onClick={() => toggleSidebar("explorer")}
        >
          <Files className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-[#505050] ${
            sidebarView === "search" ? "bg-[#505050]" : ""
          }`}
          onClick={() => toggleSidebar("search")}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-[#505050] ${
            sidebarView === "git" ? "bg-[#505050]" : ""
          }`}
          disabled
          onClick={() => toggleSidebar("git")}
        >
          <GitBranch className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-[#505050] ${
            sidebarView === "debug" ? "bg-[#505050]" : ""
          }`}
          disabled
          onClick={() => toggleSidebar("debug")}
        >
          <Bug className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-[#505050] ${
            sidebarView === "extensions" ? "bg-[#505050]" : ""
          }`}
          disabled
          onClick={() => toggleSidebar("extensions")}
        >
          <Box className="h-5 w-5" />
        </Button>
      </aside>

      {/* Sidebar */}
      {sidebarView !== "hidden" && (
        <div className="w-64 bg-[#252526] h-full overflow-hidden border-r border-[#3c3c3c]">
          {sidebarView === "explorer" && <ExplorerView />}
          {sidebarView === "search" && <SearchView />}
          {sidebarView === "git" && <GitView />}
          {sidebarView === "debug" && <DebugView />}
          {sidebarView === "extensions" && <ExtensionsView />}
        </div>
      )}
    </>
  )
}

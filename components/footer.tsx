"use client"

import { GitBranch, Bell, Check } from "lucide-react"

export default function Footer() {
  return (
    <div className="flex items-center justify-between bg-[#007acc] px-4 py-1 text-white text-xs">
      <div className="flex items-center space-x-4">
        <span className="flex items-center">
          <GitBranch className="h-4 w-4 mr-1" /> main
        </span>
        <span className="flex items-center">
          <Check className="h-4 w-4 mr-1" /> 0 ⚠ 0 ❌
        </span>
      </div>
      <div className="hidden sm:flex items-center space-x-4">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span className="flex items-center">
          <Bell className="h-4 w-4 mr-1" />
        </span>
      </div>
    </div>
  )
}

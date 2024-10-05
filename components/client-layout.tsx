"use client"

import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"
import TopMenuBar from "@/components/top-menu-bar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

const queryClient = new QueryClient()

export function ClientLayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen font-['Consolas',_'Courier_New'] text-sm bg-[#1e1e1e] text-[#d4d4d4]">
        <TopMenuBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-hidden bg-[#1e1e1e] p-4">
            {children}
          </div>
        </div>

        <Footer />
      </div>
    </QueryClientProvider>
  )
}

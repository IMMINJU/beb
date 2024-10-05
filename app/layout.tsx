import type { Metadata } from "next"
import "./globals.css"
import type { PropsWithChildren } from "react"
import { ClientLayout } from "@/components/client-layout"

export const metadata: Metadata = { title: "Beb Kappa" }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

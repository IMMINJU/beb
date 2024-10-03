import type { Metadata } from "next"
import "./globals.css"
import { ReactQueryProvider } from "./react-query-provider"
import type { PropsWithChildren } from "react"

export const metadata: Metadata = { title: "Beb Kappa" }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}

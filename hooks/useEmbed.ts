import { useRef, useState, useEffect } from "react"

interface UseEmbedProps {
  tweetId: string
}

interface UseEmbedReturn {
  containerRef: React.RefObject<HTMLDivElement>
  isLoading: boolean
  iframePosition: DOMRect | null
}

const useEmbed = ({ tweetId }: UseEmbedProps): UseEmbedReturn => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [iframePosition, setIframePosition] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    containerRef.current.innerHTML = ""

    const blockquote = document.createElement("blockquote")
    blockquote.className = "twitter-tweet"
    blockquote.setAttribute("data-theme", "dark")

    const anchor = document.createElement("a")
    anchor.href = `https://twitter.com/x/status/${tweetId}`
    blockquote.appendChild(anchor)

    containerRef.current.appendChild(blockquote)

    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    const observer = new MutationObserver(() => {
      if (containerRef.current && containerRef.current.clientHeight > 0) {
        setIsLoading(false)
        observer.disconnect()
      }
    })

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
        const iframeRect = iframe.getBoundingClientRect()
        setIframePosition(iframeRect)
      }
    }

    return () => {
      document.body.removeChild(script)
      observer.disconnect()
    }
  }, [tweetId])

  return { containerRef, isLoading, iframePosition }
}

export default useEmbed

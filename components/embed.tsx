// app/components/TweetEmbed.tsx
"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TweetEmbedProps {
  tweetId: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ tweetId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // 이전에 삽입된 트윗 제거
    containerRef.current.innerHTML = "";

    // 트윗 삽입을 위한 blockquote 생성
    const blockquote = document.createElement("blockquote");
    blockquote.className = "twitter-tweet";
    blockquote.setAttribute("data-theme", "dark");

    const anchor = document.createElement("a");
    anchor.href = `https://twitter.com/x/status/${tweetId}`;
    blockquote.appendChild(anchor);

    // blockquote를 container에 삽입
    containerRef.current.appendChild(blockquote);

    // 트위터 embed script 로드
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      if (containerRef.current && containerRef.current.clientHeight > 0) {
        // 트윗이 로드되었으면 스켈레톤을 숨기고 observer를 해제
        setIsLoading(false);
        observer.disconnect();
      }
    });

    // containerRef에 observer를 연결
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    // 컴포넌트 언마운트 시 script 제거
    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, [tweetId]);

  return (
    <div className="relative">
      <div className={clsx({ hidden: !isLoading })}>
        <Skeleton
          height={300}
          baseColor="#1a1a1a" // 스켈레톤의 기본 배경색
          highlightColor="#333333"
        />
      </div>

      <div ref={containerRef} className={clsx({ "opacity-0": isLoading })} />
    </div>
  );
};

export default TweetEmbed;

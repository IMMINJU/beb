"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "./ui/card";
import TweetEmbed from "./embed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

type Category = "all" | "design" | "humor" | "tech";

type Project = {
  id: string;
  tweet_url: string;
  category: Category;
};

interface Props {
  post: Project;
  isTwoColumnLayout: boolean;
}

export default function Post({ post, isTwoColumnLayout }: Props) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const [isTagsVisible, setIsTagsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", post.id);
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagContainerRef.current &&
        !tagContainerRef.current.contains(event.target as Node)
      ) {
        setIsTagsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Card
      className="mx-auto p-0 bg-[#1e1e1e] border-none max-w-[560px]"
      onMouseEnter={() => setIsHovered(post.id)}
      onMouseLeave={() => {
        setIsHovered(null);
        setIsTagsVisible(false);
      }}
    >
      <CardContent className="relative p-0">
        <p
          className={clsx("ml-auto text-white py-1 px-2 w-max", {
            "z-10 absolute top-0 right-0": isTwoColumnLayout,
            "bg-[#0e639c]": post.category === "tech",
            "bg-[#FFA500]": post.category === "humor",
            "bg-[#8A2BE2]": post.category === "design",
          })}
        >
          {post.category}
        </p>
        <div
          className={clsx(
            "relative px-2 dark border-2 rounded-tr-none rounded-xl",
            {
              "border-[#0e639c]": post.category === "tech",
              "border-[#FFA500]": post.category === "humor",
              "border-[#8A2BE2]": post.category === "design",
            }
          )}
        >
          <TweetEmbed tweetId={post.tweet_url.split("/").slice(-1)[0]} />
          <AnimatePresence>
            {isHovered === post.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-5 right-16 flex space-x-1"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-[#2d2d2d] hover:bg-[#3c3c3c] text-[#9cdcfe] hover:text-white"
                  onClick={() => setIsTagsVisible(true)}
                >
                  <Edit2 className="h-4 w-4" />
                  {isTagsVisible && (
                    <div
                      ref={tagContainerRef}
                      className="absolute top-8 right-9 mt-2 bg-[#252526] border border-[#3c3c3c] rounded shadow-lg z-10"
                    >
                      {["tech", "humor", "design"]
                        .filter((category) => category !== post.category)
                        .map((tag, index) => (
                          <motion.button
                            key={tag}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onClick={() => {}}
                            className="flex items-center justify-between px-3 py-2 hover:bg-[#2d2d2d]"
                          >
                            <span className="text-[#9cdcfe] text-sm">
                              {tag}
                            </span>
                          </motion.button>
                        ))}
                    </div>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-[#2d2d2d] hover:bg-[#3c3c3c] text-[#9cdcfe] hover:text-red-500"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

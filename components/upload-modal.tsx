"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import type { PostType } from "@/types/post"

async function createPost(category: string, tweet_url: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .insert([{ category, tweet_url }])

  if (error) {
    throw new Error(`Error creating post: ${error.message}`)
  }

  return data
}

type FormValues = Omit<PostType, "id">

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UploadModal({ open, onOpenChange }: Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation<null, Error, FormValues>({
    mutationFn: ({ category, tweet_url }) => createPost(category, tweet_url),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })

  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { tweet_url: "", category: "tech" },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#252526] text-[#cccccc] border border-[#3c3c3c]">
        <DialogHeader>
          <DialogTitle className="text-[#cccccc]">Upload New Tweet</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="tweet_url" className="text-[#cccccc]">
                Tweet URL
              </Label>
              <Input
                {...register("tweet_url", { required: true })}
                autoComplete="off"
                className="w-full bg-[#3c3c3c] border-[#6b6b6b] text-[#cccccc] focus:ring-[#007acc] focus:border-[#007acc]"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="category" className="text-[#cccccc]">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                defaultValue="tech"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full bg-[#3c3c3c] border-[#6b6b6b] text-[#cccccc] focus:ring-[#007acc] focus:border-[#007acc]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="humor">Humor</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              type="button"
              className="bg-[#3c3c3c] text-[#cccccc] hover:bg-[#505050] border-[#6b6b6b]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0e639c] text-white hover:bg-[#1177bb]"
            >
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

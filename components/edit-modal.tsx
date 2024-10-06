import { Controller, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { CATEGORY_LIST } from "@/constant/categories"
import type { PostType } from "@/types/post"
import { Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editPost, deletePost } from "@/services/postService"

type FormValues = Pick<PostType, "id" | "category" | "comment">

interface Props {
  post: PostType
  open: boolean
  setOpen: (open: boolean) => void
}

const EditModal = ({ post, open, setOpen }: Props) => {
  const queryClient = useQueryClient()
  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: post,
  })

  const editMutation = useMutation<void, Error, FormValues>({
    mutationFn: ({ id, category, comment }) => editPost(id, category, comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })

  const onSubmit = handleSubmit((data) => {
    editMutation.mutate(data, {
      onSuccess: () => {
        reset()
        setOpen(false)
      },
    })
  })

  const handleDelete = () => {
    deleteMutation.mutate(post.id, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-[#252526] text-[#cccccc] border border-[#3c3c3c]">
        <DialogHeader>
          <DialogTitle className="text-[#cccccc]">Edit Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
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
                      {CATEGORY_LIST.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.slice(0, 1).toUpperCase() +
                            category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="comment" className="text-[#cccccc]">
                Comment
              </Label>
              <Input
                {...register("comment")}
                placeholder="Add your comment here"
                className="w-full bg-[#3c3c3c] border-[#6b6b6b] text-[#cccccc] focus:ring-[#007acc] focus:border-[#007acc]"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="destructive"
              type="button"
              onClick={handleDelete}
              className="bg-[#f44747] hover:bg-[#d73a49] text-white"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              className="bg-[#0e639c] hover:bg-[#1177bb] text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal

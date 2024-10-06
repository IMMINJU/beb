import MainList from "./main-list"
import type { Category } from "@/constant/categories"

interface Props {
  category?: Category
}

export default async function Main({ category }: Props) {
  return <MainList category={category} />
}

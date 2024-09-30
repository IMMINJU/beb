import { createClient } from "@/utils/supabase/server";
import { QueryClient } from "@tanstack/react-query";
import MainList from "./main-list";

export const revalidate = 0;

async function fetchPosts(category: string) {
  const supabase = createClient();

  let query = supabase.from("posts").select("*");

  if (category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query
    .range(0, 9)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default async function Main({ category = "all" }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", category],
    queryFn: async () => await fetchPosts(category),
  });

  return <MainList category={category} />;
}

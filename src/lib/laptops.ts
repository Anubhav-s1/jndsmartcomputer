import { supabase } from "./supabase";

export async function getLaptops() {
  const { data, error } = await supabase
    .from("laptops")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
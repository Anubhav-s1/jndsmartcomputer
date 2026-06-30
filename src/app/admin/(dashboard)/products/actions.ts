"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name"));

  await supabase.from("products").insert({
    name,
    slug: `${slugify(name)}-${Date.now().toString(36)}`,
    category: formData.get("category"),
    brand: formData.get("brand") || null,
    description: formData.get("description") || null,
    price: Number(formData.get("price")) || null,
    compare_at_price: Number(formData.get("compare_at_price")) || null,
    condition: formData.get("condition"),
    stock_quantity: Number(formData.get("stock_quantity")) || 0,
    is_published: formData.get("is_published") === "on",
    images: formData.get("image_url") ? [String(formData.get("image_url"))] : [],
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const update: Record<string, unknown> = {
    name: formData.get("name"),
    category: formData.get("category"),
    brand: formData.get("brand") || null,
    description: formData.get("description") || null,
    price: Number(formData.get("price")) || null,
    compare_at_price: Number(formData.get("compare_at_price")) || null,
    condition: formData.get("condition"),
    stock_quantity: Number(formData.get("stock_quantity")) || 0,
    is_published: formData.get("is_published") === "on",
    updated_at: new Date().toISOString(),
  };

  const imageUrl = formData.get("image_url");
  if (imageUrl) {
    update.images = [String(imageUrl)];
  }

  await supabase.from("products").update(update).eq("id", id);

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/products");
}

export async function toggleProductPublished(id: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("products").update({ is_published: !current }).eq("id", id);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

// ---------- Bulk actions ----------

export async function bulkPublish(ids: string[], publish: boolean) {
  const supabase = await createClient();
  await supabase.from("products").update({ is_published: publish }).in("id", ids);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function bulkDelete(ids: string[]) {
  const supabase = await createClient();
  await supabase.from("products").delete().in("id", ids);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

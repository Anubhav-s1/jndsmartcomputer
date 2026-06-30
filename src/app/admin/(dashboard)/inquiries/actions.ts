"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("inquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function updateQuoteStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("quotation_requests").update({ status }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function setQuoteAmount(id: string, formData: FormData) {
  const supabase = await createClient();
  const amount = Number(formData.get("quoted_amount"));
  await supabase
    .from("quotation_requests")
    .update({ quoted_amount: amount || null, status: amount ? "quoted" : "new" })
    .eq("id", id);
  revalidatePath("/admin/inquiries");
}

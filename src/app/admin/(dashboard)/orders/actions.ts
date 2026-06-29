"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, formData: FormData) {
  const supabase = await createClient();
  const status = String(formData.get("status"));
  const note = String(formData.get("note") || "");

  await supabase.from("repair_orders").update({
    status,
    updated_at: new Date().toISOString(),
  }).eq("id", orderId);

  await supabase.from("repair_status_updates").insert({
    repair_order_id: orderId,
    status,
    note: note || null,
  });

  revalidatePath("/admin/orders");
}

export async function createRepairOrder(formData: FormData) {
  const supabase = await createClient();

  const { data: codeRow } = await supabase.rpc("generate_tracking_code");
  const trackingCode = codeRow ?? `JND-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const { data: order } = await supabase.from("repair_orders").insert({
    tracking_code: trackingCode,
    customer_name: formData.get("customer_name"),
    customer_phone: formData.get("customer_phone"),
    customer_email: formData.get("customer_email") || null,
    device_type: formData.get("device_type"),
    device_brand: formData.get("device_brand") || null,
    device_model: formData.get("device_model") || null,
    issue_description: formData.get("issue_description"),
    estimated_cost: Number(formData.get("estimated_cost")) || null,
    pickup_required: formData.get("pickup_required") === "on",
    pickup_address: formData.get("pickup_address") || null,
  }).select().single();

  if (order) {
    await supabase.from("repair_status_updates").insert({
      repair_order_id: order.id,
      status: "received",
      note: "Device received at shop.",
    });
  }

  revalidatePath("/admin/orders");
}

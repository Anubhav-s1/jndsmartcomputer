import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ error: "Enter a tracking code." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: order, error } = await supabase
    .from("repair_orders")
    .select(
      "id, tracking_code, customer_name, device_type, device_brand, device_model, status, estimated_cost, final_cost, created_at, updated_at"
    )
    .eq("tracking_code", code)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json(
      { error: "No order found for that code. Double-check it and try again." },
      { status: 404 }
    );
  }

  const { data: history } = await supabase
    .from("repair_status_updates")
    .select("status, note, created_at")
    .eq("repair_order_id", order.id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ order, history: history ?? [] });
}

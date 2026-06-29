import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const { data: codeRow } = await supabase.rpc("generate_tracking_code");
  const trackingCode =
    codeRow ?? `JND-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const { data: order, error } = await supabase
    .from("repair_orders")
    .insert({
      tracking_code: trackingCode,
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      customer_email: body.customer_email || null,
      device_type: body.device_type,
      device_brand: body.device_brand || null,
      device_model: body.device_model || null,
      issue_description: body.issue_description,
      pickup_required: !!body.pickup_required,
      pickup_address: body.pickup_address || null,
    })
    .select()
    .single();

  if (error || !order) {
    return NextResponse.json(
      { error: "Couldn't submit your request. Try again." },
      { status: 500 }
    );
  }

  await supabase.from("repair_status_updates").insert({
    repair_order_id: order.id,
    status: "received",
    note: body.pickup_required
      ? "Pickup request received — we'll contact you to arrange collection."
      : "Booking received — bring your device in at your convenience.",
  });

  return NextResponse.json({ tracking_code: trackingCode });
}

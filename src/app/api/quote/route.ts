import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("quotation_requests").insert({
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    customer_email: body.customer_email || null,
    category: body.category,
    budget_range: body.budget_range || null,
    requirements: body.requirements,
  });

  if (error) {
    return NextResponse.json({ error: "Couldn't submit your request. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

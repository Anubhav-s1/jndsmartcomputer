import { createClient } from "@/lib/supabase/server";
import { createRepairOrder, updateOrderStatus } from "./actions";
import Link from "next/link";

const statuses = [
  "received", "diagnosing", "awaiting_approval", "in_repair",
  "awaiting_parts", "ready_for_pickup", "out_for_delivery", "completed", "cancelled",
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("repair_orders").select("*").order("created_at", { ascending: false });
  if (q) query = query.or(`customer_name.ilike.%${q}%,tracking_code.ilike.%${q}%,customer_phone.ilike.%${q}%`);
  if (status) query = query.eq("status", status);

  const { data: orders } = await query;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Repair Orders</h1>

      <details className="mb-10 rounded-[var(--radius-card)] border p-6" style={{ borderColor: "var(--color-line)" }}>
        <summary className="font-semibold cursor-pointer">New intake — device dropped off</summary>
        <form action={createRepairOrder} className="grid grid-cols-2 gap-4 mt-5">
          <Input label="Customer name" name="customer_name" required />
          <Input label="Phone" name="customer_phone" required />
          <Input label="Email (optional)" name="customer_email" />
          <Input label="Device type (Laptop, Desktop…)" name="device_type" required />
          <Input label="Brand" name="device_brand" />
          <Input label="Model" name="device_model" />
          <Input label="Estimated cost (₹)" name="estimated_cost" type="number" />
          <Input label="Pickup address (if applicable)" name="pickup_address" />
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1.5">Issue description</label>
            <textarea name="issue_description" required rows={3} className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }} />
          </div>
          <label className="col-span-2 flex items-center gap-2 text-sm">
            <input type="checkbox" name="pickup_required" /> Pickup was required
          </label>
          <button type="submit" className="col-span-2 rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white" style={{ background: "var(--color-primary)" }}>
            Create Order &amp; Generate Claim Code
          </button>
        </form>
      </details>

      <form className="flex flex-wrap gap-3 mb-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name, phone, or claim code…"
          className="flex-1 min-w-[220px] rounded-[var(--radius-card)] border px-4 py-2.5 text-sm"
          style={{ borderColor: "var(--color-line)" }}
        />
        <select name="status" defaultValue={status ?? ""} className="rounded-[var(--radius-card)] border px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-line)" }}>
          <option value="">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <button type="submit" className="rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--color-primary)" }}>
          Filter
        </button>
        {(q || status) && (
          <Link href="/admin/orders" className="rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold border" style={{ borderColor: "var(--color-line)" }}>
            Clear
          </Link>
        )}
      </form>

      <h2 className="font-semibold mb-4">{orders?.length ?? 0} order{orders?.length === 1 ? "" : "s"}</h2>

      <div className="space-y-4">
        {orders?.map((o) => (
          <div key={o.id} className="rounded-[var(--radius-card)] border p-5" style={{ borderColor: "var(--color-line)" }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-mono font-semibold">{o.tracking_code}</p>
                <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  {o.customer_name} · {o.customer_phone} · {o.device_brand} {o.device_model || o.device_type}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-[var(--radius-pill)]" style={{ background: "var(--color-line)" }}>
                {o.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--color-ink-soft)" }}>{o.issue_description}</p>
            <form action={updateOrderStatus.bind(null, o.id)} className="flex gap-2">
              <select name="status" defaultValue={o.status} className="rounded-[var(--radius-card)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-line)" }}>
                {statuses.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <input name="note" placeholder="Add a note (optional)" className="flex-1 rounded-[var(--radius-card)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-line)" }} />
              <button className="rounded-[var(--radius-card)] px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--color-accent)" }}>
                Update
              </button>
            </form>
          </div>
        ))}
        {!orders?.length && (
          <p className="text-sm py-8 text-center" style={{ color: "var(--color-ink-soft)" }}>
            No orders match these filters.
          </p>
        )}
      </div>
    </div>
  );
}

function Input({
  label, name, type = "text", required = false,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input name={name} type={type} required={required} className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }} />
    </div>
  );
}

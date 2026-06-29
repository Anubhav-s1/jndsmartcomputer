import { createClient } from "@/lib/supabase/server";
import { createRepairOrder, updateOrderStatus } from "./actions";

const statuses = [
  "received", "diagnosing", "awaiting_approval", "in_repair",
  "awaiting_parts", "ready_for_pickup", "out_for_delivery", "completed", "cancelled",
];

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("repair_orders")
    .select("*")
    .order("created_at", { ascending: false });

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

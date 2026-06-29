import { createClient } from "@/lib/supabase/server";
import { createProduct, toggleProductPublished, deleteProduct } from "./actions";
import ImageUploadField from "./ImageUploadField";

const categories = [
  "laptop_new", "laptop_used", "desktop", "pc_components", "cctv", "accessory", "other",
];

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Products</h1>

      <form
        action={createProduct}
        className="rounded-[var(--radius-card)] border p-6 mb-10 grid grid-cols-2 gap-4"
        style={{ borderColor: "var(--color-line)" }}
      >
        <h2 className="col-span-2 font-semibold mb-1">Add a product</h2>

        <Input label="Name" name="name" required />
        <Input label="Brand" name="brand" />

        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <select name="category" required className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }}>
            {categories.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Condition</label>
          <select name="condition" className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }}>
            <option value="new">New</option>
            <option value="refurbished">Refurbished</option>
            <option value="used">Used</option>
          </select>
        </div>

        <Input label="Price (₹)" name="price" type="number" required />
        <Input label="Compare-at price (₹, optional)" name="compare_at_price" type="number" />
        <Input label="Stock quantity" name="stock_quantity" type="number" required />
        <ImageUploadField />

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" rows={3} className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }} />
        </div>

        <label className="col-span-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" defaultChecked />
          Publish immediately (visible on the storefront)
        </label>

        <button
          type="submit"
          className="col-span-2 rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Add Product
        </button>
      </form>

      <h2 className="font-semibold mb-4">All products ({products?.length ?? 0})</h2>
      <div className="space-y-3">
        {products?.map((p) => (
          <div
            key={p.id}
            className="rounded-[var(--radius-card)] border p-4 flex items-center justify-between gap-4"
            style={{ borderColor: "var(--color-line)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-[var(--radius-card)] overflow-hidden shrink-0"
                style={{ background: "#F1EEE5" }}
              >
                {p.images?.[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm font-mono" style={{ color: "var(--color-ink-soft)" }}>
                  ₹{p.price} · {p.category} · stock: {p.stock_quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <form action={toggleProductPublished.bind(null, p.id, p.is_published)}>
                <button
                  className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)]"
                  style={{
                    background: p.is_published ? "var(--color-success)" : "var(--color-line)",
                    color: p.is_published ? "white" : "var(--color-ink)",
                  }}
                >
                  {p.is_published ? "Published" : "Draft"}
                </button>
              </form>
              <form action={deleteProduct.bind(null, p.id)}>
                <button className="text-xs font-semibold" style={{ color: "var(--color-accent-dark)" }}>
                  Delete
                </button>
              </form>
            </div>
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
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-[var(--radius-card)] border px-4 py-2.5"
        style={{ borderColor: "var(--color-line)" }}
      />
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { createProduct, toggleProductPublished, deleteProduct } from "./actions";
import ImageUploadField from "./ImageUploadField";
import Link from "next/link";
import BulkActionsBar from "./BulkActionsBar";

const categories = [
  "laptop_new", "laptop_used", "desktop", "pc_components", "cctv", "accessory", "other",
];

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; status?: string }>;
}) {
  const { q, category, status } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (q) query = query.ilike("name", `%${q}%`);
  if (category) query = query.eq("category", category);
  if (status === "published") query = query.eq("is_published", true);
  if (status === "draft") query = query.eq("is_published", false);

  const { data: products } = await query;

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

      {/* Search & filter */}
      <form className="flex flex-wrap gap-3 mb-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name…"
          className="flex-1 min-w-[200px] rounded-[var(--radius-card)] border px-4 py-2.5 text-sm"
          style={{ borderColor: "var(--color-line)" }}
        />
        <select name="category" defaultValue={category ?? ""} className="rounded-[var(--radius-card)] border px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-line)" }}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
        </select>
        <select name="status" defaultValue={status ?? ""} className="rounded-[var(--radius-card)] border px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-line)" }}>
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit" className="rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--color-primary)" }}>
          Filter
        </button>
        {(q || category || status) && (
          <Link href="/admin/products" className="rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold border" style={{ borderColor: "var(--color-line)" }}>
            Clear
          </Link>
        )}
      </form>

      <h2 className="font-semibold mb-4">{products?.length ?? 0} product{products?.length === 1 ? "" : "s"}</h2>

      <BulkActionsBar
        products={(products ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          stock_quantity: p.stock_quantity,
          is_published: p.is_published,
          image: p.images?.[0] ?? null,
        }))}
        toggleProductPublished={toggleProductPublished}
        deleteProduct={deleteProduct}
      />
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

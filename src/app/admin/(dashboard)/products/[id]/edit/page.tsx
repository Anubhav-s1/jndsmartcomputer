import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateProduct } from "../../actions";
import ImageUploadField from "../../ImageUploadField";
import Link from "next/link";

const categories = [
  "laptop_new", "laptop_used", "desktop", "pc_components", "cctv", "accessory", "other",
];

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div>
      <Link href="/admin/products" className="text-sm mb-6 inline-block" style={{ color: "var(--color-primary)" }}>
        ← Back to products
      </Link>
      <h1 className="text-2xl font-bold mb-8">Edit product</h1>

      <form
        action={updateWithId}
        className="rounded-[var(--radius-card)] border p-6 grid grid-cols-2 gap-4 max-w-3xl"
        style={{ borderColor: "var(--color-line)" }}
      >
        <Input label="Name" name="name" defaultValue={product.name} required />
        <Input label="Brand" name="brand" defaultValue={product.brand ?? ""} />

        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <select name="category" required defaultValue={product.category} className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }}>
            {categories.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Condition</label>
          <select name="condition" defaultValue={product.condition} className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }}>
            <option value="new">New</option>
            <option value="refurbished">Refurbished</option>
            <option value="used">Used</option>
          </select>
        </div>

        <Input label="Price (₹)" name="price" type="number" defaultValue={product.price ?? ""} required />
        <Input label="Compare-at price (₹, optional)" name="compare_at_price" type="number" defaultValue={product.compare_at_price ?? ""} />
        <Input label="Stock quantity" name="stock_quantity" type="number" defaultValue={product.stock_quantity} required />

        <ImageUploadField existingUrl={product.images?.[0]} />

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" rows={3} defaultValue={product.description ?? ""} className="w-full rounded-[var(--radius-card)] border px-4 py-2.5" style={{ borderColor: "var(--color-line)" }} />
        </div>

        <label className="col-span-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" defaultChecked={product.is_published} />
          Published (visible on the storefront)
        </label>

        <button
          type="submit"
          className="col-span-2 rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

function Input({
  label, name, type = "text", required = false, defaultValue,
}: { label: string; name: string; type?: string; required?: boolean; defaultValue?: string | number }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-[var(--radius-card)] border px-4 py-2.5"
        style={{ borderColor: "var(--color-line)" }}
      />
    </div>
  );
}

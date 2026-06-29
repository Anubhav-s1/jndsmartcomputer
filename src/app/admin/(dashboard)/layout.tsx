import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Repair Orders" },
  { href: "/admin/inquiries", label: "Inquiries & Quotes" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // middleware already guards /admin, but this is a second check
  // for when admin pages are rendered directly.
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 flex gap-10">
      <aside className="w-48 shrink-0">
        <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent-dark)" }}>
          Admin
        </p>
        <nav className="space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm py-2 px-3 rounded-[var(--radius-card)] hover:opacity-70"
              style={{ color: "var(--color-ink)" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}

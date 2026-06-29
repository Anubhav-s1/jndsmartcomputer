import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {/* Sidebar */}

      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-blue-500 mb-10">
          JND Admin
        </h1>

        <nav className="space-y-4">

          <Link
            href="/admin"
            className="block hover:text-blue-400"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/laptops"
            className="block hover:text-blue-400"
          >
            💻 Laptops
          </Link>

          <Link
            href="/admin/repairs"
            className="block hover:text-blue-400"
          >
            🔧 Repair Jobs
          </Link>

          <Link
            href="/admin/gallery"
            className="block hover:text-blue-400"
          >
            🖼 Gallery
          </Link>

          <Link
            href="/admin/enquiries"
            className="block hover:text-blue-400"
          >
            📞 Enquiries
          </Link>

          <Link
            href="/admin/quotations"
            className="block hover:text-blue-400"
          >
            📄 Quotations
          </Link>

        </nav>

      </aside>

      {/* Main Content */}

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}
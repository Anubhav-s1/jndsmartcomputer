import Link from "next/link";

export default function AdminLaptopsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Laptop Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all laptops available on your website.
          </p>
        </div>

        <Link
          href="/admin/laptops/add"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          + Add Laptop
        </Link>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>
              <th className="text-left p-4">Brand</th>
              <th className="text-left p-4">Model</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Warranty</th>
              <th className="text-left p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-t border-slate-800">

              <td className="p-4">HP</td>
              <td className="p-4">HP 15-BS579TX</td>
              <td className="p-4">₹11,500</td>
              <td className="p-4">2</td>
              <td className="p-4">15 Days</td>

              <td className="p-4 flex gap-2">

                <button className="bg-yellow-500 px-4 py-2 rounded-lg">
                  Edit
                </button>

                <button className="bg-red-600 px-4 py-2 rounded-lg">
                  Delete
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}
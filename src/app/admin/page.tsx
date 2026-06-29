export default function AdminDashboard() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-gray-400">Laptops</h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-gray-400">Repair Jobs</h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-gray-400">Enquiries</h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-gray-400">Quotations</h2>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

      </div>

    </div>
  );
}
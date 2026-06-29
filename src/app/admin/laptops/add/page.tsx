export default function AddLaptopPage() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-10">
        Add New Laptop
      </h1>

      <form className="grid grid-cols-2 gap-6">

        <input
          placeholder="Brand"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Model"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Processor"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="RAM"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Storage"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Display"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Graphics"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Price"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Warranty"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          placeholder="Stock"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold"
        >
          Save Laptop
        </button>

      </form>

    </div>
  );
}
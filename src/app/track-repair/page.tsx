import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RepairStatusTracker from "@/components/forms/RepairStatusTracker";

export default function TrackRepairPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-950 min-h-screen text-white">

        <section className="py-20 px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            Track Your
            <span className="text-blue-500"> Repair</span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Enter your Job ID to instantly check the latest repair
            status of your Laptop or Desktop.
          </p>

        </section>

        <RepairStatusTracker />

      </main>

      <Footer />
    </>
  );
}
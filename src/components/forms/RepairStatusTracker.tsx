"use client";

import { useState } from "react";
import { repairJobs } from "@/data/repairJobs";

export default function RepairStatusTracker() {
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState<(typeof repairJobs)[0] | null>(null);

  const searchJob = () => {
    const job = repairJobs.find(
      (item) => item.jobId.toLowerCase() === jobId.trim().toLowerCase()
    );

    if (job) {
      setResult(job);
    } else {
      setResult(null);
      alert("No repair found with this Job ID.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-blue-600";
      case "Diagnosing":
        return "bg-yellow-500";
      case "Repairing":
        return "bg-orange-500";
      case "Waiting for Parts":
        return "bg-red-500";
      case "Ready for Pickup":
        return "bg-green-600";
      case "Delivered":
        return "bg-gray-600";
      default:
        return "bg-slate-600";
    }
  };

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-4xl font-bold text-white text-center">
            Track Your Repair
          </h2>

          <p className="text-gray-400 text-center mt-4 mb-8">
            Enter your Job ID to check the latest repair status.
          </p>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter Job ID (Example: JND1001)"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
            />

            <button
              onClick={searchJob}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-white font-semibold transition"
            >
              Track
            </button>

          </div>

        </div>

        {result && (
          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-white mb-8">
              Repair Details
            </h3>

            <div className="space-y-5 text-lg">

              <p>
                <strong>Job ID:</strong> {result.jobId}
              </p>

              <p>
                <strong>Customer:</strong> {result.customer}
              </p>

              <p>
                <strong>Phone:</strong> {result.phone}
              </p>

              <p>
                <strong>Device:</strong> {result.device}
              </p>

              <p>
                <strong>Problem:</strong> {result.problem}
              </p>

              <div className="flex items-center gap-4">

                <strong>Status:</strong>

                <span
                  className={`${getStatusColor(
                    result.status
                  )} px-4 py-2 rounded-full text-white font-semibold`}
                >
                  {result.status}
                </span>

              </div>

              <p>
                <strong>Last Updated:</strong> {result.updated}
              </p>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
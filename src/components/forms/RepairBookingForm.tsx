"use client";

import { useState } from "react";

export default function RepairBookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");

  const submitForm = () => {
    if (!name || !phone || !brand || !model || !problem || !date) {
      alert("Please fill all fields.");
      return;
    }

    const message = `Hello JND SMART COMPUTERS,

🛠️ Repair Booking Request

👤 Name: ${name}

📞 Phone: ${phone}

💻 Brand: ${brand}

🖥️ Model: ${model}

⚠️ Problem:
${problem}

📅 Preferred Date:
${date}

Please confirm my booking.`;

    window.open(
      `https://wa.me/919286260212?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-10 border border-slate-800">

        <h2 className="text-4xl font-bold text-white text-center">
          Book Your Repair
        </h2>

        <p className="text-gray-400 text-center mt-3 mb-10">
          Fill the form below and we'll contact you as soon as possible.
        </p>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Laptop/Desktop Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Device Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <textarea
            rows={5}
            placeholder="Describe the Problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500 resize-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <button
            onClick={submitForm}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white text-lg font-semibold transition"
          >
            Book Repair on WhatsApp
          </button>

        </div>

      </div>
    </section>
  );
}
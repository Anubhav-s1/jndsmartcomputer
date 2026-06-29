export default function Contact() {
  return (
    <section id="contact" className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Contact <span className="text-blue-500">Us</span>
          </h2>

          <p className="text-gray-400 mt-4">
            We're here to help with laptop repairs, CCTV installation, and computer solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Details */}

          <div className="space-y-8">

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3">📍 Address</h3>

              <p className="text-gray-300">
                Shop No. 4, Wing No. 2,
                Nehru Park Gali,
                Opposite Hero Showroom,
                Tyagi Market,
                Prem Nagar,
                Dehradun - 248007
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3">📞 Phone</h3>

              <p>7017570265</p>

              <p className="mt-2">
                WhatsApp: 9286260212
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3">📧 Email</h3>

              <p>jndservices02@gmail.com</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3">🕒 Business Hours</h3>

              <p>Open Daily</p>

              <p>10:30 AM – 9:00 PM</p>
            </div>

          </div>

          {/* Contact Form */}

          <div className="bg-slate-800 p-8 rounded-2xl">

            <h3 className="text-3xl font-bold mb-6">
              Send an Enquiry
            </h3>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-slate-700 outline-none"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full p-4 rounded-xl bg-slate-700 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl bg-slate-700 outline-none"
              />

              <textarea
                rows={5}
                placeholder="How can we help you?"
                className="w-full p-4 rounded-xl bg-slate-700 outline-none"
              />

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold transition"
              >
                Send Enquiry
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
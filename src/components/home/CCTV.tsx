export default function CCTV() {
  const packages = [
    {
      title: "Home CCTV",
      cameras: "3-4 Cameras",
      features: [
        "HD Night Vision",
        "Mobile Live View",
        "Motion Detection",
        "Installation Included",
      ],
      price: "Starting ₹13,999",
    },
    {
      title: "Office CCTV",
      cameras: "4 Cameras",
      features: [
        "Full HD Recording",
        "Remote Access",
        "30 Days Backup",
        "Professional Installation",
      ],
      price: "Starting ₹16,999",
    },
    {
      title: "Commercial CCTV",
      cameras: "8+ Cameras",
      features: [
        "4K Recording",
        "AI Motion Alerts",
        "Cloud Backup Ready",
        "Annual Maintenance",
      ],
      price: "Custom Quote",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">
            CCTV <span className="text-blue-500">Solutions</span>
          </h2>

          <p className="text-gray-400 mt-4">
            Secure your home and business with professional CCTV installation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {pkg.title}
              </h3>

              <p className="text-blue-400 font-semibold mb-6">
                {pkg.cameras}
              </p>

              <ul className="space-y-3 text-gray-300 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>

              <div className="text-3xl font-bold text-white mb-6">
                {pkg.price}
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition">
                Get Quote
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
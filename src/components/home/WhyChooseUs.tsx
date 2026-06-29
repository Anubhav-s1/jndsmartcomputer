export default function WhyChooseUs() {
  const features = [
    {
      title: "Experienced Technicians",
      icon: "👨‍🔧",
      desc: "Skilled professionals with years of experience in laptop and CCTV solutions."
    },
    {
      title: "Affordable Pricing",
      icon: "💰",
      desc: "Transparent pricing with no hidden charges."
    },
    {
      title: "Fast Service",
      icon: "⚡",
      desc: "Same-day repair available for most common issues."
    },
    {
      title: "Quality Parts",
      icon: "🛡️",
      desc: "Only genuine and high-quality replacement components."
    },
    {
      title: "Customer Satisfaction",
      icon: "😊",
      desc: "Hundreds of happy customers trust JND SMART COMPUTERS."
    },
    {
      title: "After-Sales Support",
      icon: "📞",
      desc: "Dedicated support even after your service is completed."
    }
  ];

  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Why Choose{" "}
          <span className="text-blue-500">
            JND SMART COMPUTERS
          </span>
        </h2>

        <p className="text-gray-400 text-center mt-4 mb-16 text-lg">
          Trusted Laptop Repair & CCTV Installation Experts
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.desc}
              </p>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
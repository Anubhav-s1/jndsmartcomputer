export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold">
              JND <span className="text-blue-500">SMART</span> COMPUTERS
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Your trusted destination for Laptop Sales,
              Laptop Repair, Desktop Services,
              CCTV Installation and Computer Accessories.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Laptop Repair</li>
              <li>Desktop Repair</li>
              <li>CCTV Installation</li>
              <li>Windows Installation</li>
              <li>Networking</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>📞 7017570265</li>
              <li>💬 9286260212</li>
              <li>✉️ jndservices02@gmail.com</li>
              <li>Prem Nagar, Dehradun</li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Business Hours
            </h3>

            <p className="text-gray-400">
              Monday - Sunday
            </p>

            <p className="text-gray-400">
              10:30 AM – 9:00 PM
            </p>

            <a
              href="https://www.instagram.com/jnd_smartcomputer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Follow on Instagram
            </a>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-gray-500">
          © 2026 JND SMART COMPUTERS. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
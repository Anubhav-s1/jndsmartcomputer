"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}

          <Link href="/" className="text-2xl font-extrabold text-white">
            JND <span className="text-blue-500">SMART</span> COMPUTERS
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-8 text-gray-300">

            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>

            <Link href="/services" className="hover:text-blue-400 transition">
              Services
            </Link>

            <Link href="/laptops" className="hover:text-blue-400 transition">
              Laptops
            </Link>

            <Link href="/cctv" className="hover:text-blue-400 transition">
              CCTV
            </Link>

            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>

            <Link href="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>

          </nav>

          {/* Call Button */}

          <a
            href="tel:7017570265"
            className="hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
          >
            <Phone size={18} />
            Call Now
          </a>

          {/* Mobile Menu Button */}

          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>

        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="lg:hidden pb-6">

            <nav className="flex flex-col gap-5 text-gray-300">

              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/laptops">Laptops</Link>
              <Link href="/cctv">CCTV</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>

            </nav>

          </div>
        )}

      </div>
    </header>
  );
}
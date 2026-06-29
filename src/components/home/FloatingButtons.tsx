"use client";

import { PhoneCall, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919286260212"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-green-600"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Call Button */}
      <a
        href="tel:7017570265"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-blue-700"
        aria-label="Call Now"
      >
        <PhoneCall size={28} />
      </a>

    </div>
  );
}
"use client";

import { Phone, MessageCircle } from "lucide-react";

// EDIT THESE TWO VALUES with your real business number.
// Phone number must include country code, no spaces, no leading 0 after the code.
// Example for an Indian number 98765 43210 -> "919876543210"
const WHATSAPP_NUMBER = "919286260212";
const CALL_NUMBER = "+917017570265";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I have a question about your computers/repairs."
);

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={`tel:${CALL_NUMBER}`}
        aria-label="Call us"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{ background: "var(--color-primary)" }}
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}

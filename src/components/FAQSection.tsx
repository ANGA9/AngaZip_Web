"use client";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: "How are fares calculated?", answer: "We use a transparent base rate + per kilometer formula. We strictly do not use dynamic surge multipliers, so you always pay a fair price even during peak hours or rain." },
    { question: "Are the drivers verified?", answer: "Yes. Every driver on Riksho undergoes document verification—including Driving License, Vehicle RC, and Government ID proofs—before being approved to accept rides." },
    { question: "Can I pay with cash or UPI?", answer: "Absolutely! You can choose to pay seamlessly via UPI directly to the driver, or pay in cash at the end of your trip." },
    { question: "What if I face an issue during the ride?", answer: "We have a 24/7 human support team and an in-app SOS button to ensure your safety and resolve any disputes within minutes." }
  ];

  return (
    <section className="section" style={{ backgroundColor: "#f9fafb" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 className="font-display" style={{ fontSize: "32px", marginBottom: "16px" }}>Frequently Asked Questions</h2>
          <p className="text-muted">Everything you need to know about riding with Riksho.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              style={{ 
                backgroundColor: "white", 
                borderRadius: "var(--radius-md)", 
                border: "1px solid var(--admin-border)",
                overflow: "hidden"
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                style={{ 
                  width: "100%", 
                  padding: "24px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "var(--admin-ink)"
                }}
              >
                {faq.question}
                <svg 
                  style={{ 
                    width: "20px", height: "20px", 
                    transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease"
                  }} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                style={{ 
                  maxHeight: openIndex === idx ? "200px" : "0", 
                  opacity: openIndex === idx ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  padding: openIndex === idx ? "0 24px 24px 24px" : "0 24px",
                  color: "var(--admin-muted)",
                  lineHeight: "1.6"
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

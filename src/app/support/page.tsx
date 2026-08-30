"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  User, 
  Car, 
  ShieldCheck, 
  Mail, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Smartphone
} from "lucide-react";

interface SupportCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface SupportFaq {
  question: string;
  answer: string;
}

export default function SupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cards: SupportCard[] = [
    {
      icon: <User size={22} color="var(--color-indigo)" />,
      title: "Riders & Commuters",
      desc: "Assistance with daily city rides, fare breakdowns, lost items, and instant wallet refunds."
    },
    {
      icon: <Car size={22} color="var(--color-indigo)" />,
      title: "Drivers & Partners",
      desc: "Fast-track support for daily morning payouts, commercial vehicle KYC, and incentives."
    },
    {
      icon: <ShieldCheck size={22} color="var(--color-indigo)" />,
      title: "Safety & Enterprise",
      desc: "24/7 live ride monitoring, corporate employee billing, and monthly GST invoices."
    }
  ];

  const faqs: SupportFaq[] = [
    {
      question: "How do I report an item left behind in a Riksho cab or auto?",
      answer: "Open the Riksho app > Activity > select your trip > tap 'Find Lost Item'. You can connect directly with your driver within 48 hours, or email support@riksho.com with your Trip ID."
    },
    {
      question: "Why was I charged a cancellation fee?",
      answer: "Cancellations are 100% free within the first 2 minutes of booking acceptance. If canceled after 2 minutes or after driver arrival, a nominal fee (₹25–₹50) applies to compensate the driver for fuel and time."
    },
    {
      question: "When are driver partner payouts credited to my bank account?",
      answer: "All digital ride earnings and incentive bonuses are automatically settled every morning by 8:00 AM IST directly to your verified bank account or UPI VPA with zero delays."
    },
    {
      question: "How does the in-app Emergency SOS safety button work?",
      answer: "Tapping the in-app SOS button instantly transmits your real-time GPS coordinates, vehicle registration, and driver details to local Police Control (112) and dials our 24/7 Emergency Command Center."
    },
    {
      question: "Can my business get monthly invoices with input tax credit?",
      answer: "Yes! Companies enrolled in Riksho for Business receive consolidated monthly GST-compliant invoices detailing every employee ride, cost center allocation, and tax breakdown."
    }
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Light Theme Header Hero Banner */}
        <section style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          paddingTop: "112px",
          paddingBottom: "36px",
          position: "relative"
        }}>
          {/* Brand Accent Top Line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #4338CA 0%, #00C2FF 100%)" }} />

          <div className="container">
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "#64748B", marginBottom: "14px" }}>
              <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700 }}>Help &amp; Support</span>
            </div>

            <div style={{ maxWidth: "720px" }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4.2vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 12px 0",
                color: "#0F172A",
                lineHeight: 1.2
              }}>
                How can we assist you today?
              </h1>

              <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                Find quick answers, explore help categories, or connect directly with our 24/7 passenger and partner support desks.
              </p>
            </div>
          </div>
        </section>

        {/* Minimalist 3 Category Cards (Matched to Contact Page Typography) */}
        <section style={{ padding: "40px 0 20px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "32px"
            }}>
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "28px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-indigo-tint)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px"
                  }}>
                    {card.icon}
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Spotlight: 3 Unified Brand Indigo Direct Channels with Seamless White Illustration */}
        <section style={{ padding: "40px 0", backgroundColor: "#FFFFFF", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "36px",
              alignItems: "center"
            }}>
              {/* Left Column: Direct Indigo Action Assistance */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Direct Channels
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", marginBottom: "14px", lineHeight: 1.25 }}>
                  Need Immediate Help? We're on Standby
                </h2>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#475569", marginBottom: "24px" }}>
                  Whether you're in an active ride, tracking an ongoing trip, or checking a partner payout, our operations team is here for you.
                </p>

                {/* 3 Minimalist Direct Channel Points (No boxes, no descriptions, no buttons) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* In-App Live Support */}
                  <Link 
                    href="#download" 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px", 
                      color: "#0F172A", 
                      textDecoration: "none", 
                      fontSize: "1rem", 
                      fontWeight: 600 
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "var(--color-indigo-tint)", color: "var(--color-indigo)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Smartphone size={18} />
                    </div>
                    <span>In-App Live Ride Assistance</span>
                  </Link>

                  {/* Email Support */}
                  <div 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px", 
                      color: "#0F172A", 
                      fontSize: "1rem", 
                      fontWeight: 600 
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "var(--color-indigo-tint)", color: "var(--color-indigo)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <span>
                      Customer &amp; Partner Support:{" "}
                      <a 
                        href="mailto:support@riksho.com" 
                        style={{ color: "var(--color-indigo)", fontWeight: 700, textDecoration: "underline" }}
                      >
                        support@riksho.com
                      </a>
                    </span>
                  </div>

                  {/* Grievance Desk */}
                  <div 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px", 
                      color: "#0F172A", 
                      fontSize: "1rem", 
                      fontWeight: 600 
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "var(--color-indigo-tint)", color: "var(--color-indigo)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <span>
                      Grievance &amp; Escalations:{" "}
                      <a 
                        href="mailto:grievance@riksho.com" 
                        style={{ color: "var(--color-indigo)", fontWeight: 700, textDecoration: "underline" }}
                      >
                        grievance@riksho.com
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Seamless Pure White Art Style Vector Illustration */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "400px",
                  aspectRatio: "1/1",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Image
                    src="/images/ill_support_desk_v2.png"
                    alt="Riksho Support Illustration"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Interactive FAQ Section */}
        <section style={{ padding: "40px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Quick Answers
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            {/* Accordion (White background, indigo title when active, slate answer) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    style={{
                      border: isOpen ? "1px solid rgba(67, 56, 202, 0.3)" : "1px solid #E2E8F0",
                      borderRadius: "12px",
                      backgroundColor: "#FFFFFF",
                      overflow: "hidden",
                      transition: "border-color 0.2s ease"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      style={{
                        width: "100%",
                        padding: "16px 18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "14px",
                        textAlign: "left",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: isOpen ? "var(--color-indigo)" : "#0F172A",
                        transition: "color 0.2s ease"
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ color: "var(--color-indigo)", fontSize: "1.1rem", fontWeight: 700 }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: "0 18px 16px 18px",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                        color: "#475569",
                        borderTop: "1px solid #F1F5F9",
                        paddingTop: "12px"
                      }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Still Need Help? Banner Card (No shadow, no tag, clean border) */}
        <section style={{ padding: "20px 0 56px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid var(--color-indigo)",
              borderRadius: "20px",
              padding: "clamp(24px, 4vw, 36px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px"
            }}>
              <div style={{ flex: "1 1 360px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
                  Can't find what you're looking for?
                </h3>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.55, margin: 0 }}>
                  Our dedicated customer support and partner care teams are available 24/7. Reach out directly with your inquiry.
                </p>
              </div>

              <div>
                <Link
                  href="/contact"
                  style={{
                    backgroundColor: "var(--color-indigo)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>Contact Support</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Home Page Consistent App Download Banner */}
        <AppDownloadCTA />
      </main>

      {/* Home Page Consistent Footer */}
      <Footer />
    </div>
  );
}

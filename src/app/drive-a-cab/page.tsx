"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  Car, 
  Wallet, 
  ShieldCheck, 
  Clock, 
  BadgePercent, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Calendar,
  Banknote,
  FileCheck2,
  HeartHandshake
} from "lucide-react";

export default function DriveCabPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const driverPillars = [
    {
      icon: <Wallet size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Instant Daily UPI Payouts",
      tagline: "Your money, in your bank immediately",
      points: [
        "Withdraw earnings anytime after your shift",
        "Direct instant transfer to Google Pay, PhonePe, or bank",
        "Zero withdrawal holding fee or lock-in period"
      ]
    },
    {
      icon: <BadgePercent size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Zero Predatory Commission",
      tagline: "Keep 100% of what you work for",
      points: [
        "Zero commission during your first 30 days",
        "Transparent low flat fee per trip after onboarding",
        "Keep 100% of passenger cash and in-app tips"
      ]
    },
    {
      icon: <Clock size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Complete Shift Flexibility",
      tagline: "Be your own master, choose your hours",
      points: [
        "Zero mandatory login hours or forced shift targets",
        "Log in and log off whenever you choose",
        "Set custom destination rides on your way home"
      ]
    }
  ];

  const driverMetrics = [
    { value: "₹0", label: "Commission First Month", icon: <BadgePercent size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "10 Mins", label: "Paperless App Onboarding", icon: <FileCheck2 size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "Instant", label: "Daily UPI Bank Transfers", icon: <Banknote size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "4.9 / 5", label: "Driver Partner Satisfaction", icon: <Sparkles size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const driverFaqs = [
    {
      question: "What documents do I need to register as a Cab or Auto driver on Riksho?",
      answer: "You only need 4 documents: (1) Valid Commercial Driving License (DL), (2) Vehicle Registration Certificate (RC), (3) Commercial Vehicle Insurance, and (4) Aadhaar Card for identity verification. You can upload photos directly in the Riksho Partner App."
    },
    {
      question: "How quickly can I start taking rides after registering?",
      answer: "Our onboarding team reviews and verifies your documents promptly (typically within a few hours). Once approved, you can switch to Online mode and start accepting ride requests immediately."
    },
    {
      question: "How do I receive passenger payments?",
      answer: "For cash trips, you collect money directly from the customer. For digital UPI or card trips, the money is instantly credited to your Riksho Partner Wallet, which you can withdraw to your UPI ID or bank account at any time with a single tap."
    },
    {
      question: "Can I drive an Auto-Rickshaw or Electric Rickshaw (Toto)?",
      answer: "Yes! Riksho welcomes petrol, CNG, and electric auto-rickshaws. Autos enjoy high local ride frequency and congestion priority in Indian metro cities."
    }
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Full-bleed Minimalist Photo Hero Banner */}
        <section style={{
          position: "relative",
          minHeight: "68vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "120px",
          paddingBottom: "60px",
          overflow: "hidden"
        }}>
          {/* Background Photo with Soft Directional Vignette Overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/photo_drive_cab_hero.jpg"
              alt="Drive with Riksho"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
            />
            {/* Soft Directional Gradient (Text Legibility on Left, Fully Faded & Clear on Right) */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(15, 23, 42, 0.58) 0%, rgba(15, 23, 42, 0.28) 42%, rgba(15, 23, 42, 0) 72%)"
            }} />
          </div>

          <div className="container" style={{ position: "relative", zIndex: 1, color: "#FFFFFF" }}>
            <div style={{ maxWidth: "780px" }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 5.2vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
                color: "#FFFFFF",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.55)"
              }}>
                Drive with Riksho.<br />
                <span style={{ color: "#00C2FF" }}>Keep 100% of what you earn.</span>
              </h1>

              <p style={{
                fontSize: "clamp(0.95rem, 2vw, 1.18rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "640px",
                margin: "0 0 28px 0",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Zero hidden commissions, instant daily UPI payouts directly to your bank account, and dedicated local partner support hubs for cabs and autos.
              </p>

              {/* Hero Action Button */}
              <div>
                <a
                  href="#download"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "var(--color-indigo)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                    padding: "clamp(12px, 2vw, 15px) clamp(22px, 3vw, 30px)",
                    borderRadius: "999px",
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(67, 56, 202, 0.4)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  <span>Register as a Driver</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Driver Partner Pillars Grid (3 Cards) */}
        <section style={{ padding: "64px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Driver Advantage
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Why Thousands of Driver Buddies Choose Riksho
              </h2>
              <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Built from the ground up to guarantee driver dignity, financial transparency, and maximum daily take-home earnings.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px"
            }}>
              {driverPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="pillar-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      backgroundColor: "var(--color-indigo-tint)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px"
                    }}>
                      {pillar.icon}
                    </div>

                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 20px 0" }}>
                      {pillar.tagline}
                    </p>

                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      {pillar.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ fontSize: "0.9rem", color: "#475569", display: "flex", alignItems: "center", gap: "10px" }}>
                          <CheckCircle2 size={16} color="var(--color-indigo)" strokeWidth={2.2} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Onboarding in Under 10 Minutes (With Purple Blob Artwork #4338CA) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Custom Purple Blob Illustration (#4338CA) */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "440px",
                  aspectRatio: "1/1",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Image
                    src="/images/ill_driver_onboarding.png"
                    alt="Fast driver paperless onboarding"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Onboarding Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Instant Registration
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Ready to Drive in 3 Simple Steps
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  No long queues at physical offices. Complete your entire profile from your phone and hit the road the same day.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <FileCheck2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        1. Upload License &amp; Vehicle RC
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Take a clean photo of your driving license, vehicle registration, and commercial insurance in the app.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        2. Fast Document Verification
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Our team verifies your submitted documents and activates your driver account promptly so you can start riding.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Banknote size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        3. Go Online &amp; Collect Fares
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Accept passenger bookings, collect direct UPI and cash payments, and withdraw daily profits anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Driver Welfare & Partner Support (With Cyan Blob Artwork #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Welfare Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Partner Care
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Respect and Real Human Support
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  You are not an algorithm number to us. We provide dedicated physical partner desks, transparent trip metrics, and 24/7 telephonic assistance.
                </p>

                {/* 3 Spacious Welfare Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <HeartHandshake size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Local Partner Support Hubs
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Visit our walk-in support centers in your city for in-person document renewal, phone setup, and driver community tea desks.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Fair Rating &amp; Dispute Protection
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Protection against malicious passenger 1-star ratings and unfair account blocks with transparent human dispute reviews.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Sparkles size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Weekly High-Performer Fuel Rewards
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Earn fuel vouchers, subsidized vehicle maintenance servicing, and cash milestone rewards every single week.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Cyan Blob Illustration (#00C2FF) */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "440px",
                  aspectRatio: "1/1",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Image
                    src="/images/ill_driver_welfare.png"
                    alt="Driver partner respect and community support"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Impact Metrics Bar */}
        <section style={{ padding: "48px 0", backgroundColor: "#FFFFFF", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px"
            }}>
              {driverMetrics.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px"
                  }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-indigo-tint)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Clean Interactive FAQ Accordion */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Driver Helpdesk
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {driverFaqs.map((faq, fIdx) => {
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

        {/* Global Micro-animation CSS for Pillar Cards */}
        <style jsx global>{`
          .pillar-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 28px -6px rgba(15, 23, 42, 0.09) !important;
            border-color: rgba(67, 56, 202, 0.4) !important;
          }
        `}</style>

        {/* Home Page Consistent App Download Banner */}
        <AppDownloadCTA />
      </main>

      {/* Home Page Consistent Footer */}
      <Footer />
    </div>
  );
}

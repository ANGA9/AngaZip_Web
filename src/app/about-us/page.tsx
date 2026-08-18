"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  Building2,
  TrendingUp,
  Users,
  Car
} from "lucide-react";

export default function AboutUsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = [
    { value: "100K+", label: "Verified Driver Partners", icon: <Users size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "5M+", label: "Safe Trips Completed", icon: <Car size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "50+", label: "Cities & Urban Clusters", icon: <MapPin size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "₹0", label: "Hidden Surge Surcharges", icon: <TrendingUp size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const faqs = [
    {
      question: "What is Riksho's core mission?",
      answer: "Riksho was founded to create a fairer, more transparent mobility ecosystem for India. We empower driver partners with direct next-morning payouts and low platform commissions, while offering passengers reliable, affordable, and safe rides across autos, cabs, and bike taxis."
    },
    {
      question: "How does Riksho ensure driver partner welfare?",
      answer: "Unlike traditional aggregator models with high commission cuts, Riksho operates on fair, transparent pricing. All digital trip earnings are deposited directly into drivers' bank accounts every morning, accompanied by comprehensive accidental insurance and 24/7 dedicated partner assistance."
    },
    {
      question: "What safety protocols are implemented during rides?",
      answer: "Every Riksho ride features background-verified drivers, real-time GPS tracking with live trip sharing, masked telephone numbers to safeguard user privacy, and a direct 24/7 Emergency Police SOS (112) integration connected to our central command hub."
    },
    {
      question: "Is Riksho transitioning toward electric vehicles (EVs)?",
      answer: "Yes! Riksho is committed to sustainable urban transit. We actively prioritize electric auto rickshaws, EV cabs, and eco-friendly two-wheelers in our fleet network, aiming for 100% electrified city rides by 2030."
    }
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Full-bleed Real People Photo Hero Banner */}
        <section style={{
          position: "relative",
          minHeight: "65vh",
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
              src="/images/photo_about_hero.jpg"
              alt="Riksho Commuters and Driver Partners"
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
            <div style={{ maxWidth: "760px" }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 5.5vw, 62px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "18px",
                color: "#FFFFFF",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.55)"
              }}>
                Moving India forward.<br />
                <span style={{ color: "#00C2FF" }}>Empowering everyday journeys.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "620px",
                margin: 0,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                We build transparent mobility technology that brings dignity to driver partners and reliable, safe transit to millions across Indian cities.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Our Mission & Mobility Vision (With Purple Blob Illustration #4338CA) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Mission Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Our Mission
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Empowering Millions of Daily Journeys
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  At Riksho Technologies Pvt. Ltd., we believe urban transit should be predictable, accessible, and dignified for every commuter and captain. We bridge daily riders with autos, bike taxis, cabs, and quick commerce delivery fleets with crystal-clear pricing.
                </p>

                {/* 3 Core Mission Points (Spacious & Breathable) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <HeartHandshake size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Driver Dignity &amp; Next-Morning Payouts
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Fair platform commissions with automated daily bank settlements by 8:00 AM IST.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Transparent, No-Surge Pricing
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Upfront fare estimates with zero hidden surge spikes during peak commute hours.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Comprehensive Safety Standard
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Real-time GPS telemetry, masked calling, and direct 24/7 Police SOS (112) integration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Purple Blob Illustration (#4338CA) */}
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
                    src="/images/ill_about_mission.png"
                    alt="Riksho Mission and Community Illustration"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Numbers at a Glance (Impact Metrics) */}
        <section style={{ padding: "48px 0", backgroundColor: "#FFFFFF", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px"
            }}>
              {stats.map((stat, sIdx) => (
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

        {/* Section 3: Engineering, Technology & Green Mobility (With Light Blue Blob #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column (Desktop): Custom Cyan Blob Illustration (#00C2FF) */}
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
                    src="/images/ill_about_values.png"
                    alt="Riksho Technology and Safety Engineering Illustration"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Engineering Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Built for Scale &amp; Safety
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Smart Engineering Rooted in Real Cities
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "24px" }}>
                  Our software engineers build sub-second dispatch algorithms fine-tuned for high-density Indian urban traffic, offline-first mobile resilience, and full DPDP Act 2023 compliance.
                </p>

                {/* 3 Engineering & Safety Pillars (Matching Mission Section Design & Spacing) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        DPDP Privacy Architecture
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Masked phone proxies and zero personal data leakage between rider and captain.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Sub-Second Urban Dispatch
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Hyperlocal matching with live shortest-path routing optimized for Indian road density.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Car size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Electric Fleet Priority
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Dedicated onboarding and charging network integrations for electric autos and EV cabs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Clean Interactive FAQ Accordion */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Company &amp; Vision
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

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

        {/* Home Page Consistent App Download Banner */}
        <AppDownloadCTA />
      </main>

      {/* Home Page Consistent Footer */}
      <Footer />
    </div>
  );
}

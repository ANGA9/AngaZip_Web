"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  HeartHandshake, 
  Lock, 
  Activity, 
  Users
} from "lucide-react";

export default function SafetyHubPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = [
    { value: "100%", label: "Background Verified Captains", icon: <ShieldCheck size={20} color="#0F172A" /> },
    { value: "24/7", label: "Active Incident Command Desk", icon: <Activity size={20} color="#0F172A" /> },
    { value: "99.98%", label: "Incident-Free Completed Trips", icon: <Lock size={20} color="#0F172A" /> },
    { value: "4-Digit", label: "Mandatory Secure Ride OTP", icon: <PhoneCall size={20} color="#0F172A" /> }
  ];

  const safetyFaqs = [
    {
      question: "How does the in-app Emergency SOS (112) button work?",
      answer: "Tapping the SOS shield icon in the live ride screen triggers an immediate high-priority emergency protocol. It transmits your live vehicle telemetry, vehicle registration, and driver identity to the state Police Control Room (112) while simultaneously alerting our 24/7 Emergency Incident Command Desk."
    },
    {
      question: "How are Riksho driver partners vetted and verified?",
      answer: "Every driver must submit a valid Commercial Driving License, Vehicle Registration Certificate (RC), commercial vehicle insurance, and Aadhaar/PAN identity. Documents are verified through national DigiLocker and transport databases before on-road activation."
    },
    {
      question: "Is my personal phone number shared with the driver?",
      answer: "Never. Under our DPDP Act 2023 compliant privacy architecture, all communication between riders and drivers uses encrypted telephone proxy masking. Your real phone number and personal details remain completely private."
    },
    {
      question: "Are trips covered under accidental insurance?",
      answer: "Yes! Every trip booked through Riksho includes complementary passenger and driver accidental coverage up to ₹5,00,000 for medical emergencies and accidental hospitalizations during active transit."
    }
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Full-bleed Realistic Photo Hero Banner */}
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
          {/* Background Photo with Cinematic Directional Gradient */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/photo_safety_banner_v2.jpg"
              alt="Riksho Safety First Commitment"
              fill
              style={{ objectFit: "cover", objectPosition: "center 35%" }}
              priority
            />
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
                Safety in every motion.<br />
                <span style={{ color: "#00C2FF" }}>Protected at every turn.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "620px",
                margin: 0,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Real-time safety telemetry, verified captains, and proactive trip monitoring designed to keep every rider and driver secure across India.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Passenger Protection (With Purple Blob Illustration #4338CA) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Passenger Security Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Passenger Protection
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Multi-Layered Security for Every Ride
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Whether commuting late at night, travelling intercity, or booking for a loved one, every Riksho ride is safeguarded by strict identity audits and active telemetry.
                </p>

                {/* 3 Spacious Passenger Points (Tinted Badges with Black Icons) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <PhoneCall size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        24/7 Police SOS (112) &amp; Command Center
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        One-tap emergency trigger transmits live GPS telemetry and vehicle details directly to local law enforcement and our incident team.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Lock size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Masked Telephone Proxies
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        DPDP Act 2023 compliant data masking ensures neither rider nor driver ever sees each other's real phone number.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <MapPin size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Live Route Telemetry &amp; Share Trip
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Share your real-time vehicle route, captain profile, and estimated arrival time with emergency contacts in one tap.
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
                    src="/images/ill_safety_rider.png"
                    alt="Riksho Passenger Safety Illustration"
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

        {/* Section 3: Driver & Partner Protection (With Cyan Blob Illustration #00C2FF) */}
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
                    src="/images/ill_safety_partner.png"
                    alt="Riksho Driver and Partner Safety Illustration"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Driver Safety Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Captain &amp; Partner Welfare
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Protecting the Captains Who Move India
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "24px" }}>
                  Safety is a two-way commitment. We actively safeguard our driver and courier partners with automated telematics, collision checks, and 24/7 dedicated partner assistance.
                </p>

                {/* 3 Spacious Partner Points (Tinted Badges with Black Icons) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <HeartHandshake size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Comprehensive In-Transit Cover
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        24/7 emergency medical protection and financial security for every active captain and rider on duty.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Activity size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Telematics &amp; Collision Checks
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Real-time speed and accelerometer telemetry automatically detects sudden stops to initiate wellness check-ins.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Users size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Dedicated Partner Helpline
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Direct line for captains facing late-night mechanical breakdowns, route disputes, or passenger misbehavior.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Clean Interactive FAQ Accordion */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Safety &amp; Compliance
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {safetyFaqs.map((faq, fIdx) => {
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

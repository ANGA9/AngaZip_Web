"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  Car, 
  Bike, 
  Package, 
  Building2, 
  Wallet, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Banknote,
  FileCheck2,
  HeartHandshake
} from "lucide-react";

export default function EarnHubPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const earnCategories = [
    {
      title: "Drive a Cab or Auto",
      tagline: "Commercial city & outstation mobility",
      desc: "Drive hatchbacks, sedans, SUVs, or auto-rickshaws. Keep 100% of your earnings for the first 30 days with instant daily UPI payouts.",
      icon: <Car size={24} color="#0F172A" strokeWidth={2.2} />,
      href: "/drive-a-cab",
      badge: "Highest Demand"
    },
    {
      title: "Bike Taxi Captain",
      tagline: "Fast urban two-wheeler rides",
      desc: "Bypass metro traffic jams, complete 25+ quick rides daily, and earn extra surge multipliers during morning & evening rush hours.",
      icon: <Bike size={24} color="#0F172A" strokeWidth={2.2} />,
      href: "/ride-a-bike-taxi",
      badge: "Quickest Rides"
    },
    {
      title: "Delivery Courier",
      tagline: "Neighborhood darkstore & parcel logistics",
      desc: "Zero passenger interactions. Pick up bundled grocery crates and e-commerce parcels from local hubs with guaranteed base payouts.",
      icon: <Package size={24} color="#0F172A" strokeWidth={2.2} />,
      href: "/deliver-as-courier",
      badge: "Steady All-Day"
    },
    {
      title: "Commercial Fleet Owner",
      tagline: "Multi-vehicle commercial fleet management",
      desc: "Manage 5 to 500+ vehicles from a centralized web console with real-time GPS telemetry, driver rosters, and automated bank splits.",
      icon: <Building2 size={24} color="#0F172A" strokeWidth={2.2} />,
      href: "/join-a-fleet",
      badge: "Enterprise Scale"
    }
  ];

  const earnPillars = [
    {
      icon: <Wallet size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Instant Daily Bank Cashout",
      tagline: "Your money, in your bank immediately",
      points: [
        "Withdraw trip earnings anytime directly to UPI / Bank",
        "Zero withdrawal holding fee or lock-in period",
        "Keep 100% of passenger cash and in-app tips"
      ]
    },
    {
      icon: <Zap size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Zero Predatory Commission",
      tagline: "0% platform fees to start",
      points: [
        "Keep 100% of your fares for your first 30 days",
        "Transparent low flat fee per completed trip",
        "Zero hidden deductions or arbitrary penalty charges"
      ]
    },
    {
      icon: <Clock size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Total Shift Freedom",
      tagline: "Be your own boss, choose your hours",
      points: [
        "Zero mandatory login targets or forced shift hours",
        "Log in and earn on your schedule anytime 24/7",
        "Set destination rides to earn on your way home"
      ]
    }
  ];

  const earnMetrics = [
    { value: "₹0", label: "Commission First 30 Days", icon: <Zap size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "10 Mins", label: "Paperless App Onboarding", icon: <FileCheck2 size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "Instant", label: "Daily UPI Bank Transfers", icon: <Banknote size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "4.9 / 5", label: "Partner Satisfaction Rating", icon: <Sparkles size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const earnFaqs = [
    {
      question: "How do I sign up and start earning with Riksho?",
      answer: "Download the Riksho Partner App from the Google Play Store or scan the QR code. Enter your mobile number, select your vehicle category (Cab, Auto, Bike, or Courier), and upload photos of your Driving License, RC, and Aadhaar card."
    },
    {
      question: "How long does document verification take?",
      answer: "Our automated digital verification activates your profile in under 10 minutes. Once approved, you can complete a quick selfie check and start accepting trips immediately."
    },
    {
      question: "When and how do I receive my earnings?",
      answer: "Cash fares are collected directly from the customer. Digital UPI fares, tips, and bonus incentives are credited instantly to your Riksho Partner Wallet, which you can withdraw to your UPI ID or bank account at any time."
    },
    {
      question: "Can I drive part-time or choose only certain areas?",
      answer: "Yes! You have full flexibility over when and where you work. You can set custom destination rides towards your home neighborhood so you only receive trips along your route."
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
          {/* Background Photo with Minimal Directional Gradient */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/photo_earn.png"
              alt="Earn with Riksho"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
            />
            {/* Minimal Ambient Gradient Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(15, 23, 42, 0.68) 0%, rgba(15, 23, 42, 0.38) 50%, rgba(15, 23, 42, 0.05) 100%)"
            }} />
          </div>

          <div className="container" style={{ position: "relative", zIndex: 1, color: "#FFFFFF" }}>
            <div style={{ maxWidth: "780px" }}>
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
                Earn with Riksho.<br />
                <span style={{ color: "#00C2FF" }}>Drive, ride, or deliver on your terms.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "640px",
                margin: "0 0 28px 0",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Join thousands of driver captains, bike riders, delivery couriers, and fleet owners earning daily with transparent payouts and 0% first-month commission.
              </p>

              {/* Hero Action Button */}
              <div>
                <a
                  href="#download"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "var(--color-indigo)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "1rem",
                    padding: "16px 32px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(67, 56, 202, 0.5)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  <span>Download Partner App &amp; Register</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 4 Partner Pathways Grid */}
        <section style={{ padding: "64px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Partner Pathways
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Choose How You Want to Earn
              </h2>
              <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Whether you own a bike, auto, cab, or commercial fleet, Riksho provides reliable daily income.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}>
              {earnCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.href}
                  className="earn-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        backgroundColor: "var(--color-indigo-tint)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {cat.icon}
                      </div>
                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--color-indigo)",
                        backgroundColor: "var(--color-indigo-tint)",
                        padding: "4px 10px",
                        borderRadius: "999px"
                      }}>
                        {cat.badge}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
                      {cat.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-indigo)", fontWeight: 700, margin: "0 0 12px 0" }}>
                      {cat.tagline}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px 0" }}>
                      {cat.desc}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.9rem" }}>
                    <span>Learn More &amp; Onboard</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section: 3 Core Partner Pillars */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Partner Advantage
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Built to Protect Your Daily Earnings
              </h2>
            </div>

            {/* 3 Pillars Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px"
            }}>
              {earnPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="earn-card"
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

        {/* Section 1: Instant Paperless Onboarding (With Purple Blob Artwork #4338CA) */}
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
                    src="/images/ill_about_mission.png"
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
                  Digital Onboarding
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Hit the Road in 10 Minutes
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Complete your profile entirely from your smartphone with no paperwork, physical office visits, or setup fees.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <FileCheck2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        1. Upload Documents via App
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Upload clear photos of your Driving License, Registration Certificate (RC), and Aadhaar Card.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <CheckCircle2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        2. Automated Instant Verification
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Our compliance algorithms verify credentials in real time to approve your captain profile within minutes.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Banknote size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        3. Start Earning Daily
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Turn on the app, accept bookings in your area, and withdraw profits directly into your bank account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Driver Dignity & Respect (With Cyan Blob Artwork #00C2FF) */}
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
                  Transparent Policies and Real Human Support
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  We stand by our drivers with transparent commission structures, fair rating dispute mechanisms, and 24/7 dedicated partner desks.
                </p>

                {/* 3 Spacious Welfare Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <HeartHandshake size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Local Walk-In Partner Desks
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Visit our physical centers in your city for in-person document renewal, app guidance, and community tea desks.
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
                        Protection against malicious passenger reviews and unfair account blocks with human dispute reviews.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Sparkles size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Weekly High-Performer Milestone Rewards
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Earn cash bonuses, maintenance service vouchers, and priority dispatch by maintaining high service quality.
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
                    src="/images/ill_about_values.png"
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
              {earnMetrics.map((stat, sIdx) => (
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
                Partner FAQs
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {earnFaqs.map((faq, fIdx) => {
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

        {/* Global Micro-animation CSS for Cards */}
        <style jsx global>{`
          .earn-card:hover {
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

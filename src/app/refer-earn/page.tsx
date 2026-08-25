"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  TrendingUp,
  QrCode,
  Wallet,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Users2,
  Sparkles,
  Award,
  ChevronDown,
} from "lucide-react";

export default function ReferEarnLandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pillars = [
    {
      icon: <TrendingUp size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Earn ₹20 Per Driver",
      tagline: "Instant rewards for every driver onboarded",
      points: [
        "Earn ₹20 cash reward on every verified driver recruit",
        "Direct credit into your promoter digital wallet",
        "Unlimited referral earnings with zero ceiling",
      ],
    },
    {
      icon: <QrCode size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Instant QR Verification",
      tagline: "Fast on-field scanning via your mobile camera",
      points: [
        "Scan the driver's QR code right inside their Riksho Buddy app",
        "Instant server verification in under 3 seconds",
        "Automatic payout ledger update in real-time",
      ],
    },
    {
      icon: <Wallet size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Direct UPI & Bank Payouts",
      tagline: "Withdraw earnings whenever you want",
      points: [
        "Instant withdrawals to Google Pay, PhonePe, or Paytm",
        "Direct NEFT / IMPS transfers to your bank account",
        "Transparent payment receipts and transaction records",
      ],
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Sign In as Promoter",
      desc: "Use your mobile number to sign in or apply to the Brand Promoter network in 30 seconds.",
    },
    {
      step: "02",
      title: "Scan Driver QR in Field",
      desc: "Meet auto or cab drivers, guide them to download Riksho Buddy, and scan their personal QR code.",
    },
    {
      step: "03",
      title: "Get Paid Instantly",
      desc: "Receive ₹20 credited immediately to your balance and withdraw directly to your UPI ID.",
    },
  ];

  const faqs = [
    {
      q: "Who can become a Riksho Brand Promoter?",
      a: "Anyone! College students, fleet managers, local agents, or active community members can sign up, recruit drivers on the field, and earn referral commissions.",
    },
    {
      q: "How do I verify a driver recruit?",
      a: "Open your Promoter Dashboard on your phone, tap 'Scan Driver QR', and point your camera at the driver's QR code displayed in their Riksho Buddy app.",
    },
    {
      q: "What is the minimum withdrawal amount?",
      a: "The minimum withdrawal threshold is just ₹10. You can transfer earnings directly to your UPI VPA (Google Pay, PhonePe, Paytm) or bank account anytime.",
    },
    {
      q: "Is there any limit to how much I can earn?",
      a: "No! There are zero limits. The more drivers you onboard and verify, the more rewards you earn every day.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          padding: "120px 24px 70px 24px",
          background: "radial-gradient(ellipse at top, #EEF2FF 0%, #FFFFFF 70%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 9999,
              backgroundColor: "#EEF2FF",
              border: "1.5px solid #C7D2FE",
              color: "#4338CA",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.02em",
              marginBottom: 24,
            }}
          >
            <Sparkles size={16} /> RIKSHO BRAND PROMOTER PROGRAM
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#0F172A",
              marginBottom: 20,
            }}
          >
            Recruit Drivers. <br />
            <span style={{ color: "#4338CA" }}>Earn Instant Cash Rewards.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#475569",
              lineHeight: 1.6,
              maxWidth: 620,
              margin: "0 auto 36px auto",
            }}
          >
            Join Riksho as an authorized Brand Promoter. Scan driver QR codes on the field, verify driver registrations, and receive ₹20 directly into your bank or UPI wallet.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/refer-earn/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 15,
                padding: "16px 32px",
                borderRadius: 16,
                textDecoration: "none",
                boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3)",
              }}
            >
              <span>Promoter Portal Login</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/support"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#FFFFFF",
                color: "#0F172A",
                fontWeight: 700,
                fontSize: 15,
                padding: "16px 28px",
                borderRadius: 16,
                textDecoration: "none",
                border: "1.5px solid #0F172A",
              }}
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section style={{ padding: "70px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
            Why Partner With Riksho?
          </h2>
          <p style={{ fontSize: 15, color: "#64748B", marginTop: 8 }}>
            Built for field promoters, college ambassadors, and mobility organizers.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {pillars.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#F8FAFC",
                border: "1.5px solid #E2E8F0",
                borderRadius: 24,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>

              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{item.tagline}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "#334155" }}>
                    <CheckCircle2 size={16} color="#4338CA" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works (3 Simple Steps) */}
      <section style={{ padding: "70px 24px", backgroundColor: "#0F172A", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#818CF8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              SIMPLE 3-STEP PROCESS
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#FFFFFF", marginTop: 6 }}>
              How You Earn with Riksho
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {steps.map((st, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#1E293B",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 20,
                  padding: "32px 24px",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 900, color: "#818CF8", opacity: 0.8, marginBottom: 12 }}>
                  {st.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: "70px 24px", maxWidth: 840, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0F172A" }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 16,
                  overflow: "hidden",
                  backgroundColor: isOpen ? "#F8FAFC" : "#FFFFFF",
                }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      color: "#64748B",
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 24px 20px 24px", fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div
          style={{
            marginTop: 60,
            padding: "40px 28px",
            backgroundColor: "#EEF2FF",
            border: "1.5px solid #C7D2FE",
            borderRadius: 24,
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
            Ready to Start Earning?
          </h3>
          <p style={{ fontSize: 14, color: "#475569", maxWidth: 460, margin: "0 auto 20px auto" }}>
            Sign in with your mobile number to get your live recruiter dashboard immediately.
          </p>
          <Link
            href="/refer-earn/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#4338CA",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 14.5,
              padding: "14px 28px",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <span>Open Promoter Console</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

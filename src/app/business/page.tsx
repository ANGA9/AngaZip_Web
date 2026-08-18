"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Truck, 
  Receipt, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Users2, 
  CreditCard,
  Briefcase
} from "lucide-react";

export default function BusinessLandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const businessSolutions = [
    {
      icon: <Users2 size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Employee Commute & Travel",
      tagline: "Safe, scheduled, and on-demand team transit",
      points: [
        "Automated monthly ride allowances",
        "Late-night safe drops with live GPS tracking",
        "Zero employee out-of-pocket expense claims"
      ]
    },
    {
      icon: <Truck size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Hyper-Local Delivery API",
      tagline: "Sub-30 min on-demand courier dispatch",
      points: [
        "Instant REST API & Webhook integration",
        "Automated courier assignment from darkstores",
        "Real-time package telemetry & proof of delivery"
      ]
    },
    {
      icon: <Receipt size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Consolidated GST Billing",
      tagline: "100% tax-compliant monthly invoicing",
      points: [
        "Single consolidated invoice for all trips",
        "Full GST credit pass-through documentation",
        "Cost-center and department-wise tagging"
      ]
    },
    {
      icon: <Briefcase size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Dedicated Fleet Contracting",
      tagline: "Custom SLA commercial mobility",
      points: [
        "Reserved commercial cabs, autos, and bikes",
        "Guaranteed vehicle availability during peak hours",
        "Dedicated corporate enterprise account manager"
      ]
    },
    {
      icon: <ShieldCheck size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Live Telemetry & Safety Audits",
      tagline: "Enterprise security & route intelligence",
      points: [
        "Real-time map tracking with geo-fenced routes",
        "Driver background badge verification audits",
        "Automated CSV ride logs ready for ERP export"
      ]
    }
  ];

  const businessMetrics = [
    { value: "500+", label: "Active Enterprise Partners", icon: <Building2 size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "< 15 Min", label: "Average Courier Pickup SLA", icon: <Clock size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "100%", label: "GST Tax Invoicing Compliance", icon: <Receipt size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "24 / 7", label: "Dedicated Account Support", icon: <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const businessFaqs = [
    {
      question: "How does corporate ride billing work for employee commutes?",
      answer: "Companies can create custom budget caps and policy rules per team or employee. Trips taken by authorized team members are billed directly to your corporate credit account with consolidated monthly GST tax invoices—eliminating expense reimbursement paperwork."
    },
    {
      question: "Can we integrate Riksho Logistics API with our e-commerce or darkstore checkout?",
      answer: "Yes! Our robust REST API and Webhooks allow instant programmatic courier dispatch the moment an order is confirmed. You can automate delivery assignment, print barcode waybills, and provide customers with live real-time map tracking."
    },
    {
      question: "What payment terms and credit cycles are available for businesses?",
      answer: "We support weekly and monthly postpaid billing cycles, net-15 / net-30 terms (subject to credit evaluation), as well as prepaid corporate wallet top-ups with instant auto-replenishment."
    },
    {
      question: "How do I access the Business Management Console?",
      answer: "Approved business accounts can log in directly at riksho.com/business/login to manage employee rosters, inspect delivery orders, track active fleet telemetry, and export financial reports."
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
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/photo_business_hero.jpg"
              alt="Riksho for Business"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              priority
            />
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
                Enterprise mobility &amp; logistics.<br />
                <span style={{ color: "#00C2FF" }}>Built for modern business fleets.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "640px",
                margin: "0 0 28px 0",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Unified GST invoicing, automated employee commute allowances, instant darkstore delivery API dispatch, and zero hidden markups.
              </p>

              {/* Hero Action Button */}
              <div>
                <Link
                  href="/business/login"
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
                  <span>Login / Register to Business Portal</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Enterprise Solutions Grid (5 Cards: 3 in Top Row, 2 Centered in Bottom Row) */}
        <section style={{ padding: "64px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Commercial Offerings
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Comprehensive B2B Mobility &amp; Logistics
              </h2>
              <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Tailored solutions for fast-growing startups, regional retailers, and national enterprises.
              </p>
            </div>

            {/* 5 Solutions: 3 on Top, 2 Centered Below */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px"
            }}>
              {businessSolutions.map((sol, idx) => (
                <div
                  key={idx}
                  className="solution-card"
                  style={{
                    flex: "1 1 320px",
                    maxWidth: "370px",
                    minWidth: "280px",
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
                      {sol.icon}
                    </div>

                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
                      {sol.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 20px 0" }}>
                      {sol.tagline}
                    </p>

                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      {sol.points.map((pt, pIdx) => (
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

        {/* Section 1: Automated Billing & GST Compliance (With Purple Blob Artwork #4338CA) */}
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
                    src="/images/ill_business_invoicing.png"
                    alt="Automated corporate billing and GST tax reports"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Financial Governance Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Financial Governance
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Streamlined Expense Reconciliation
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Eliminate hundreds of individual employee expense claims. Riksho consolidates all urban rides, outstation trips, and courier shipments into an automated monthly ledger.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Receipt size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        100% Input Tax Credit (ITC) Compliance
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Every monthly corporate invoice includes itemized GST breakdown for hassle-free corporate tax deductions.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <CreditCard size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Custom Team Budgets &amp; Policy Controls
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Set automated daily or monthly ride allowances, define allowable time windows, and restrict vehicle tiers per role.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Automated CSV &amp; ERP Ledger Export
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Download complete trip logs tagged by project code and employee ID ready for direct upload to SAP, Zoho, or Tally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Developer API & Multi-Location Dispatch (With Cyan Blob Artwork #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Tech Integration Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Developer Integration
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Plug Directly into Riksho Logistics Engine
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Whether operating 10 darkstores or 500 retail branches, trigger automated courier assignments with our high-throughput REST API.
                </p>

                {/* 3 Spacious Tech Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Code2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Low-Latency REST API &amp; Webhook Events
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Dispatch couriers programmatically, receive real-time webhook updates on arrival, and trigger customer SMS notifications.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Digital OTP &amp; Proof of Delivery (POD)
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Secure delivery handover with mandatory customer OTP verification, geo-tagged timestamp, and digital signature capture.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Building2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Multi-Store &amp; Darkstore Hub Support
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Manage dozens of geographic fulfilment centers from a unified dashboard with localized rider clustering.
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
                    src="/images/ill_business_api.png"
                    alt="Developer API and multi-location darkstore dispatch"
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
              {businessMetrics.map((stat, sIdx) => (
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

        {/* Section: Business Portal Registration CTA Box */}
        <section style={{ padding: "32px 0 24px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div style={{
              backgroundColor: "var(--color-indigo-tint)",
              border: "1.5px solid rgba(67, 56, 202, 0.18)",
              borderRadius: "24px",
              padding: "36px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px"
            }}>
              <div style={{ maxWidth: "580px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", margin: "0 0 8px 0" }}>
                  Ready to manage your enterprise account?
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  Manage employee travel allowances, trigger programmatic darkstore API dispatches, and download GST tax invoices from the Business Portal.
                </p>
              </div>

              <div>
                <Link
                  href="/business/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "var(--color-indigo)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(67, 56, 202, 0.35)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  <span>Login / Register to Business Portal</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Clean Interactive FAQ Accordion */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Business FAQs
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {businessFaqs.map((faq, fIdx) => {
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

        {/* Global Micro-animation CSS for Solution Cards */}
        <style jsx global>{`
          .solution-card:hover {
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

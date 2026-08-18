"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  Package, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Store, 
  Boxes, 
  Truck,
  QrCode,
  Thermometer
} from "lucide-react";

export default function DarkstoreLandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const darkstorePillars = [
    {
      icon: <Clock size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Sub-15 Minute Doorstep SLA",
      tagline: "High-velocity hyper-local dispatch",
      points: [
        "Dedicated 2-wheeler courier rings around each hub",
        "Couriers arrive at store before packing completes",
        "Direct point-to-point delivery with zero batching delays"
      ]
    },
    {
      icon: <Boxes size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Smart Pick & Pack Workflow",
      tagline: "Under 3-minute warehouse fulfilment",
      points: [
        "Digital queue optimized by aisle and SKU location",
        "Barcode item scanning to eliminate mispicks",
        "Automated digital bag sealing and waybill printing"
      ]
    },
    {
      icon: <Store size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Direct POS & Inventory API",
      tagline: "Seamless omni-channel integration",
      points: [
        "Instant webhook dispatch from Shopify, WooCommerce, or custom ERP",
        "Real-time inventory sync and out-of-stock prevention",
        "Automated customer tracking SMS and WhatsApp alerts"
      ]
    },
    {
      icon: <Thermometer size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Cold-Chain & Fragile Care",
      tagline: "Insulated bags for groceries & pharma",
      points: [
        "Thermal insulated carrier bags for dairy and ice cream",
        "Shock-absorbing compartments for delicate electronics",
        "Zero spillage liquid packaging standards"
      ]
    },
    {
      icon: <Zap size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Automated Rider Allocation",
      tagline: "Geo-fenced courier orchestration",
      points: [
        "Couriers matched the second order picking begins",
        "Riders pre-stationed at dedicated store pickup bays",
        "Zero handoff dwell time from bagging table to road"
      ]
    }
  ];

  const darkstoreMetrics = [
    { value: "< 3 Min", label: "Average Order Packing Time", icon: <Boxes size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "12.4 Min", label: "Average Doorstep Delivery SLA", icon: <Clock size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "99.9%", label: "Order Fulfilment Accuracy", icon: <CheckCircle2 size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "50+", label: "Active Darkstore Fulfillment Hubs", icon: <Store size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const darkstoreFaqs = [
    {
      question: "What is a Riksho Darkstore Fulfillment Node?",
      answer: "A darkstore is a hyper-local micro-warehouse optimized strictly for rapid order picking and courier dispatch. Riksho powers both our own quick-commerce hubs and partners with retail brands to turn local store backrooms into 15-minute fulfillment centers."
    },
    {
      question: "How do store staff manage and pack incoming orders?",
      answer: "Store operators log into the Riksho Store Ops portal (riksho.com/darkstore/login) on a tablet or desktop. Incoming orders appear instantly with item lists, bin locations, and automated courier status."
    },
    {
      question: "Can existing retail brands and supermarkets partner with Riksho Darkstore Network?",
      answer: "Yes! Retailers, pharmacies, and grocery chains can integrate with Riksho's darkstore logistics engine to offer 15-minute quick delivery without building their own fleet from scratch."
    },
    {
      question: "How does customer verification work at delivery handover?",
      answer: "Every order requires a mandatory 4-digit digital OTP presented by the customer upon arrival before the delivery rider can mark the order completed, guaranteeing zero false drop-offs."
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
              src="/images/photo_darkstore_hero.jpg"
              alt="Riksho Darkstore Logistics"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
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
                Hyper-local darkstore logistics.<br />
                <span style={{ color: "#00C2FF" }}>Sub-15 minute fulfillment engine.</span>
              </h1>

              <p style={{
                fontSize: "clamp(0.95rem, 2vw, 1.18rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "640px",
                margin: "0 0 28px 0",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Power your micro-warehouses, quick-commerce nodes, and brand retail hubs with intelligent order picking, packing, and instant courier dispatch.
              </p>

              {/* Hero Action Button */}
              <div>
                <Link
                  href="/darkstore/login"
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
                  <span>Login / Register to Store Portal</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Darkstore Pillars Grid (5 Cards: 3 in Top Row, 2 Centered in Bottom Row) */}
        <section style={{ padding: "64px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Fulfillment Technology
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Built for High-Velocity Quick Commerce
              </h2>
              <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Turn every square foot of urban retail space into an intelligent sub-15 minute fulfillment powerhouse.
              </p>
            </div>

            {/* 5 Pillars: 3 on Top, 2 Centered Below */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px"
            }}>
              {darkstorePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="pillar-card"
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

        {/* Section 1: Micro-Warehouse Velocity (With Purple Blob Artwork #4338CA) */}
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
                    src="/images/ill_darkstore_picking.png"
                    alt="Darkstore micro-warehouse fulfillment and packing speed"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Picking Velocity Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Picking Speed
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Fulfillment in Under 180 Seconds
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  From order chime to sealed bag handoff, our Store Ops interface guides floor staff through the shortest physical path inside your store.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Boxes size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Intelligent Bin &amp; Aisle Mapping
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Items are dynamically ordered by physical aisle position so pickers never double-back across the warehouse floor.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <QrCode size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Zero-Error Barcode Validation
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Camera and handheld scanners verify SKU barcodes before items enter the bag, eliminating wrong-item returns.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Pre-Stationed Rider Handovers
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Courier algorithms dispatch nearby riders the moment picking begins, ensuring zero dwell time at the store counter.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Automated Rider Allocation & Live Telemetry (With Cyan Blob Artwork #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Telemetry Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Delivery Assurance
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Real-Time Fleet Orchestration
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Monitor every active courier on an interactive map. Track departure timestamps, transit routes, and customer OTP confirmations.
                </p>

                {/* 3 Spacious Telemetry Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Mandatory 4-Digit Handover OTP
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Customer provides a secure one-time passcode to the courier upon doorstep delivery, guaranteeing 100% handover validity.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Thermometer size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Cold-Chain Temperature Assurance
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Dedicated multi-compartment insulated bags protect dairy, meats, and fresh produce from ambient city heat.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Truck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Automated Return &amp; Undelivered Reconciliation
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        If a customer is unreachable, the system auto-routes the package back to the darkstore with sealed audit logging.
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
                    src="/images/ill_darkstore_dispatch.png"
                    alt="Darkstore fleet orchestration and real-time live map tracking"
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
              {darkstoreMetrics.map((stat, sIdx) => (
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

        {/* Section: Store Portal Registration CTA Box */}
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
                  Ready to manage your darkstore hub?
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  Access real-time fulfillment queues, manage floor staff rosters, and monitor live courier handovers from the dedicated Store Ops Console.
                </p>
              </div>

              <div>
                <Link
                  href="/darkstore/login"
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
                  <span>Login / Register to Store Portal</span>
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
                Darkstore FAQs
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {darkstoreFaqs.map((faq, fIdx) => {
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

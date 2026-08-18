"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Zap, 
  BadgePercent, 
  CreditCard, 
  Share2, 
  Users, 
  Sparkles,
  CheckCircle2,
  Car,
  Navigation
} from "lucide-react";

export default function CityRidesPage() {
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const vehicleTiers = [
    {
      id: "auto",
      name: "Auto Rickshaw",
      tagline: "Everyday urban workhorse",
      capacity: "3 Seats",
      eta: "2-4 mins",
      baseFare: "₹30",
      perKm: "₹12/km",
      features: ["Metropolitan standard", "Congestion bypass", "Instant booking"],
      image: "/images/ill_tier_auto.png",
      badge: "Most Popular"
    },
    {
      id: "bike",
      name: "Bike Taxi",
      tagline: "Fastest single-rider commute",
      capacity: "1 Seat",
      eta: "1-3 mins",
      baseFare: "₹20",
      perKm: "₹8/km",
      features: ["Free sanitized helmet", "Zero traffic delays", "Lowest cost"],
      image: "/images/ill_tier_bike.png",
      badge: "Fastest"
    },
    {
      id: "mini",
      name: "Mini Hatchback",
      tagline: "Affordable AC comfort",
      capacity: "4 Seats",
      eta: "3-5 mins",
      baseFare: "₹50",
      perKm: "₹15/km",
      features: ["Full AC comfort", "Compact hatchbacks", "Clean interiors"],
      image: "/images/ill_tier_mini.png",
      badge: "Best Value"
    },
    {
      id: "sedan",
      name: "Prime Sedan",
      tagline: "Extra legroom & top captains",
      capacity: "4 Seats",
      eta: "4-6 mins",
      baseFare: "₹70",
      perKm: "₹18/km",
      features: ["Extra legroom", "Top-rated captains", "Trunk luggage space"],
      image: "/images/ill_tier_sedan.png",
      badge: "Executive"
    }
  ];

  const impactMetrics = [
    { value: "< 4 Min", label: "Average Urban Pickup ETA", icon: <Clock size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "₹0", label: "Hidden Peak Surge Fees", icon: <BadgePercent size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "99.98%", label: "Incident-Free City Trips", icon: <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "4.9 / 5", label: "Commuter Average Rating", icon: <Sparkles size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const cityFaqs = [
    {
      question: "How does Riksho guarantee upfront pricing without peak surge pricing?",
      answer: "Riksho calculates trip fares using standardized municipal transport rates and transparent distance matrices. Unlike other apps that artificially inflate prices during rain or rush hours, the fare agreed upon when you request your ride is fixed and never surges."
    },
    {
      question: "What vehicle categories are available for everyday city rides?",
      answer: "Depending on your city and route, you can book Auto Rickshaws (up to 3 passengers), Bike Taxis (single rider with mandatory helmet), Mini AC Hatchbacks (up to 4 passengers), and Prime AC Sedans with extra luggage room."
    },
    {
      question: "Can I pay with cash or UPI directly to the driver partner?",
      answer: "Yes! Riksho supports all payment modes. You can scan the driver's UPI QR code directly at the end of the journey, pay via in-app wallet / cards, or settle in cash with zero additional processing fees."
    },
    {
      question: "How does the mandatory 4-Digit Ride OTP protect passengers?",
      answer: "Every ride generates a unique 4-digit security OTP in your Riksho app. Your captain must enter this OTP into their driver app before the meter and navigation activate, ensuring you never board the wrong vehicle."
    }
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Full-bleed Minimalist Photo Hero Banner */}
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
              src="/images/photo_city_rides_hero.jpg"
              alt="City Rides by Riksho"
              fill
              style={{ objectFit: "cover", objectPosition: "center 35%" }}
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
                fontSize: "clamp(28px, 5.2vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
                color: "#FFFFFF",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.55)"
              }}>
                Metropolitan rides, zero haggling.<br />
                <span style={{ color: "#00C2FF" }}>Transparent &amp; instant pickups.</span>
              </h1>

              <p style={{
                fontSize: "clamp(0.95rem, 2vw, 1.18rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "620px",
                margin: 0,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                From electric autos and bike taxis to comfortable AC sedans—navigate everyday city traffic with verified captains and transparent upfront pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Interactive Multi-Modal Vehicle Tiers */}
        <section style={{ padding: "64px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Urban Vehicle Options
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                A Ride for Every Urban Commute
              </h2>
              <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Choose the perfect balance of speed, price, and comfort for your route.
              </p>
            </div>

            {/* Vehicle Cards Grid (Strict 4-Column on Desktop) */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}>
              {vehicleTiers.map((tier, idx) => {
                const isSelected = selectedTier === idx;
                return (
                  <div
                    key={tier.id}
                    className="tier-card"
                    onClick={() => setSelectedTier(idx)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: isSelected ? "2px solid var(--color-indigo)" : "1.5px solid #E2E8F0",
                      borderRadius: "20px",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      boxShadow: isSelected ? "0 12px 24px -6px rgba(67, 56, 202, 0.12)" : "0 2px 10px rgba(0,0,0,0.02)",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {/* Badge */}
                    <div style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      zIndex: 2,
                      backgroundColor: isSelected ? "var(--color-indigo)" : "var(--color-indigo-tint)",
                      color: isSelected ? "#FFFFFF" : "var(--color-indigo)",
                      fontSize: "0.725rem",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                      whiteSpace: "nowrap",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                    }}>
                      {tier.badge}
                    </div>

                    <div>
                      {/* Vehicle Image */}
                      <div style={{
                        position: "relative",
                        width: "100%",
                        height: "165px",
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: "14px"
                      }}>
                        <Image
                          src={tier.image}
                          alt={tier.name}
                          fill
                          style={{
                            objectFit: "contain",
                            transform: "scale(1.22)",
                            transition: "transform 0.25s ease"
                          }}
                        />
                      </div>

                      {/* Name & Tagline */}
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0" }}>
                        {tier.name}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "0 0 16px 0" }}>
                        {tier.tagline}
                      </p>

                      {/* Fare & ETA Bar */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        backgroundColor: "#F8FAFC",
                        borderRadius: "12px",
                        marginBottom: "16px"
                      }}>
                        <div>
                          <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Base Fare</div>
                          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>{tier.baseFare}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Rate</div>
                          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-indigo)" }}>{tier.perKm}</div>
                        </div>
                      </div>

                      {/* Feature Bullet Points */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ fontSize: "0.85rem", color: "#475569", display: "flex", alignItems: "center", gap: "8px" }}>
                            <CheckCircle2 size={14} color="var(--color-indigo)" strokeWidth={2.2} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Capacity & ETA Footer */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "16px",
                      marginTop: "16px",
                      borderTop: "1px solid #F1F5F9",
                      fontSize: "0.8rem",
                      color: "#64748B"
                    }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Users size={14} color="#0F172A" strokeWidth={2.2} />
                        {tier.capacity}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={14} color="#0F172A" strokeWidth={2.2} />
                        ETA {tier.eta}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 1: The Riksho Fair Fare Promise (With Purple Blob Artwork #4338CA) */}
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
                    src="/images/ill_city_fair_fare.png"
                    alt="Fair upfront pricing and electric auto transit"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Pricing & Dispatch Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Fair Fares &amp; Reliability
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Predictable Rides on Every Street
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  We built Riksho to eliminate the frustration of haggling, arbitrary meter rates, and surprise surge multipliers during morning rush hours.
                </p>

                {/* 3 Spacious Feature Points (28px gap, 42px badges, black icons) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <BadgePercent size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Guaranteed No-Surge Upfront Pricing
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        The fare you see before booking is the exact amount you pay upon arrival—no surge multipliers, even in rain or festival rush.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Sub-Second Proximity Dispatch
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Intelligent spatial clustering matches you with the nearest captain heading your way to cut pickup waiting times to under 4 minutes.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <CreditCard size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Direct UPI &amp; Cashless Settlements
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Scan the driver’s UPI QR code directly upon trip completion, pay via in-app wallet, or pay cash without extra processing fees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: City Safety Standards (With Cyan Blob Artwork #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Safety Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Passenger Security
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Protected on Every Kilometer
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Every vehicle on the Riksho platform undergoes thorough document validation, background checks, and active GPS telemetry monitoring.
                </p>

                {/* 3 Spacious Safety Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Mandatory 4-Digit Ride Start OTP
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        The journey begins only after the driver enters your private 4-digit OTP, ensuring you always board your verified vehicle.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Share2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Live Route Sharing with Emergency Contacts
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Share your real-time GPS location, driver details, and estimated arrival time with friends and family in a single tap.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Navigation size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Direct Police 112 Command Desk Link
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        One-touch in-app emergency SOS triggers instant law enforcement telemetry escalation and outbound safety checks.
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
                    src="/images/ill_city_safety_otp.png"
                    alt="Safety shields and verified transit captains"
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
              {impactMetrics.map((stat, sIdx) => (
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
                City Rides Support
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cityFaqs.map((faq, fIdx) => {
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

        {/* Global Micro-animation CSS for Tier Cards */}
        <style jsx global>{`
          .tier-card:hover {
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

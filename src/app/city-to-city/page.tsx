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
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Navigation, 
  Receipt, 
  Compass, 
  BadgePercent, 
  Car,
  Users,
  Luggage
} from "lucide-react";

export default function CityToCityPage() {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const routes = [
    {
      id: "kol-digha",
      from: "Kolkata",
      to: "Digha",
      distance: "185 km",
      duration: "3.5 hrs",
      onewayFare: "₹2,450",
      roundtripFare: "₹4,200",
      highlights: "Direct NH-16 / NH-116 route, sea beach drop, FASTag included"
    },
    {
      id: "mum-pune",
      from: "Mumbai",
      to: "Pune",
      distance: "150 km",
      duration: "2.8 hrs",
      onewayFare: "₹1,950",
      roundtripFare: "₹3,400",
      highlights: "Mumbai-Pune Expressway, door-to-door pickup, zero return charge"
    },
    {
      id: "del-jaipur",
      from: "Delhi NCR",
      to: "Jaipur",
      distance: "280 km",
      duration: "4.5 hrs",
      onewayFare: "₹2,850",
      roundtripFare: "₹4,900",
      highlights: "Delhi-Mumbai Expressway corridor, verified AC sedans"
    },
    {
      id: "blr-mysore",
      from: "Bengaluru",
      to: "Mysuru",
      distance: "145 km",
      duration: "2.2 hrs",
      onewayFare: "₹1,850",
      roundtripFare: "₹3,200",
      highlights: "Bengaluru-Mysuru Access-Controlled Highway, rest-stop friendly"
    },
    {
      id: "chn-pondy",
      from: "Chennai",
      to: "Pondicherry",
      distance: "165 km",
      duration: "3.0 hrs",
      onewayFare: "₹2,150",
      roundtripFare: "₹3,700",
      highlights: "East Coast Road scenic drive, luggage assistance included"
    },
    {
      id: "kol-siliguri",
      from: "Kolkata",
      to: "Siliguri",
      distance: "560 km",
      duration: "11.5 hrs",
      onewayFare: "₹7,400",
      roundtripFare: "₹12,800",
      highlights: "Gateway to North Bengal & Sikkim, dual commercial drivers available"
    }
  ];

  const vehicleOptions = [
    {
      name: "Prime Sedan",
      models: "Dzire, Etios or equivalent",
      seats: "4 Passengers",
      luggage: "2 Large Bags",
      multiplier: "1.0x Base",
      image: "/images/sedan_car.png"
    },
    {
      name: "Family SUV",
      models: "Ertiga, Carens or equivalent",
      seats: "6 Passengers",
      luggage: "3 Large Bags",
      multiplier: "1.35x Base",
      image: "/images/suv_car.png"
    },
    {
      name: "Executive SUV",
      models: "Innova Crysta",
      seats: "7 Passengers",
      luggage: "4 Large Bags",
      multiplier: "1.75x Base",
      image: "/images/suv_car.png"
    }
  ];

  const intercityMetrics = [
    { value: "500+", label: "Connected Highway Routes", icon: <Compass size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "₹0", label: "Hidden Deadhead Return Charges", icon: <BadgePercent size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "100%", label: "Commercial Highway Verified Fleet", icon: <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "4.9 / 5", label: "Outstation Commuter Rating", icon: <Sparkles size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const intercityFaqs = [
    {
      question: "How do true one-way fares work without deadhead return charges?",
      answer: "With Riksho Intercity, you only pay for the exact distance of your one-way journey. We leverage our network of regional fleet partners and return match routing so you never pay the driver's empty return trip fare."
    },
    {
      question: "Are highway tolls, parking, and state entry taxes included in the fare?",
      answer: "Yes! When you request an outstation ride on Riksho, all estimated National Highway FASTag tolls and state border taxes are transparently calculated and presented upfront before booking confirmation."
    },
    {
      question: "What qualifications and background checks do outstation drivers undergo?",
      answer: "All Riksho Intercity captains have a minimum of 5 years of verified highway driving experience, valid commercial passenger transport badges, and verified criminal background checks. Our telemetry monitors speed compliance and rest breaks throughout the trip."
    },
    {
      question: "Can I schedule an outstation cab in advance for early morning or late night departures?",
      answer: "Yes, you can schedule your outstation ride up to 7 days in advance in the Riksho app. Your assigned captain details and vehicle registration will be dispatched 2 hours prior to your scheduled pickup time."
    }
  ];

  const activeRoute = routes[selectedRouteIdx];

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
          {/* Background Photo with Minimal Directional Gradient */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/photo_city_to_city.png"
              alt="City to City Intercity Travel by Riksho"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              priority
            />
            {/* Minimal Ambient Gradient Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(15, 23, 42, 0.62) 0%, rgba(15, 23, 42, 0.32) 45%, rgba(15, 23, 42, 0.02) 100%)"
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
                Every city, one ride away.<br />
                <span style={{ color: "#00C2FF" }}>True one-way &amp; round trips.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "620px",
                margin: 0,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Door-to-door highway travel across India with commercial-licensed drivers, all-inclusive toll transparency, and verified AC comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Popular Intercity Routes Showcase */}
        <section style={{ padding: "64px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "36px"
            }}>
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                  Top Outstation Corridors
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Popular Intercity Routes
                </h2>
              </div>

              {/* One-way vs Roundtrip Toggle */}
              <div style={{
                display: "inline-flex",
                backgroundColor: "#F1F5F9",
                padding: "4px",
                borderRadius: "999px",
                border: "1px solid #E2E8F0"
              }}>
                <button
                  type="button"
                  onClick={() => setTripType("oneway")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: tripType === "oneway" ? "var(--color-indigo)" : "transparent",
                    color: tripType === "oneway" ? "#FFFFFF" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  One-Way Drops
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("roundtrip")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: tripType === "roundtrip" ? "var(--color-indigo)" : "transparent",
                    color: tripType === "roundtrip" ? "#FFFFFF" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  Round Trip Return
                </button>
              </div>
            </div>

            {/* Routes Grid (Strict 3-Column on Desktop) */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px"
            }}>
              {routes.map((route, rIdx) => {
                const isSelected = selectedRouteIdx === rIdx;
                const fare = tripType === "oneway" ? route.onewayFare : route.roundtripFare;
                return (
                  <div
                    key={route.id}
                    className="route-card"
                    onClick={() => setSelectedRouteIdx(rIdx)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: isSelected ? "2px solid var(--color-indigo)" : "1.5px solid #E2E8F0",
                      borderRadius: "20px",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "16px",
                      boxShadow: isSelected ? "0 12px 24px -6px rgba(67, 56, 202, 0.1)" : "0 2px 10px rgba(0,0,0,0.02)",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div>
                      {/* From → To */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: "#0F172A" }}>
                          <span>{route.from}</span>
                          <ArrowRight size={16} color="var(--color-indigo)" strokeWidth={2.5} />
                          <span>{route.to}</span>
                        </div>
                      </div>

                      {/* Distance & Duration */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.85rem", color: "#64748B", marginBottom: "12px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Navigation size={13} color="#0F172A" strokeWidth={2.2} />
                          {route.distance}
                        </span>
                        <span>•</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={13} color="#0F172A" strokeWidth={2.2} />
                          {route.duration}
                        </span>
                      </div>

                      <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                        {route.highlights}
                      </p>
                    </div>

                    {/* Fare Footer */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "14px",
                      borderTop: "1px solid #F1F5F9"
                    }}>
                      <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>
                        {tripType === "oneway" ? "One-Way Starting From" : "Roundtrip Starting From"}
                      </span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: "var(--color-indigo)" }}>
                        {fare}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 1: The Riksho Intercity Promise (With Purple Blob Artwork #4338CA) */}
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
                    alt="Riksho Intercity highway travel"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Outstation Transparency Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Outstation Excellence
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Predictable Highway Travel
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Say goodbye to arbitrary taxi stand quotes, surprise return charges, and driver cancellations before early-morning flights.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <BadgePercent size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        True One-Way Pricing (Zero Return Fees)
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Pay exclusively for the distance you travel. You are never billed for the driver’s deadhead return trip.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Receipt size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        All-Inclusive FASTag &amp; State Tax Clarity
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Toll plaza charges and state passenger entry taxes are estimated and itemized upfront before departure.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <MapPin size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Door-to-Door Outstation Pickups
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Your captain arrives directly at your home or hotel and drops you precisely at your destination address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Highway Safety Standards (With Cyan Blob Artwork #00C2FF) */}
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
                  Long-Haul Safety
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Engineered for National Highways
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Outstation driving requires specialized experience. Every Intercity ride is covered by real-time speed monitoring and emergency safety protocols.
                </p>

                {/* 3 Spacious Highway Safety Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Highway-Vetted Commercial Captains
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Drivers must possess at least 5 years of long-distance driving history, valid commercial badges, and clean background records.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Clock size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Mandatory Rest Breaks &amp; Speed Telemetry
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Our telemetry system alerts drivers to maintain safe highway cruising speeds and enforces rest intervals on trips over 300 km.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Navigation size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        24/7 Highway SOS &amp; Roadside Dispatch
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        In-app emergency button links directly to local State Highway Police patrol and 24/7 mechanical recovery networks.
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
                    alt="Highway safety monitoring and verified vehicle inspections"
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
              {intercityMetrics.map((stat, sIdx) => (
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
                Outstation Helpdesk
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {intercityFaqs.map((faq, fIdx) => {
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

        {/* Global Micro-animation CSS for Route Cards */}
        <style jsx global>{`
          .route-card:hover {
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

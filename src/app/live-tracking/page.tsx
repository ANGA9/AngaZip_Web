"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Share2, 
  ShieldAlert, 
  Navigation, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Search, 
  ShieldCheck, 
  Smartphone
} from "lucide-react";

export default function LiveTrackingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [trackingCode, setTrackingCode] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const trackingPillars = [
    {
      icon: <Navigation size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Sub-Second GPS Telemetry",
      tagline: "Live vehicle coordinates updated smoothly",
      points: [
        "Continuous high-precision vehicle position updates",
        "Accurate live traffic-adjusted Estimated Time of Arrival (ETA)",
        "Zero map stuttering or delayed location freezes"
      ]
    },
    {
      icon: <Share2 size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "1-Tap Family Trip Sharing",
      tagline: "Keep loved ones informed in real time",
      points: [
        "Share a secure web link via WhatsApp, SMS, or Telegram",
        "Recipients can view your route live without downloading an app",
        "Displays vehicle number, driver photo, and exact live location"
      ]
    },
    {
      icon: <ShieldAlert size={24} color="#0F172A" strokeWidth={2.2} />,
      title: "Route Deviation Radar",
      tagline: "Automated geofence & off-route monitoring",
      points: [
        "Automatic safety prompts if a vehicle detours from route",
        "Stationary vehicle alert if stopped abnormally for over 3 mins",
        "Direct one-tap 24/7 Riksho Safety Desk escalation"
      ]
    }
  ];

  const trackingMetrics = [
    { value: "< 1 Sec", label: "Live Telemetry Sync Latency", icon: <Radio size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "100%", label: "GPS Monitored Commercial Trips", icon: <Navigation size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "1-Tap", label: "Instant WhatsApp Trip Sharing", icon: <Share2 size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "24 / 7", label: "Active Telemetry Safety Desk", icon: <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const trackingFaqs = [
    {
      question: "How do I share my live trip with friends or family?",
      answer: "Once your ride begins, tap the 'Share Trip' button on the active booking screen in the Riksho App. You can send a secure, temporary web link via WhatsApp or SMS that allows anyone to follow your vehicle's live movement on a map in real time."
    },
    {
      question: "Does the person tracking my ride need to install the Riksho app?",
      answer: "No. The live tracking link opens directly in any mobile or desktop web browser without requiring account login or app installation."
    },
    {
      question: "What happens if a vehicle deviates from the recommended route?",
      answer: "Our automated telemetry engine continuously checks vehicle GPS against optimal route geometry. If an unexpected deviation or extended stop is detected, the app automatically triggers a safety check-in notification and alerts our 24/7 Safety Command Desk."
    },
    {
      question: "Can I track my darkstore grocery and parcel deliveries in real time?",
      answer: "Yes! Every quick-commerce darkstore and courier order provides live courier map tracking from the moment the rider leaves the micro-warehouse until delivery at your doorstep."
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
              src="/images/photo_city_rides.png"
              alt="Riksho Live Telemetry & GPS Tracking"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
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
                Follow every mile.<br />
                <span style={{ color: "#00C2FF" }}>Precision live tracking &amp; safety sharing.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "640px",
                margin: "0 0 28px 0",
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Share your trip with loved ones, verify live driver coordinates, and access in-app emergency response protocols on every ride and delivery.
              </p>

              {/* Hero Action Button */}
              <div>
                <a
                  href="#track"
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
                  <span>Track an Active Trip</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Live Tracking Search Widget */}
        <section id="track" style={{ padding: "48px 0 24px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <div style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "24px",
              padding: "36px",
              boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.08)",
              textAlign: "center"
            }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Web Telemetry Portal
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Track Ride or Darkstore Order
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#64748B", margin: "0 0 24px 0" }}>
                Enter the 6-digit Ride Tracking PIN or Order ID shared via SMS/WhatsApp.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (trackingCode.trim()) setSearchSubmitted(true);
                }}
                style={{ display: "flex", gap: "12px", maxWidth: "520px", margin: "0 auto", flexWrap: "wrap" }}
              >
                <div style={{ flex: 1, position: "relative", minWidth: "240px" }}>
                  <Search size={18} color="#94A3B8" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    placeholder="e.g. RK-984210"
                    value={trackingCode}
                    onChange={(e) => {
                      setTrackingCode(e.target.value);
                      setSearchSubmitted(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "14px 16px 14px 44px",
                      borderRadius: "999px",
                      border: "1.5px solid #CBD5E1",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#0F172A",
                      outline: "none"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--color-indigo)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(67, 56, 202, 0.35)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  Track Live
                </button>
              </form>

              {searchSubmitted && (
                <div style={{
                  marginTop: "24px",
                  padding: "18px 24px",
                  backgroundColor: "var(--color-indigo-tint)",
                  borderRadius: "14px",
                  border: "1px solid rgba(67, 56, 202, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981", animation: "pulse 1.5s infinite" }} />
                    <div>
                      <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>Trip #{trackingCode.toUpperCase()} • Live En Route</div>
                      <div style={{ fontSize: "0.85rem", color: "#64748B" }}>Driver Captain: Rajesh K. • White Sedan • ETA 6 mins</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-indigo)" }}>Active GPS Link</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section: 3 Core Live Tracking Pillars */}
        <section style={{ padding: "48px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Telemetry Capabilities
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Complete Transparency on Every Trip
              </h2>
              <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Real-time positioning, trusted contact sharing, and proactive route deviation radar.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px"
            }}>
              {trackingPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="tracking-card"
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

        {/* Section 1: Emergency Telemetry & SOS (With Purple Blob Artwork #4338CA) */}
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
                    alt="Emergency live telemetry and police response"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Telemetry Safety Narrative */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Passenger Security
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Connected to Emergency Services 24/7
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Every trip is monitored in real time with an in-app emergency SOS button that sends live vehicle coordinates directly to emergency response units.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Radio size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Instant 112 Police Dispatch Link
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        One tap triggers an encrypted emergency data packet containing your live coordinates, vehicle license plate, and driver profile.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <ShieldCheck size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        24/7 Safety Command Center
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Dedicated safety officers review automated anomaly flags, prolonged stops, and driver verification status around the clock.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Smartphone size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Automatic Trusted Contact SMS Alerts
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Configure up to 5 emergency contacts who receive automatic live trip notifications for late-night rides.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contactless OTP Handover (With Cyan Blob Artwork #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Handover Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Delivery Assurance
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Contactless OTP Verification
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  Every ride and darkstore delivery requires a private 4-digit OTP provided only to the passenger or recipient, guaranteeing zero false drop-offs.
                </p>

                {/* 3 Spacious Feature Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <CheckCircle2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Unique 4-Digit Ride PIN
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        The driver cannot start the meter or drive without you verbally confirming the dynamic PIN generated in your app.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Clock size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Doorstep Delivery Handover
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Darkstore delivery packages are handed over only after verifying the customer’s secure delivery code at your doorstep.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Sparkles size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Digital Invoice &amp; Trip Receipt
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Instant itemized trip receipt sent directly to your registered email and WhatsApp with route map playback.
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
                    alt="Contactless OTP verification and trip receipt"
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
              {trackingMetrics.map((stat, sIdx) => (
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
                Tracking FAQs
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {trackingFaqs.map((faq, fIdx) => {
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
          .tracking-card:hover {
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

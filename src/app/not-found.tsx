"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, HelpCircle, Compass, Car, Briefcase, MapPin } from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { label: "Book City Rides", href: "/city-rides", icon: <Car size={16} strokeWidth={2} /> },
    { label: "City to City", href: "/city-to-city", icon: <MapPin size={16} strokeWidth={2} /> },
    { label: "Drive with Riksho", href: "/drive-a-cab", icon: <Compass size={16} strokeWidth={2} /> },
    { label: "Enterprise Fleets", href: "/business", icon: <Briefcase size={16} strokeWidth={2} /> },
    { label: "Customer Support", href: "/support", icon: <HelpCircle size={16} strokeWidth={2} /> }
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "120px",
        paddingBottom: "80px",
        backgroundColor: "#FFFFFF"
      }}>
        <div className="container" style={{ maxWidth: "680px", textAlign: "center" }}>
          {/* 404 Status Pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            backgroundColor: "var(--color-indigo-tint)",
            color: "var(--color-indigo)",
            fontWeight: 800,
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "20px"
          }}>
            <span>404 — Route Not Found</span>
          </div>

          {/* Large Numerical Indicator */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 12vw, 120px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#0F172A",
            letterSpacing: "-0.04em",
            marginBottom: "12px"
          }}>
            4<span style={{ color: "var(--color-indigo)" }}>0</span>4
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.25,
            marginBottom: "14px"
          }}>
            Lost in Transit?
          </h1>

          {/* Description */}
          <p style={{
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "#64748B",
            maxWidth: "480px",
            margin: "0 auto 20px auto"
          }}>
            The road you are looking for has taken a detour or doesn&apos;t exist. Let&apos;s get you back on track.
          </p>

          {/* Handwritten Cursive Note */}
          <div style={{ marginBottom: "32px" }}>
            <span className="proudly-indian" style={{ fontSize: "1.35rem", color: "#64748B" }}>
              Every detour leads to a new destination ✨
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "48px"
          }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--color-indigo)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "14px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(67, 56, 202, 0.35)",
                transition: "transform 0.15s ease"
              }}
            >
              <Home size={18} strokeWidth={2.2} />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/support"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                color: "#0F172A",
                border: "1.5px solid #CBD5E1",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "14px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "border-color 0.15s ease"
              }}
            >
              <HelpCircle size={18} strokeWidth={2.2} />
              <span>Help Center</span>
            </Link>
          </div>

          {/* Quick Navigation Links */}
          <div style={{
            borderTop: "1px solid #F1F5F9",
            paddingTop: "32px"
          }}>
            <span style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94A3B8",
              display: "block",
              marginBottom: "16px"
            }}>
              Popular Destinations
            </span>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px"
            }}>
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    color: "#334155",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-indigo)";
                    e.currentTarget.style.color = "var(--color-indigo)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#334155";
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

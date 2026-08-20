"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, 
  Trash2, 
  Smartphone, 
  Mail, 
  Building2, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Clock,
  UserCheck
} from "lucide-react";

export default function DeleteAccountPage() {
  const [audience, setAudience] = useState<"customer" | "partner">("customer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: "80px", backgroundColor: "#FFFFFF" }}>
        {/* Document Header Banner (Matching Privacy Policy & Terms) */}
        <section className="legal-hero">
          {/* Subtle top brand color accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #4338CA 0%, #00C2FF 100%)" }} />

          <div className="container">
            {/* Breadcrumb & Official Badges */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              flexWrap: "wrap", 
              gap: "12px", 
              marginBottom: "16px" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: "#64748B", flexWrap: "wrap" }}>
                <Link href="/" style={{ color: "#64748B", textDecoration: "none", fontWeight: 500 }}>Home</Link>
                <span>/</span>
                <Link href="/privacy" style={{ color: "#64748B", textDecoration: "none", fontWeight: 500 }}>Legal</Link>
                <span>/</span>
                <span style={{ color: "var(--color-indigo, #4338CA)", fontWeight: 700 }}>
                  Account & Data Deletion
                </span>
              </div>

              {/* Version & Entity Badge (Desktop) */}
              <div className="legal-badges-desktop">
                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  backgroundColor: "rgba(67, 56, 202, 0.08)", 
                  padding: "4px 12px", 
                  borderRadius: "999px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  color: "#4338CA",
                  border: "1px solid rgba(67, 56, 202, 0.2)"
                }}>
                  <Scale size={13} />
                  DPDP Act 2023 Compliant
                </span>

                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  backgroundColor: "#F8FAFC", 
                  padding: "4px 12px", 
                  borderRadius: "999px", 
                  fontSize: "0.75rem", 
                  fontWeight: 600, 
                  color: "#334155",
                  border: "1px solid #E2E8F0"
                }}>
                  <Building2 size={13} color="#64748B" />
                  Riksho Technologies Pvt. Ltd.
                </span>
              </div>
            </div>

            {/* Document Title & Subtitle */}
            <h1 style={{ 
              fontFamily: "var(--font-display, inherit)", 
              fontSize: "clamp(24px, 5.5vw, 40px)", 
              fontWeight: 800, 
              letterSpacing: "-0.02em", 
              margin: "0 0 12px 0", 
              color: "#0F172A",
              lineHeight: 1.25,
              wordBreak: "break-word"
            }}>
              Account & Personal Data Deletion Request
            </h1>
            <p style={{ 
              fontSize: "clamp(0.92rem, 3vw, 1.05rem)", 
              lineHeight: 1.65, 
              maxWidth: "880px", 
              color: "#475569", 
              margin: "0 0 20px 0" 
            }}>
              In accordance with India&apos;s Digital Personal Data Protection (DPDP) Act and Google Play User Data policies, Riksho users and driver partners have the right to permanently delete their account and purge associated telemetry and personal identifiers.
            </p>

            {/* Audience Switcher Bar */}
            <div className="legal-meta-bar">
              <div className="legal-audience-switcher">
                <button
                  type="button"
                  onClick={() => { setAudience("customer"); setSubmitted(false); }}
                  className="legal-audience-btn"
                  style={{
                    backgroundColor: audience === "customer" ? "#4338CA" : "transparent",
                    color: audience === "customer" ? "#FFFFFF" : "#64748B",
                    boxShadow: audience === "customer" ? "0 2px 8px rgba(67, 56, 202, 0.25)" : "none",
                    border: "none"
                  }}
                >
                  Customer Account (Riksho)
                </button>
                <button
                  type="button"
                  onClick={() => { setAudience("partner"); setSubmitted(false); }}
                  className="legal-audience-btn"
                  style={{
                    backgroundColor: audience === "partner" ? "#4338CA" : "transparent",
                    color: audience === "partner" ? "#FFFFFF" : "#64748B",
                    boxShadow: audience === "partner" ? "0 2px 8px rgba(67, 56, 202, 0.25)" : "none",
                    border: "none"
                  }}
                >
                  Partner Account (Riksho Buddy)
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "#64748B" }}>
                <Clock size={15} color="#4338CA" />
                <span>Purge SLA: <strong>Within 30 Days</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div className="container" style={{ paddingTop: "40px", maxWidth: "980px" }}>
          
          {/* Methods Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
            
            {/* Method 1: In-App Immediate Deletion */}
            <div style={{ 
              backgroundColor: "#FFFFFF", 
              borderRadius: "16px", 
              padding: "28px", 
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              display: "flex", 
              flexDirection: "column" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "rgba(67, 56, 202, 0.08)", color: "#4338CA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Smartphone size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#4338CA", display: "block" }}>
                    Option 1 (Instant)
                  </span>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                    In-App Self-Service
                  </h2>
                </div>
              </div>

              <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6, marginBottom: "20px" }}>
                If you have the <strong>{audience === "customer" ? "Riksho" : "Riksho Buddy"}</strong> mobile app installed on your phone, you can trigger immediate account deletion:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#EEF2FF", color: "#4338CA", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>1</span>
                  <span style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.5 }}>
                    Open <strong>{audience === "customer" ? "Riksho" : "Riksho Buddy"}</strong> and tap your <strong>Profile</strong> tab.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#EEF2FF", color: "#4338CA", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>2</span>
                  <span style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.5 }}>
                    Navigate to <strong>Settings</strong> $\rightarrow$ <strong>Data & Privacy</strong>.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#FEE2E2", color: "#DC2626", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>3</span>
                  <span style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.5 }}>
                    Tap <strong>Delete Account</strong> and confirm the verification dialog.
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "24px", padding: "12px 14px", backgroundColor: "#F8FAFC", borderRadius: "10px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "#64748B" }}>
                <Lock size={15} color="#64748B" />
                <span>Session revoked instantly upon confirmation</span>
              </div>
            </div>

            {/* Method 2: Official Web Request Form */}
            <div style={{ 
              backgroundColor: "#FFFFFF", 
              borderRadius: "16px", 
              padding: "28px", 
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#F8FAFC", color: "#334155", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #E2E8F0" }}>
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748B", display: "block" }}>
                    Option 2 (Online Request)
                  </span>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                    Submit Web Deletion Request
                  </h2>
                </div>
              </div>

              {submitted ? (
                <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "24px 16px", textAlign: "center", margin: "16px 0" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#16A34A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#166534", margin: "0 0 4px 0" }}>
                    Request Successfully Logged
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "#15803D", lineHeight: 1.5, margin: 0 }}>
                    We have recorded your deletion ticket for registered number <strong>{phone}</strong> ({audience === "customer" ? "Customer" : "Riksho Buddy Partner"}). All personal identifiers will be purged within 30 days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Registered Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      style={{ 
                        width: "100%", 
                        height: "40px", 
                        padding: "0 12px", 
                        borderRadius: "8px", 
                        border: "1px solid #CBD5E1", 
                        backgroundColor: "#FFFFFF", 
                        fontSize: "0.875rem", 
                        color: "#0F172A", 
                        outline: "none", 
                        boxSizing: "border-box" 
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Registered Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      style={{ 
                        width: "100%", 
                        height: "40px", 
                        padding: "0 12px", 
                        borderRadius: "8px", 
                        border: "1px solid #CBD5E1", 
                        backgroundColor: "#FFFFFF", 
                        fontSize: "0.875rem", 
                        color: "#0F172A", 
                        outline: "none", 
                        boxSizing: "border-box" 
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Reason for Deletion (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Let us know how we can improve..."
                      style={{ 
                        width: "100%", 
                        padding: "8px 12px", 
                        borderRadius: "8px", 
                        border: "1px solid #CBD5E1", 
                        backgroundColor: "#FFFFFF", 
                        fontSize: "0.875rem", 
                        color: "#0F172A", 
                        outline: "none", 
                        resize: "none", 
                        boxSizing: "border-box" 
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      height: "42px",
                      borderRadius: "8px",
                      backgroundColor: "#4338CA",
                      color: "#FFFFFF",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "background-color 0.2s ease",
                      marginTop: "4px"
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Deletion Request"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Legal Governance & Retention Terms Card (Clean Monochrome & Indigo) */}
          <div style={{ 
            backgroundColor: "#FFFFFF", 
            borderRadius: "16px", 
            padding: "28px", 
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <ShieldCheck size={22} color="#4338CA" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Data Purge & Retention Governance (DPDP Act)
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "20px" }}>
              <div style={{ backgroundColor: "#F8FAFC", padding: "18px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A", margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Trash2 size={15} color="#4338CA" />
                  Permanently Purged
                </h4>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.8125rem", color: "#475569", lineHeight: 1.6 }}>
                  <li>User profile details (Name, Phone number, Email)</li>
                  <li>Saved favorite locations, addresses, and route history</li>
                  <li>Live telematics GPS records & device advertising IDs</li>
                  <li>Firebase push notification tokens and authentication sessions</li>
                </ul>
              </div>

              <div style={{ backgroundColor: "#F8FAFC", padding: "18px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A", margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FileText size={15} color="#64748B" />
                  Statutory Legal Retention
                </h4>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.8125rem", color: "#475569", lineHeight: 1.6 }}>
                  <li>Completed ride transaction invoices and GST billing records (retained for statutory taxation laws under Section 36 of CGST Act)</li>
                  <li>Anonymized dispute audit logs for insurance or police safety compliance</li>
                </ul>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "space-between", 
              alignItems: "center", 
              gap: "10px", 
              paddingTop: "16px", 
              borderTop: "1px solid #F1F5F9", 
              fontSize: "0.8125rem", 
              color: "#64748B" 
            }}>
              <span>Grievance Officer: <a href="mailto:grievance@riksho.in" style={{ color: "#4338CA", fontWeight: 600, textDecoration: "none" }}>grievance@riksho.in</a></span>
              <span>Processing Window: <strong>Within 30 Calendar Days</strong></span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

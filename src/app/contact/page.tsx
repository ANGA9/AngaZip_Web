"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Clock, 
  UserCheck, 
  Send, 
  CheckCircle2, 
  Headphones, 
  Briefcase, 
  Car, 
  ShieldCheck, 
  Building2, 
  HelpCircle,
  Phone
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "passenger",
    subject: "",
    message: ""
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const contactFaqs = [
    {
      question: "Can I visit the Riksho corporate office in person?",
      answer: "Yes, our registered corporate office at G744+2PV, Jalkal, Maheshtala, West Bengal 700141 is open for partner document verifications and corporate client meetings Monday through Saturday, from 9:30 AM to 6:30 PM IST."
    },
    {
      question: "How do I escalate an unresolved customer service ticket?",
      answer: "If your support query has not been resolved within 48 hours, you can escalate it directly to our statutory Grievance Officer (Sumit Shaw) by emailing grievance@riksho.in with your previous ticket ID."
    },
    {
      question: "Where should enterprise and corporate partnership inquiries be directed?",
      answer: "Corporate account managers, enterprise ride contracts, and darkstore delivery integrations can be reached directly via business@riksho.in. Our B2B sales team responds within 1 business day."
    },
    {
      question: "How do driver partners get in-person onboarding support?",
      answer: "Driver partners can visit local partner support hubs or upload documents directly through the Riksho Partner App. For document re-verification questions, reach out to partnercare@riksho.in."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Light Theme Header Hero Banner */}
        <section style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          paddingTop: "112px",
          paddingBottom: "48px",
          position: "relative"
        }}>
          {/* Brand Top Accent Gradient */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #00C2FF 0%, #4338CA 100%)" }} />

          <div className="container">
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "#64748B", marginBottom: "16px" }}>
              <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700 }}>Contact Us</span>
            </div>

            <div style={{ maxWidth: "760px" }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4.5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 16px 0",
                color: "#0F172A",
                lineHeight: 1.2
              }}>
                Get in Touch with Riksho
              </h1>

              <p style={{ fontSize: "1.1rem", lineHeight: 1.65, color: "#475569", margin: 0 }}>
                Have questions about rides, driver onboarding, enterprise partnerships, or press inquiries? Connect with our dedicated support and corporate desks.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Direct Communication Channels Cards */}
        <section style={{ padding: "48px 0 24px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "48px"
            }}>
              {/* Customer Care */}
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "var(--color-indigo-tint)", color: "var(--color-indigo)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                    <Headphones size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    Passenger Care
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#475569", marginBottom: "16px" }}>
                    Assistance with live ride tracking, fare receipts, lost property, and booking assistance.
                  </p>
                </div>
                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "14px" }}>
                  <a href="mailto:support@riksho.in" style={{ color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} />
                    <span>support@riksho.in</span>
                  </a>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Avg response time: within 24 hours</div>
                </div>
              </div>

              {/* Driver & Partner Desk */}
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0284C7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                    <Car size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    Driver & Fleet Help Desk
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#475569", marginBottom: "16px" }}>
                    Daily payout verification, commercial vehicle KYC approval, and partner earnings support.
                  </p>
                </div>
                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "14px" }}>
                  <a href="mailto:partnercare@riksho.in" style={{ color: "#0284C7", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} />
                    <span>partnercare@riksho.in</span>
                  </a>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Dedicated Partner Onboarding Support</div>
                </div>
              </div>

              {/* Business & Corporate Partnerships */}
              <div style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#F0FDF4", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                    <Briefcase size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    Business & Media
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#475569", marginBottom: "16px" }}>
                    Corporate employee travel accounts, darkstore courier fulfillment API, and press queries.
                  </p>
                </div>
                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "14px" }}>
                  <a href="mailto:business@riksho.in" style={{ color: "#16A34A", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} />
                    <span>business@riksho.in</span>
                  </a>
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>Press: press@riksho.in</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Section: Interactive Form + Registered Office & Custom Art Style Vector Illustration */}
        <section style={{ padding: "48px 0 64px 0", backgroundColor: "#F8FAFC", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "start"
            }}>
              {/* Left Column: Interactive Contact Form */}
              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "clamp(24px, 4vw, 40px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
              }}>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                    Send a Message
                  </span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
                    How can we assist you?
                  </h2>
                  <p style={{ color: "#64748B", fontSize: "0.9rem", margin: 0 }}>
                    Fill in your details below and our team will get back to you promptly.
                  </p>
                </div>

                {formSubmitted ? (
                  <div style={{
                    backgroundColor: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    borderRadius: "14px",
                    padding: "32px 20px",
                    textAlign: "center"
                  }}>
                    <CheckCircle2 size={44} color="#16A34A" style={{ marginBottom: "14px" }} />
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#166534", marginBottom: "6px" }}>
                      Message Received!
                    </h3>
                    <p style={{ color: "#15803D", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "18px" }}>
                      Thank you, {formData.name || "friend"}. We have received your inquiry and our team will respond to <strong>{formData.email}</strong> within 1 business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", role: "passenger", subject: "", message: "" });
                      }}
                      style={{
                        backgroundColor: "var(--color-indigo)",
                        color: "white",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        border: "none"
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sumit Shaw"
                          style={{
                            width: "100%",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "0.9rem",
                            backgroundColor: "#F8FAFC",
                            outline: "none"
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          style={{
                            width: "100%",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "0.9rem",
                            backgroundColor: "#F8FAFC",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Phone Number (+91)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="9876543210"
                          style={{
                            width: "100%",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "0.9rem",
                            backgroundColor: "#F8FAFC",
                            outline: "none"
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          I am a: *
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            fontSize: "0.9rem",
                            backgroundColor: "#F8FAFC",
                            outline: "none"
                          }}
                        >
                          <option value="passenger">Passenger / Rider</option>
                          <option value="driver">Driver / Delivery Partner</option>
                          <option value="enterprise">Corporate / B2B Client</option>
                          <option value="press">Media / Press Reporter</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Partnership request, fare question, etc."
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.9rem",
                          backgroundColor: "#F8FAFC",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.9rem",
                          backgroundColor: "#F8FAFC",
                          outline: "none",
                          resize: "vertical"
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "var(--color-indigo)",
                        color: "white",
                        padding: "14px 28px",
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(67, 56, 202, 0.25)"
                      }}
                    >
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Custom Art Style Editorial Illustration + Corporate Headquarters */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Custom Vector Editorial Illustration */}
                <div style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #E2E8F0",
                  padding: "24px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1/1",
                  maxHeight: "360px"
                }}>
                  <Image
                    src="/images/ill_contact_hub.png"
                    alt="Riksho Customer and Support Desk Illustration"
                    fill
                    style={{ objectFit: "contain", padding: "12px" }}
                    priority
                  />
                </div>

                {/* Official Corporate Office Card */}
                <div style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #E2E8F0",
                  padding: "28px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <Building2 size={22} color="var(--color-indigo)" />
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                      Corporate Headquarters
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <MapPin size={18} color="var(--color-indigo)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.55 }}>
                        <strong>Riksho Technologies Pvt. Ltd.</strong><br />
                        G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Clock size={18} color="var(--color-indigo)" style={{ flexShrink: 0 }} />
                      <div style={{ fontSize: "0.875rem", color: "#64748B" }}>
                        Mon – Sat: 9:30 AM – 6:30 PM IST (Sundays closed)
                      </div>
                    </div>

                    {/* Statutory Officer Box */}
                    <div style={{
                      backgroundColor: "var(--color-indigo-tint)",
                      border: "1px solid rgba(67, 56, 202, 0.2)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      marginTop: "6px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <UserCheck size={16} color="var(--color-indigo)" />
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#312E81" }}>
                          Chief Nodal & Grievance Redressal Officer
                        </span>
                      </div>
                      <div style={{ fontSize: "0.8125rem", color: "#4338CA", fontWeight: 600 }}>Sumit Shaw</div>
                      <div style={{ fontSize: "0.8125rem", color: "#475569", marginTop: "2px" }}>
                        Direct Escalations: <a href="mailto:grievance@riksho.in" style={{ color: "var(--color-indigo)", fontWeight: 700, textDecoration: "underline" }}>grievance@riksho.in</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section style={{ padding: "56px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Need Help?
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Contact & Escalation FAQ
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {contactFaqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    style={{
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      backgroundColor: isOpen ? "#F8FAFC" : "#FFFFFF",
                      overflow: "hidden",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      style={{
                        width: "100%",
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        textAlign: "left",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: isOpen ? "var(--color-indigo)" : "#0F172A"
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ color: "var(--color-indigo)", fontSize: "1.1rem", fontWeight: 700 }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: "0 20px 18px 20px",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#475569",
                        borderTop: "1px solid #F1F5F9",
                        paddingTop: "14px"
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

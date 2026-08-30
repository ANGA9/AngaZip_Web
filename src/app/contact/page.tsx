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
  Building2
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
      answer: "If your support query has not been resolved within 48 hours, you can escalate it directly to our statutory Grievance Officer (Sumit Shaw) by emailing grievance@riksho.com with your previous ticket ID."
    },
    {
      question: "Where should enterprise and corporate partnership inquiries be directed?",
      answer: "Corporate account managers, enterprise ride contracts, and darkstore delivery integrations can be reached directly via support@riksho.com."
    },
    {
      question: "How do driver partners get in-person onboarding support?",
      answer: "Driver partners can visit local partner support hubs or upload documents directly through the Riksho Partner App. For document questions, reach out to support@riksho.com."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Light Theme Header Hero Banner */}
        <section style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          paddingTop: "112px",
          paddingBottom: "40px",
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
                margin: "0 0 14px 0",
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

        {/* 3 Unified Brand Indigo Direct Channel Cards */}
        <section style={{ padding: "40px 0 24px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "40px"
            }}>
              {/* Passenger Care */}
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
                    Assistance with live ride tracking, fare receipts, lost property, and booking support.
                  </p>
                </div>
                <div>
                  <a href="mailto:support@riksho.com" style={{ color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} />
                    <span>support@riksho.com</span>
                  </a>
                </div>
              </div>

              {/* Driver & Fleet Help Desk */}
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
                    <Car size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    Driver &amp; Partner Desk
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#475569", marginBottom: "16px" }}>
                    Partner KYC approval, earnings inquiries, and buddy account assistance.
                  </p>
                </div>
                <div>
                  <a href="mailto:support@riksho.com" style={{ color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} />
                    <span>support@riksho.com</span>
                  </a>
                </div>
              </div>

              {/* Grievance & Legal */}
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
                    <Briefcase size={22} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    Grievance &amp; Escalations
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#475569", marginBottom: "16px" }}>
                    Official nodal escalation desk for unresolved issues and regulatory compliance.
                  </p>
                </div>
                <div>
                  <a href="mailto:grievance@riksho.com" style={{ color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} />
                    <span>grievance@riksho.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Contact Form & Seamless Illustration (Form Left, Illustration Right on Desktop, Stacked on Mobile) */}
        <section style={{ padding: "16px 0 56px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1px solid #E2E8F0",
              padding: "clamp(24px, 4vw, 44px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "40px",
                alignItems: "center"
              }}>
                {/* Left Side: Form Inputs */}
                <div>
                  <div style={{ marginBottom: "24px" }}>
                    <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                      Send a Message
                    </span>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
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
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
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
                              backgroundColor: "#FFFFFF",
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
                              backgroundColor: "#FFFFFF",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
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
                              backgroundColor: "#FFFFFF",
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
                              backgroundColor: "#FFFFFF",
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
                            backgroundColor: "#FFFFFF",
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
                            backgroundColor: "#FFFFFF",
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

                {/* Right Side: Seamless Vector Illustration (On Desktop: Right Side, On Phone: Bottom) */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    maxWidth: "420px",
                    aspectRatio: "1/1"
                  }}>
                    <Image
                      src="/images/ill_contact_hub.png"
                      alt="Riksho Customer and Support Desk Illustration"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section style={{ padding: "40px 0 56px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Need Help?
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Contact &amp; Escalation FAQ
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {contactFaqs.map((faq, fIdx) => {
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
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        textAlign: "left",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "1rem",
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

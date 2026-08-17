"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  User, 
  Car, 
  Briefcase, 
  ShieldAlert, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CheckCircle2, 
  Send,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

interface SupportCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
  topics: string[];
}

interface SupportFaq {
  category: string;
  question: string;
  answer: string;
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "rider",
    issueType: "fare",
    description: ""
  });

  const categories: SupportCategory[] = [
    {
      id: "rider",
      icon: <User size={24} color="var(--color-indigo)" />,
      title: "Passenger & Rider Help",
      desc: "Trip cancellations, fare inquiries, lost items, promo codes, and ride receipts.",
      badge: "24/7 Available",
      topics: ["Fare breakdown & receipts", "Lost item recovery", "Driver behavior & feedback", "Wallet & refunds"]
    },
    {
      id: "driver",
      icon: <Car size={24} color="var(--color-indigo)" />,
      title: "Driver & Partner Hub",
      desc: "Daily payout settlements, KYC verification, vehicle registration, and driver incentives.",
      badge: "Fast Track Desk",
      topics: ["Daily bank payouts", "Document KYC re-verification", "App GPS & trip dispatches", "Incentive bonuses"]
    },
    {
      id: "business",
      icon: <Briefcase size={24} color="var(--color-indigo)" />,
      title: "Corporate & Fleet Desk",
      desc: "Corporate employee rides, centralized invoicing, GST billing, and fleet operator tools.",
      badge: "Priority B2B",
      topics: ["Corporate ride vouchers", "GST monthly invoices", "Fleet dispatch console", "Darkstore courier API"]
    },
    {
      id: "safety",
      icon: <ShieldAlert size={24} color="var(--color-indigo)" />,
      title: "Safety & Emergency (SOS)",
      desc: "Instant emergency reporting, accident claims, 24/7 Police SOS (112), and telemetry audits.",
      badge: "Immediate Priority",
      topics: ["Emergency SOS protocol", "Accidental insurance claim", "Live ride sharing", "Safety audit reports"]
    }
  ];

  const allFaqs: SupportFaq[] = [
    {
      category: "rider",
      question: "How do I report an item left behind in a Riksho cab or auto?",
      answer: "Open the Riksho app > Activity > select the completed ride > tap 'Find Lost Item'. You can call the driver directly via our in-app masked telephone proxy within 48 hours of trip completion, or email support@riksho.in with your Trip ID."
    },
    {
      category: "rider",
      question: "Why was I charged a cancellation fee?",
      answer: "Riders enjoy free cancellations within the first 2 minutes of booking acceptance. If canceled after 2 minutes or after the driver arrives at the pickup point, a small fee (₹25–₹50) is charged to compensate the driver for fuel and time."
    },
    {
      category: "driver",
      question: "When are daily earnings and incentive payouts credited to my bank?",
      answer: "All digital trip earnings and earned milestone bonuses are automatically settled every morning by 8:00 AM IST directly to your registered bank account or verified UPI VPA with zero platform deduction delays."
    },
    {
      category: "driver",
      question: "How do I update my vehicle insurance or driving license?",
      answer: "In the Riksho Partner App, go to Account > Documents > select the document you wish to renew. Upload a clear photograph and our verification team will approve it within 2–4 hours."
    },
    {
      category: "safety",
      question: "How does the in-app 24/7 Emergency SOS button work?",
      answer: "Tapping the SOS shield button in the live ride screen triggers an immediate high-priority alert. It sends your live GPS coordinates, vehicle registration number, and driver details to local Police Control (112) and dials our 24/7 Emergency Response Command Center."
    },
    {
      category: "business",
      question: "Can my company get consolidated monthly invoices with input tax credit?",
      answer: "Yes! Companies registered under Riksho for Business receive itemized monthly Excel & PDF invoices detailing every employee ride, cost center allocation, and statutory tax breakdowns."
    }
  ];

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter(faq => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const matchesQuery = !searchQuery.trim() || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
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
          {/* Brand Accent Top Line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #4338CA 0%, #00C2FF 100%)" }} />

          <div className="container">
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "#64748B", marginBottom: "16px" }}>
              <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700 }}>Help & Support</span>
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
                How can we assist you today?
              </h1>

              <p style={{ fontSize: "1.1rem", lineHeight: 1.65, color: "#475569", margin: 0 }}>
                Browse our verified help library, explore ride categories, or connect directly with our 24/7 passenger and partner support desks.
              </p>
            </div>
          </div>
        </section>

        {/* Support Categories Section */}
        <section style={{ padding: "56px 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ marginBottom: "32px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Knowledge Library
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Explore by Category
              </h2>
            </div>

            {/* 4 Category Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginBottom: "48px"
            }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? "all" : cat.id)}
                    style={{
                      backgroundColor: isSelected ? "var(--color-indigo-tint)" : "#FFFFFF",
                      border: isSelected ? "2px solid var(--color-indigo)" : "1px solid #E2E8F0",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: isSelected ? "0 8px 24px rgba(67, 56, 202, 0.12)" : "0 2px 10px rgba(0,0,0,0.03)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          backgroundColor: isSelected ? "#FFFFFF" : "var(--color-indigo-tint)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(67, 56, 202, 0.15)"
                        }}>
                          {cat.icon}
                        </div>

                        <span style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          backgroundColor: isSelected ? "var(--color-indigo)" : "#F1F5F9",
                          color: isSelected ? "#FFFFFF" : "#475569",
                          padding: "3px 10px",
                          borderRadius: "999px"
                        }}>
                          {cat.badge}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                        {cat.title}
                      </h3>

                      <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#475569", marginBottom: "16px" }}>
                        {cat.desc}
                      </p>
                    </div>

                    <div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px", padding: 0 }}>
                        {cat.topics.map((t, idx) => (
                          <li key={idx} style={{ fontSize: "0.8125rem", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--color-indigo)" }} />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>

                      <span style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--color-indigo)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        {isSelected ? "Showing related FAQs ↑" : "Filter FAQs →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Spotlight: Help Channels with Custom Editorial Art Style Illustration */}
        <section style={{ padding: "48px 0", backgroundColor: "#F8FAFC", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "36px",
              alignItems: "center"
            }}>
              {/* Left Column: Direct Action Assistance */}
              <div>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Direct Channels
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", marginBottom: "16px", lineHeight: 1.25 }}>
                  Need Immediate Help? We're on Standby
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "#475569", marginBottom: "28px" }}>
                  Whether you're currently in transit, waiting for an auto/cab dispatch, or checking a driver settlement, our operations desk is ready to support you.
                </p>

                {/* Direct Action Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* Emergency SOS */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                    borderRadius: "14px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#DC2626", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <AlertTriangle size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#991B1B" }}>Emergency Police & Medical (112)</div>
                      <div style={{ fontSize: "0.8125rem", color: "#7F1D1D" }}>Direct emergency dispatch connection during live trips</div>
                    </div>
                    <a href="tel:112" style={{
                      backgroundColor: "#DC2626",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      textDecoration: "none"
                    }}>
                      Call 112
                    </a>
                  </div>

                  {/* Email Support */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "14px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--color-indigo-tint)", color: "var(--color-indigo)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>Customer & Partner Email</div>
                      <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>support@riksho.in • Response within 24 hours</div>
                    </div>
                    <a href="mailto:support@riksho.in" style={{
                      backgroundColor: "var(--color-indigo-tint)",
                      color: "var(--color-indigo)",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      textDecoration: "none"
                    }}>
                      Send Email
                    </a>
                  </div>

                  {/* Grievance Desk */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "14px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#F0FDF4", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>Chief Grievance Officer</div>
                      <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>Sumit Shaw (grievance@riksho.in)</div>
                    </div>
                    <Link href="/privacy" style={{
                      backgroundColor: "#F1F5F9",
                      color: "#334155",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      textDecoration: "none"
                    }}>
                      View Desk
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Art Style Vector Illustration */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "440px",
                  aspectRatio: "1/1",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 8px 32px rgba(15, 23, 42, 0.06)",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Image
                    src="/images/ill_support_hub.png"
                    alt="Riksho 24/7 Support Illustration"
                    fill
                    style={{ objectFit: "contain", padding: "16px" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section style={{ padding: "56px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "880px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Instant Answers
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 36px)", fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#64748B", fontSize: "1rem" }}>
                {selectedCategory !== "all" ? `Showing FAQs for: ${categories.find(c => c.id === selectedCategory)?.title}` : "Common queries about fares, driver payouts, safety, and receipts."}
              </p>

              {/* Filter Pills */}
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginTop: "18px" }}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "999px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: selectedCategory === "all" ? "var(--color-indigo)" : "#F1F5F9",
                    color: selectedCategory === "all" ? "#FFFFFF" : "#475569",
                    border: "none"
                  }}
                >
                  All Questions ({allFaqs.length})
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "999px",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: selectedCategory === c.id ? "var(--color-indigo)" : "#F1F5F9",
                      color: selectedCategory === c.id ? "#FFFFFF" : "#475569",
                      border: "none"
                    }}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredFaqs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#F8FAFC", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <p style={{ color: "#64748B", fontSize: "0.95rem", margin: 0 }}>No matching answers found. Try a different search term or submit a ticket below.</p>
                </div>
              ) : (
                filteredFaqs.map((faq, fIdx) => {
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
                })
              )}
            </div>
          </div>
        </section>

        {/* Submit a Support Ticket Section */}
        <section style={{ padding: "56px 0", backgroundColor: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
          <div className="container" style={{ maxWidth: "780px" }}>
            <div style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E2E8F0",
              padding: "clamp(24px, 5vw, 44px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
            }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "var(--color-indigo-tint)",
                  color: "var(--color-indigo)",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  marginBottom: "10px"
                }}>
                  <MessageSquare size={14} />
                  Ticket Submission Desk
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "#0F172A", margin: "0 0 8px 0" }}>
                  Report an Issue or Submit a Ticket
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.95rem", margin: 0 }}>
                  Our resolution team will review your case and respond via email or SMS within 24 hours.
                </p>
              </div>

              {ticketSubmitted ? (
                <div style={{
                  backgroundColor: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  textAlign: "center"
                }}>
                  <CheckCircle2 size={48} color="#16A34A" style={{ marginBottom: "16px" }} />
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#166534", marginBottom: "8px" }}>
                    Ticket Successfully Created!
                  </h4>
                  <p style={{ color: "#15803D", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto 20px auto" }}>
                    Thank you, {ticketForm.name || "valued customer"}. Ticket reference <strong>#RIK-{Math.floor(100000 + Math.random() * 900000)}</strong> has been registered. Our support team will reach out at <strong>{ticketForm.email || "your email"}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setTicketSubmitted(false);
                      setTicketForm({ name: "", email: "", phone: "", category: "rider", issueType: "fare", description: "" });
                    }}
                    style={{
                      backgroundColor: "var(--color-indigo)",
                      color: "white",
                      padding: "10px 24px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      border: "none"
                    }}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
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
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        placeholder="name@example.com"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.9rem",
                          backgroundColor: "#F8FAFC",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Mobile Number (+91)
                      </label>
                      <input
                        type="tel"
                        value={ticketForm.phone}
                        onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
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
                        Issue Category *
                      </label>
                      <select
                        value={ticketForm.issueType}
                        onChange={(e) => setTicketForm({ ...ticketForm, issueType: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          border: "1px solid #CBD5E1",
                          fontSize: "0.9rem",
                          backgroundColor: "#F8FAFC",
                          outline: "none"
                        }}
                      >
                        <option value="fare">Fare & Overcharge Dispute</option>
                        <option value="lost">Lost Item in Ride</option>
                        <option value="driver">Driver Feedback / Conduct</option>
                        <option value="payout">Driver Payout / Wallet Issue</option>
                        <option value="safety">Safety or Incident Report</option>
                        <option value="other">General Account Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Detailed Description & Trip ID *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      placeholder="Please include your Trip ID, date, pickup location, and details of what happened..."
                      style={{
                        width: "100%",
                        padding: "12px 14px",
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
                      fontSize: "1rem",
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
                    <span>Submit Support Ticket</span>
                  </button>
                </form>
              )}
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

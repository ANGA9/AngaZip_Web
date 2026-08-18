"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  X, 
  Send,
  Users,
  Code2,
  TrendingUp,
  HeartHandshake,
  ShieldCheck,
  Zap
} from "lucide-react";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeJob, setActiveJob] = useState<JobRole | null>(null);
  const [applied, setApplied] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantResume, setApplicantResume] = useState("");

  const stats = [
    { value: "100+", label: "Engineers & Operations Leads", icon: <Users size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "4.9/5", label: "Team Glassdoor Culture Score", icon: <Sparkles size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "₹0", label: "Bureaucracy / High Autonomy", icon: <Zap size={20} color="#0F172A" strokeWidth={2.2} /> },
    { value: "50+", label: "Cities Scaled on Our Code", icon: <TrendingUp size={20} color="#0F172A" strokeWidth={2.2} /> }
  ];

  const departments = [
    "All",
    "Engineering",
    "Product & Design",
    "Operations & Growth",
    "Trust & Safety"
  ];

  const jobRoles: JobRole[] = [
    {
      id: "sr-backend-systems",
      title: "Senior Backend Systems Engineer",
      department: "Engineering",
      location: "Kolkata, WB / Hybrid",
      type: "Full-Time",
      experience: "4–7 Years",
      description: "Architect sub-second dispatch algorithms, spatial indexing graphs, and high-concurrency microservices processing millions of daily ride pings.",
      responsibilities: [
        "Scale distributed geospatial matching clusters using Go and PostgreSQL/PostGIS.",
        "Optimize WebSocket and MQTT telemetry pipelines for low-latency driver tracking.",
        "Ensure 99.99% system availability during extreme urban peak transit hours."
      ],
      requirements: [
        "Strong experience with Go, Node.js/TypeScript, or Rust.",
        "Deep understanding of Redis, spatial data structures (H3/S2), and Kafka/RabbitMQ.",
        "Experience building high-throughput low-latency REST and gRPC services."
      ]
    },
    {
      id: "mobile-engineer-react-native",
      title: "Lead Mobile Engineer (React Native)",
      department: "Engineering",
      location: "Kolkata / Remote",
      type: "Full-Time",
      experience: "3–6 Years",
      description: "Build robust, offline-resilient mobile experiences for both passenger and driver partner apps across Android and iOS.",
      responsibilities: [
        "Develop high-performance navigation and booking interfaces with Expo and React Native.",
        "Build background location tracking and battery-efficient GPS telemetry handlers.",
        "Implement end-to-end encryption for DPDP-compliant telephone and message proxies."
      ],
      requirements: [
        "Expertise in React Native, TypeScript, and native Android/iOS bridge modules.",
        "Demonstrated track record of shipping consumer mobile apps at scale.",
        "Passion for smooth micro-interactions and 60fps UI performance."
      ]
    },
    {
      id: "sr-product-designer",
      title: "Senior Product Designer (UI/UX)",
      department: "Product & Design",
      location: "Kolkata, WB",
      type: "Full-Time",
      experience: "3–5 Years",
      description: "Design intuitive mobility and delivery experiences for riders, driver partners with varied digital literacy, and fleet operators.",
      responsibilities: [
        "Create end-to-end user journeys for multimodal transit (autos, bike taxis, cabs).",
        "Conduct on-ground research with drivers at transport hubs and auto stands.",
        "Maintain and evolve our design system with high accessibility standards."
      ],
      requirements: [
        "Strong portfolio demonstrating system-level thinking and mobile UX clarity.",
        "Proficiency in Figma, design systems, and interactive micro-prototypes.",
        "Empathy for building multilingual products for everyday Indian commuters."
      ]
    },
    {
      id: "city-operations-manager",
      title: "City Operations Manager (Eastern India)",
      department: "Operations & Growth",
      location: "Kolkata / Patna / Ranchi",
      type: "Full-Time",
      experience: "3–6 Years",
      description: "Lead on-ground supply acquisition, driver partner onboarding camps, and municipal union partnerships in new launch cities.",
      responsibilities: [
        "Establish local driver onboarding hubs and manage field operations teams.",
        "Work directly with auto-rickshaw and taxi unions to drive platform adoption.",
        "Monitor city supply-demand balance and optimize captain daily earnings."
      ],
      requirements: [
        "Prior operations or city launch experience in mobility, logistics, or food tech.",
        "Exceptional stakeholder management and on-ground problem-solving agility.",
        "Fluency in Hindi/Bengali and deep familiarity with regional transport dynamics."
      ]
    },
    {
      id: "trust-safety-lead",
      title: "Trust & Safety Operations Lead",
      department: "Trust & Safety",
      location: "Kolkata, WB",
      type: "Full-Time",
      experience: "2–5 Years",
      description: "Manage 24/7 Incident Command operations, emergency SOS escalations with Police 112, and driver document compliance audits.",
      responsibilities: [
        "Supervise live safety command dispatchers and critical emergency protocols.",
        "Partner with law enforcement nodal officers for fast-track dispute resolutions.",
        "Audit KYC verification workflows for 100% background-checked compliance."
      ],
      requirements: [
        "Experience in safety operations, emergency dispatch, or grievance redressal.",
        "Calm decision-making ability during time-sensitive critical incidents.",
        "Strong understanding of Indian transport safety and data privacy norms."
      ]
    },
    {
      id: "growth-marketing-lead",
      title: "Growth & Performance Marketing Lead",
      department: "Operations & Growth",
      location: "Kolkata / Hybrid",
      type: "Full-Time",
      experience: "3–5 Years",
      description: "Scale organic and performance acquisition loops for riders and captains across Tier-1 and Tier-2 Indian urban markets.",
      responsibilities: [
        "Design hyper-localized rider acquisition campaigns and referral mechanisms.",
        "Analyze cohort retention, CAC, and LTV across cab and bike taxi tiers.",
        "Lead regional PR and community marketing initiatives."
      ],
      requirements: [
        "Proven experience scaling B2C mobile apps in India.",
        "Data-driven mindset with proficiency in SQL, Mixpanel, and ad platforms.",
        "Creative instinct for cultural nuance in regional Indian markets."
      ]
    }
  ];

  const filteredRoles = selectedDept === "All"
    ? jobRoles
    : jobRoles.filter(j => j.department === selectedDept);

  const careersFaqs = [
    {
      question: "What does the interview and hiring process look like at Riksho?",
      answer: "Our hiring process is fast and transparent (typically 2 to 3 weeks). It consists of an initial alignment call, a practical technical or case study assessment, a system architecture/deep-dive interview with the team, and a final conversation with our founders."
    },
    {
      question: "Does Riksho offer remote or hybrid work flexibility?",
      answer: "Yes! While our primary engineering and operations headquarters is located in Kolkata, West Bengal, we offer hybrid options for engineering and design roles, as well as field-based positions across our operational cities."
    },
    {
      question: "What benefits and wellness packages are provided to team members?",
      answer: "We provide comprehensive health and medical insurance for employees and dependents, attractive employee stock ownership plans (ESOPs), flexible paid time off, and continuous learning and equipment stipends."
    },
    {
      question: "How can I apply if my specific role is not currently listed?",
      answer: "We are always looking for exceptional builders and operators. You can send your portfolio and resume directly to our talent team at careers@riksho.in with a note on what you'd like to build with us."
    }
  ];

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setActiveJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantResume("");
    }, 2500);
  };

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
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/photo_careers.png"
              alt="Careers and Life at Riksho"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
            />
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
                Build what moves India.<br />
                <span style={{ color: "#00C2FF" }}>High ownership, zero red tape.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "620px",
                margin: 0,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Join a high-velocity engineering, design, and operations team solving urban mobility for millions of passengers and driver partners.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Culture & Engineering DNA (With Cyan Blob Illustration #00C2FF) */}
        <section style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              {/* Left Column: Custom Cyan Blob Illustration (#00C2FF) */}
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
                    src="/images/ill_careers_engineering.png"
                    alt="Riksho Engineering and Team Collaboration"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Culture Narrative */}
              <div>
                <span style={{ color: "#0284C7", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Engineering &amp; Culture
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: "16px" }}>
                  Built by Builders, for Real Cities
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#475569", marginBottom: "28px" }}>
                  We work on real-world systems with immediate physical impact: every millisecond shaved off our dispatch engine saves hours for real people on Indian roads.
                </p>

                {/* 3 Spacious Culture Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Code2 size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Full-Stack Ownership &amp; Autonomy
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Own your architecture from database schemas and mobile telemetry pipelines to live on-road captain validation.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Rapid 2-Week Deployment Sprints
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Move from prototype to production with automated CI/CD and direct user feedback from passengers and captains.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(0, 194, 255, 0.12)", color: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <HeartHandshake size={20} color="#0F172A" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                        Comprehensive Wellness &amp; Equity
                      </h4>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                        Competitive ESOP grants, 100% family medical coverage, hybrid flexibility, and continuous learning stipends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Numbers at a Glance (Impact Metrics) */}
        <section style={{ padding: "48px 0", backgroundColor: "#FFFFFF", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px"
            }}>
              {stats.map((stat, sIdx) => (
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

        {/* Section 3: Open Positions Job Board (Strict 3-Column Desktop Grid) */}
        <section id="open-roles" style={{ padding: "64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            {/* Header & Filter Row */}
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
                  Join the Team
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Open Positions
                </h3>
              </div>

              {/* Department Filter Tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {departments.map((dept) => {
                  const isActive = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "999px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        border: isActive ? "1.5px solid var(--color-indigo)" : "1.5px solid #E2E8F0",
                        backgroundColor: isActive ? "var(--color-indigo)" : "#FFFFFF",
                        color: isActive ? "#FFFFFF" : "#475569",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Jobs Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
            <div className="jobs-grid">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="job-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    cursor: "pointer"
                  }}
                  onClick={() => setActiveJob(role)}
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{
                        backgroundColor: "var(--color-indigo-tint)",
                        color: "var(--color-indigo)",
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase"
                      }}>
                        {role.department}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#64748B", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={13} color="#0F172A" strokeWidth={2.2} />
                        {role.type}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h4 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0F172A",
                      lineHeight: 1.3,
                      marginBottom: "10px"
                    }}>
                      {role.title}
                    </h4>

                    {/* Short description */}
                    <p style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "#64748B",
                      marginBottom: "14px"
                    }}>
                      {role.description}
                    </p>

                    {/* Location & Experience tags */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.8rem", color: "#475569" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <MapPin size={13} color="#0F172A" strokeWidth={2.2} />
                        {role.location}
                      </span>
                      <span>•</span>
                      <span>{role.experience}</span>
                    </div>
                  </div>

                  {/* Footer Apply CTA */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #F1F5F9",
                    fontSize: "0.85rem"
                  }}>
                    <span style={{ color: "#64748B", fontWeight: 600 }}>ESOPs + Medical</span>
                    <button
                      type="button"
                      className="apply-job-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveJob(role);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "var(--color-indigo)",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <span>View Role Details</span>
                      <span className="arrow-icon" style={{ display: "inline-flex" }}>
                        <ArrowUpRight size={16} color="#0F172A" strokeWidth={2.2} />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Job Detail & Application Dialogue Box */}
        {activeJob && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(6px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(10px, 3vw, 24px)"
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveJob(null);
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                maxWidth: "740px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                padding: "clamp(24px, 5vw, 44px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveJob(null)}
                aria-label="Close dialog"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "#F1F5F9",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#0F172A"
                }}
              >
                <X size={18} color="#0F172A" strokeWidth={2.2} />
              </button>

              {/* Job Header */}
              <div style={{ borderBottom: "1px solid #F1F5F9", paddingBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{
                    backgroundColor: "var(--color-indigo-tint)",
                    color: "var(--color-indigo)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase"
                  }}>
                    {activeJob.department}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
                    {activeJob.location} • {activeJob.type}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  fontWeight: 800,
                  color: "#0F172A",
                  lineHeight: 1.25,
                  marginBottom: "8px",
                  paddingRight: "36px"
                }}>
                  {activeJob.title}
                </h2>
                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {activeJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "12px" }}>
                  Key Responsibilities
                </h4>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "#334155", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {activeJob.responsibilities.map((r, rIdx) => (
                    <li key={rIdx}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "12px" }}>
                  What We Look For
                </h4>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "#334155", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {activeJob.requirements.map((req, qIdx) => (
                    <li key={qIdx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Position Closed Notification Card */}
              <div style={{
                backgroundColor: "var(--color-indigo-tint)",
                border: "1.5px solid rgba(67, 56, 202, 0.18)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Clock size={18} color="#0F172A" strokeWidth={2.2} />
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    Applications Currently Closed
                  </h4>
                </div>

                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#475569", margin: 0 }}>
                  Active applications for this position are currently closed while our talent team reviews existing candidate submissions.
                </p>

                <div style={{
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(67, 56, 202, 0.12)",
                  fontSize: "0.875rem",
                  color: "#334155"
                }}>
                  To submit your resume for future openings or spontaneous applications, email our hiring desk directly at{" "}
                  <a
                    href="mailto:careers@riksho.in?subject=Future%20Opportunity%20Inquiry%20-%20Riksho"
                    style={{ color: "var(--color-indigo)", fontWeight: 700, textDecoration: "underline" }}
                  >
                    careers@riksho.in
                  </a>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Micro-animation CSS for Jobs Grid */}
        <style jsx global>{`
          .jobs-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          @media (max-width: 1024px) {
            .jobs-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 640px) {
            .jobs-grid {
              grid-template-columns: 1fr;
            }
          }
          .job-card {
            transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.22s ease !important;
          }
          .job-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 14px 28px -6px rgba(15, 23, 42, 0.09) !important;
            border-color: rgba(67, 56, 202, 0.35) !important;
          }
          .job-card:hover .arrow-icon {
            transform: translate(2px, -2px);
          }
          .arrow-icon {
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>

        {/* Section 4: Clean Interactive FAQ Accordion */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Hiring &amp; Culture
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {careersFaqs.map((faq, fIdx) => {
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
      </main>

      {/* Home Page Consistent Footer (No App Promotional Banner as requested) */}
      <Footer />
    </div>
  );
}

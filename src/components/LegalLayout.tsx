"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  FileText, 
  ShieldCheck, 
  Search, 
  Printer, 
  Link as LinkIcon, 
  Check, 
  Building2, 
  Calendar, 
  UserCheck, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  HelpCircle,
  Scale
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  legalUiTranslations, 
  webTermsCustomerTranslations, 
  webTermsPartnerTranslations,
  webPrivacyCustomerTranslations,
  webPrivacyPartnerTranslations,
  LegalDocument
} from "@/constants/webLegalTranslations";

interface LegalLayoutProps {
  type: "terms" | "privacy";
}

export default function LegalLayout({ type }: LegalLayoutProps) {
  const [audience, setAudience] = useState<"customer" | "partner">("customer");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Select appropriate document based on type and audience (English-only standard)
  const currentDoc: LegalDocument = useMemo(() => {
    if (type === "terms") {
      return audience === "customer" ? webTermsCustomerTranslations : webTermsPartnerTranslations;
    } else {
      return audience === "customer" ? webPrivacyCustomerTranslations : webPrivacyPartnerTranslations;
    }
  }, [type, audience]);

  const ui = legalUiTranslations;

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return currentDoc.sections;
    const q = searchQuery.toLowerCase().trim();
    return currentDoc.sections.filter(sec => 
      sec.title.toLowerCase().includes(q) ||
      sec.paragraphs.some(p => p.toLowerCase().includes(q)) ||
      sec.bullets?.some(b => b.toLowerCase().includes(q))
    );
  }, [currentDoc, searchQuery]);

  // Scrollspy to highlight active ToC item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of currentDoc.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentDoc]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 95;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSectionId(id);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: "80px", backgroundColor: "#FFFFFF" }}>
        {/* Light Theme Document Header Banner with proper Navbar Clearance */}
        <section style={{ 
          backgroundColor: "#FFFFFF", 
          borderBottom: "1px solid #E2E8F0",
          paddingTop: "112px",
          paddingBottom: "36px",
          position: "relative"
        }}>
          {/* Subtle top brand color accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #4338CA 0%, #00C2FF 100%)" }} />

          <div className="container">
            {/* Breadcrumb & Official Badges */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              flexWrap: "wrap", 
              gap: "16px", 
              marginBottom: "20px" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#64748B" }}>
                <Link href="/" style={{ color: "#64748B", textDecoration: "none", fontWeight: 500 }}>Home</Link>
                <span>/</span>
                <span style={{ color: "#64748B" }}>Legal Center</span>
                <span>/</span>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700 }}>
                  {type === "terms" ? "Terms of Service" : "Privacy Policy"}
                </span>
              </div>

              {/* Version & Entity Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  backgroundColor: "var(--color-indigo-tint)", 
                  padding: "6px 14px", 
                  borderRadius: "999px", 
                  fontSize: "0.8125rem", 
                  fontWeight: 700, 
                  color: "var(--color-indigo)",
                  border: "1px solid rgba(67, 56, 202, 0.2)"
                }}>
                  <Scale size={14} />
                  {currentDoc.version}
                </span>

                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  backgroundColor: "#F8FAFC", 
                  padding: "6px 14px", 
                  borderRadius: "999px", 
                  fontSize: "0.8125rem", 
                  fontWeight: 600, 
                  color: "#334155",
                  border: "1px solid #E2E8F0"
                }}>
                  <Building2 size={14} color="#64748B" />
                  {currentDoc.entityName}
                </span>
              </div>
            </div>

            {/* Document Title & Subtitle */}
            <h1 style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(30px, 3.8vw, 44px)", 
              fontWeight: 800, 
              letterSpacing: "-0.02em", 
              margin: "0 0 14px 0", 
              color: "#0F172A",
              lineHeight: 1.2
            }}>
              {currentDoc.title}
            </h1>
            <p style={{ 
              fontSize: "1.05rem", 
              lineHeight: 1.65, 
              maxWidth: "880px", 
              color: "#475569", 
              margin: "0 0 28px 0" 
            }}>
              {currentDoc.subtitle}
            </p>

            {/* Light Meta Bar: Audience Switcher & Quick Actions */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              flexWrap: "wrap", 
              gap: "20px",
              paddingTop: "24px",
              borderTop: "1px solid #F1F5F9"
            }}>
              {/* Audience Switcher (Customer vs Driver Partner) */}
              <div style={{ 
                display: "inline-flex", 
                backgroundColor: "#F1F5F9", 
                padding: "4px", 
                borderRadius: "12px", 
                border: "1px solid #E2E8F0" 
              }}>
                <button
                  type="button"
                  onClick={() => { setAudience("customer"); setSearchQuery(""); }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: audience === "customer" ? "#FFFFFF" : "transparent",
                    color: audience === "customer" ? "var(--color-indigo)" : "#64748B",
                    boxShadow: audience === "customer" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                    border: audience === "customer" ? "1px solid #E2E8F0" : "1px solid transparent"
                  }}
                >
                  {ui.customerTab}
                </button>
                <button
                  type="button"
                  onClick={() => { setAudience("partner"); setSearchQuery(""); }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: audience === "partner" ? "#FFFFFF" : "transparent",
                    color: audience === "partner" ? "var(--color-indigo)" : "#64748B",
                    boxShadow: audience === "partner" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                    border: audience === "partner" ? "1px solid #E2E8F0" : "1px solid transparent"
                  }}
                >
                  {ui.partnerTab}
                </button>
              </div>

              {/* Document Meta & Actions */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                {/* Last Updated */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: "#64748B" }}>
                  <Calendar size={15} color="var(--color-indigo)" />
                  <span>{ui.lastUpdatedLabel}: <strong>{currentDoc.lastUpdated}</strong></span>
                </div>

                {/* Print & Share Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    title={ui.copyLink}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      color: "#334155",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                    }}
                  >
                    {copied ? <Check size={14} color="#059669" /> : <LinkIcon size={14} />}
                    <span>{copied ? ui.linkCopied : ui.copyLink}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    title={ui.printDoc}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #CBD5E1",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      color: "#334155",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                    }}
                  >
                    <Printer size={14} />
                    <span>{ui.printDoc}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout with Sticky Sidebar */}
        <div className="container" style={{ marginTop: "40px" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(12, 1fr)", 
            gap: "36px", 
            alignItems: "start" 
          }}>
            {/* Left Sticky Sidebar: Document Outline & Search */}
            <aside style={{ 
              gridColumn: "span 4",
              position: "sticky",
              top: "100px",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}>
              {/* Search Box */}
              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "10px 14px"
                }}>
                  <Search size={16} color="var(--color-indigo)" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={ui.searchPlaceholder}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      fontSize: "0.875rem",
                      color: "#0F172A"
                    }}
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery("")}
                      style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 700 }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Table of Contents List */}
              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
              }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  marginBottom: "16px", 
                  paddingBottom: "12px", 
                  borderBottom: "1px solid #F1F5F9" 
                }}>
                  <h4 style={{ 
                    fontSize: "0.875rem", 
                    fontWeight: 700, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em", 
                    color: "var(--color-indigo)" 
                  }}>
                    {ui.tableOfContents}
                  </h4>
                  <span style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: 700, 
                    backgroundColor: "var(--color-indigo-tint)", 
                    color: "var(--color-indigo)", 
                    padding: "2px 8px", 
                    borderRadius: "999px" 
                  }}>
                    {currentDoc.sections.length} Clauses
                  </span>
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "3px", maxHeight: "440px", overflowY: "auto" }}>
                  {currentDoc.sections.map((section) => {
                    const isActive = activeSectionId === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          textAlign: "left",
                          fontSize: "0.875rem",
                          lineHeight: 1.45,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          backgroundColor: isActive ? "var(--color-indigo-tint)" : "transparent",
                          color: isActive ? "var(--color-indigo)" : "#475569",
                          fontWeight: isActive ? 700 : 500,
                          borderLeft: isActive ? "3px solid var(--color-indigo)" : "3px solid transparent"
                        }}
                      >
                        <span style={{ 
                          fontSize: "0.8125rem", 
                          fontWeight: 700, 
                          color: isActive ? "var(--color-indigo)" : "#64748B", 
                          minWidth: "20px", 
                          paddingTop: "1px" 
                        }}>
                          {section.number}.
                        </span>
                        <span style={{ flex: 1 }}>{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Switcher Box */}
              <div style={{
                backgroundColor: "#F8FAFC",
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontSize: "0.8125rem", color: "#64748B", fontWeight: 500 }}>
                    {type === "terms" ? "Need Privacy Policy?" : "Need Terms of Service?"}
                  </div>
                  <Link 
                    href={type === "terms" ? "/privacy" : "/terms"}
                    style={{ 
                      fontSize: "0.875rem", 
                      fontWeight: 700, 
                      color: "var(--color-indigo)", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "4px",
                      marginTop: "2px" 
                    }}
                  >
                    <span>{type === "terms" ? "View Privacy Policy" : "View Terms of Service"}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Main Legal Article */}
            <article style={{ 
              gridColumn: "span 8",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E2E8F0",
              padding: "48px 40px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.03)"
            }}>
              {/* Official Statutory Notice Header */}
              <div style={{
                backgroundColor: "var(--color-indigo-tint)",
                border: "1px solid rgba(67, 56, 202, 0.2)",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <ShieldCheck size={20} color="var(--color-indigo)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: "0.875rem", color: "#312E81", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                  {ui.officialNotice}
                </p>
              </div>

              {/* Document Introduction Paragraphs */}
              <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: "1px solid #F1F5F9" }}>
                {currentDoc.intro.map((para, idx) => (
                  <p key={idx} style={{ 
                    fontSize: "1rem", 
                    lineHeight: 1.8, 
                    color: "#334155", 
                    marginBottom: idx < currentDoc.intro.length - 1 ? "18px" : 0 
                  }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Clauses Section */}
              {filteredSections.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>
                  <Search size={36} color="var(--color-indigo)" style={{ marginBottom: "16px" }} />
                  <h3 style={{ fontSize: "1.125rem", color: "#1E293B", marginBottom: "6px" }}>{ui.noResults}</h3>
                  <p style={{ fontSize: "0.875rem" }}>Try searching with different keywords or clear the filter.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
                  {filteredSections.map((section) => (
                    <section 
                      key={section.id} 
                      id={section.id} 
                      style={{ 
                        scrollMarginTop: "110px",
                        position: "relative"
                      }}
                    >
                      {/* Section Header with Clean Single-Line Number Badge */}
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px", 
                        marginBottom: "18px",
                        paddingBottom: "14px",
                        borderBottom: "1px solid #F1F5F9"
                      }}>
                        <span style={{ 
                          fontSize: "0.875rem", 
                          fontWeight: 800, 
                          color: "var(--color-indigo)", 
                          backgroundColor: "var(--color-indigo-tint)", 
                          padding: "4px 12px", 
                          borderRadius: "8px",
                          fontFamily: "var(--font-display)",
                          border: "1px solid rgba(67, 56, 202, 0.15)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          whiteSpace: "nowrap",
                          flexShrink: 0
                        }}>
                          {section.number}
                        </span>
                        <h2 style={{ 
                          fontFamily: "var(--font-display)", 
                          fontSize: "1.45rem", 
                          fontWeight: 700, 
                          color: "#0F172A",
                          margin: 0
                        }}>
                          {section.title}
                        </h2>
                      </div>

                      {/* Section Paragraphs */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: section.bullets ? "18px" : 0 }}>
                        {section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} style={{ fontSize: "1rem", lineHeight: 1.8, color: "#334155", margin: 0 }}>
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* Section Bullet Points Styled Cleanly Without Ugly Big Bullets */}
                      {section.bullets && section.bullets.length > 0 && (
                        <div style={{ 
                          margin: "18px 0 0 0", 
                          display: "flex", 
                          flexDirection: "column", 
                          gap: "12px" 
                        }}>
                          {section.bullets.map((bullet, bIdx) => (
                            <div 
                              key={bIdx} 
                              style={{ 
                                display: "flex", 
                                alignItems: "flex-start", 
                                gap: "12px",
                                padding: "10px 14px",
                                backgroundColor: "#F8FAFC",
                                borderRadius: "10px",
                                border: "1px solid #F1F5F9"
                              }}
                            >
                              <div style={{ 
                                width: "6px", 
                                height: "6px", 
                                borderRadius: "50%", 
                                backgroundColor: "var(--color-indigo)", 
                                marginTop: "9px",
                                flexShrink: 0 
                              }} />
                              <span style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "#334155", flex: 1 }}>
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Section Callout if present */}
                      {section.callout && (
                        <div style={{ 
                          marginTop: "20px", 
                          backgroundColor: "#FEF3C7", 
                          borderLeft: "4px solid #D97706", 
                          padding: "14px 18px", 
                          borderRadius: "0 10px 10px 0",
                          fontSize: "0.9rem",
                          color: "#92400E",
                          lineHeight: 1.6,
                          fontWeight: 500
                        }}>
                          {section.callout}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              )}

              {/* Interactive Legal FAQ Section */}
              {currentDoc.faqs && currentDoc.faqs.length > 0 && (
                <div style={{ 
                  marginTop: "64px", 
                  paddingTop: "48px", 
                  borderTop: "2px dashed #E2E8F0" 
                }}>
                  <div style={{ marginBottom: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                      <HelpCircle size={18} />
                      <span>{ui.faqTitle}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                      {type === "terms" ? "Terms & Billing FAQ" : "Data Privacy & Security FAQ"}
                    </h3>
                    <p style={{ color: "#64748B", fontSize: "0.95rem", marginTop: "6px" }}>
                      {ui.faqSubtitle}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {currentDoc.faqs.map((faq, fIdx) => {
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
                            <span style={{ color: "var(--color-indigo)", fontSize: "0.85rem", fontWeight: 700 }}>
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
              )}

              {/* Statutory Grievance & Compliance Card (Clean Light Theme) */}
              <div style={{ 
                marginTop: "64px", 
                padding: "32px", 
                backgroundColor: "#F8FAFC", 
                color: "#0F172A", 
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid var(--color-indigo)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <UserCheck size={22} color="var(--color-indigo)" />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                    {ui.grievanceTitle}
                  </h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.65, marginBottom: "20px" }}>
                  {ui.grievanceDesc}
                </p>

                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
                  gap: "16px",
                  padding: "18px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  fontSize: "0.875rem"
                }}>
                  <div>
                    <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.95rem" }}>{ui.officerName}</div>
                    <div style={{ color: "var(--color-indigo)", fontSize: "0.8125rem", fontWeight: 600 }}>{ui.officerRole}</div>
                    <div style={{ color: "#64748B", fontSize: "0.75rem", marginTop: "2px" }}>{ui.officerEntity}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Mail size={16} color="var(--color-indigo)" />
                    <a href={`mailto:${ui.officerEmail}`} style={{ color: "var(--color-indigo)", textDecoration: "underline", fontWeight: 600 }}>
                      {ui.officerEmail}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "16px", fontSize: "0.8125rem", color: "#475569" }}>
                  <MapPin size={16} color="#64748B" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{ui.officerAddress}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", fontSize: "0.8125rem", color: "#64748B" }}>
                  <Clock size={14} color="var(--color-indigo)" />
                  <span>{ui.officerResponseTime}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

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
  Scale,
  Cookie,
  List,
  ChevronDown,
  ChevronUp,
  X
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
  webCookiePolicyCustomerTranslations,
  webCookiePolicyPartnerTranslations,
  LegalDocument
} from "@/constants/webLegalTranslations";

interface LegalLayoutProps {
  type: "terms" | "privacy" | "cookies";
}

export default function LegalLayout({ type }: LegalLayoutProps) {
  const [audience, setAudience] = useState<"customer" | "partner">("customer");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState<boolean>(false);

  // Select appropriate document based on type and audience (English-only standard)
  const currentDoc: LegalDocument = useMemo(() => {
    if (type === "terms") {
      return audience === "customer" ? webTermsCustomerTranslations : webTermsPartnerTranslations;
    } else if (type === "privacy") {
      return audience === "customer" ? webPrivacyCustomerTranslations : webPrivacyPartnerTranslations;
    } else {
      return audience === "customer" ? webCookiePolicyCustomerTranslations : webCookiePolicyPartnerTranslations;
    }
  }, [type, audience]);

  const ui = legalUiTranslations;

  const getPageTitle = () => {
    switch (type) {
      case "terms": return "Terms of Service";
      case "privacy": return "Privacy Policy";
      case "cookies": return "Cookie Policy";
    }
  };

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
      setIsMobileTocOpen(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", color: "#0F172A", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: "80px", backgroundColor: "#FFFFFF" }}>
        {/* Light Theme Document Header Banner */}
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
                <span style={{ color: "#64748B" }}>Legal</span>
                <span>/</span>
                <span style={{ color: "var(--color-indigo)", fontWeight: 700 }}>
                  {getPageTitle()}
                </span>
              </div>

              {/* Version & Entity Badge (Desktop Only) */}
              <div className="legal-badges-desktop">
                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  backgroundColor: "var(--color-indigo-tint)", 
                  padding: "4px 12px", 
                  borderRadius: "999px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  color: "var(--color-indigo)",
                  border: "1px solid rgba(67, 56, 202, 0.2)"
                }}>
                  {type === "cookies" ? <Cookie size={13} /> : <Scale size={13} />}
                  {currentDoc.version}
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
                  {currentDoc.entityName}
                </span>
              </div>
            </div>

            {/* Document Title & Subtitle */}
            <h1 style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(24px, 5.5vw, 42px)", 
              fontWeight: 800, 
              letterSpacing: "-0.02em", 
              margin: "0 0 12px 0", 
              color: "#0F172A",
              lineHeight: 1.25,
              wordBreak: "break-word"
            }}>
              {currentDoc.title}
            </h1>
            <p style={{ 
              fontSize: "clamp(0.92rem, 3vw, 1.05rem)", 
              lineHeight: 1.65, 
              maxWidth: "880px", 
              color: "#475569", 
              margin: "0 0 20px 0" 
            }}>
              {currentDoc.subtitle}
            </p>

            {/* Responsive Meta Bar: Audience Switcher & Quick Actions */}
            <div className="legal-meta-bar">
              {/* Audience Switcher */}
              <div className="legal-audience-switcher">
                <button
                  type="button"
                  onClick={() => { setAudience("customer"); setSearchQuery(""); }}
                  className="legal-audience-btn"
                  style={{
                    backgroundColor: audience === "customer" ? "#FFFFFF" : "transparent",
                    color: audience === "customer" ? "var(--color-indigo)" : "#64748B",
                    boxShadow: audience === "customer" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                    border: audience === "customer" ? "1px solid #E2E8F0" : "1px solid transparent"
                  }}
                >
                  {ui.customerTab}
                </button>
                <button
                  type="button"
                  onClick={() => { setAudience("partner"); setSearchQuery(""); }}
                  className="legal-audience-btn"
                  style={{
                    backgroundColor: audience === "partner" ? "#FFFFFF" : "transparent",
                    color: audience === "partner" ? "var(--color-indigo)" : "#64748B",
                    boxShadow: audience === "partner" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                    border: audience === "partner" ? "1px solid #E2E8F0" : "1px solid transparent"
                  }}
                >
                  {ui.partnerTab}
                </button>
              </div>

              {/* Actions & Updated Date */}
              <div className="legal-actions-group">
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: "#64748B" }}>
                  <Calendar size={14} color="var(--color-indigo)" />
                  <span>{ui.lastUpdatedLabel}: <strong>{currentDoc.lastUpdated}</strong></span>
                </div>

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
                      padding: "6px 12px",
                      color: "#334155",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
                    }}
                  >
                    {copied ? <Check size={13} color="#059669" /> : <LinkIcon size={13} />}
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
                      padding: "6px 12px",
                      color: "#334155",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
                    }}
                  >
                    <Printer size={13} />
                    <span>{ui.printDoc}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="container" style={{ marginTop: "24px" }}>
          {/* Mobile Collapsible Table of Contents / Search */}
          <div className="legal-sidebar-mobile">
            <button
              type="button"
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#0F172A",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <List size={16} color="var(--color-indigo)" />
                <span>Browse Clauses ({currentDoc.sections.length})</span>
              </div>
              {isMobileTocOpen ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
            </button>

            {isMobileTocOpen && (
              <div style={{
                marginTop: "10px",
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                padding: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
              }}>
                {/* Search Box */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  marginBottom: "14px"
                }}>
                  <Search size={15} color="var(--color-indigo)" />
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
                      fontSize: "0.8125rem",
                      color: "#0F172A"
                    }}
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery("")} style={{ color: "#64748B" }}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* ToC List */}
                <nav style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "300px", overflowY: "auto" }}>
                  {currentDoc.sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        textAlign: "left",
                        fontSize: "0.8125rem",
                        lineHeight: 1.4,
                        cursor: "pointer",
                        backgroundColor: activeSectionId === section.id ? "var(--color-indigo-tint)" : "transparent",
                        color: activeSectionId === section.id ? "var(--color-indigo)" : "#475569",
                        fontWeight: activeSectionId === section.id ? 700 : 500
                      }}
                    >
                      <span style={{ fontWeight: 800, minWidth: "18px" }}>{section.number}.</span>
                      <span style={{ flex: 1 }}>{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>

          <div className="legal-grid">
            {/* Left Sticky Sidebar for Desktop */}
            <aside className="legal-sidebar-desktop">
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

                <nav style={{ display: "flex", flexDirection: "column", gap: "3px", maxHeight: "400px", overflowY: "auto" }}>
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

              {/* Quick Switcher Box: Cross-links between Legal Documents */}
              <div style={{
                backgroundColor: "#F8FAFC",
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <div style={{ fontSize: "0.8125rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Related Legal Documents
                </div>
                
                {type !== "terms" && (
                  <Link 
                    href="/terms"
                    style={{ 
                      fontSize: "0.875rem", 
                      fontWeight: 600, 
                      color: "var(--color-indigo)", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      justifyContent: "space-between" 
                    }}
                  >
                    <span>Terms of Service</span>
                    <ArrowUpRight size={14} />
                  </Link>
                )}

                {type !== "privacy" && (
                  <Link 
                    href="/privacy"
                    style={{ 
                      fontSize: "0.875rem", 
                      fontWeight: 600, 
                      color: "var(--color-indigo)", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      justifyContent: "space-between" 
                    }}
                  >
                    <span>Privacy Policy</span>
                    <ArrowUpRight size={14} />
                  </Link>
                )}

                {type !== "cookies" && (
                  <Link 
                    href="/cookie-policy"
                    style={{ 
                      fontSize: "0.875rem", 
                      fontWeight: 600, 
                      color: "var(--color-indigo)", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      justifyContent: "space-between" 
                    }}
                  >
                    <span>Cookie Policy</span>
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            </aside>

            {/* Right Main Legal Article */}
            <article className="legal-article">
              {/* Official Statutory Notice Header */}
              <div style={{
                backgroundColor: "var(--color-indigo-tint)",
                border: "1px solid rgba(67, 56, 202, 0.2)",
                borderRadius: "12px",
                padding: "14px 16px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px"
              }}>
                <ShieldCheck size={18} color="var(--color-indigo)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontSize: "0.8125rem", color: "#312E81", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                  {ui.officialNotice}
                </p>
              </div>

              {/* Document Introduction Paragraphs */}
              <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid #F1F5F9" }}>
                {currentDoc.intro.map((para, idx) => (
                  <p key={idx} style={{ 
                    fontSize: "0.95rem", 
                    lineHeight: 1.75, 
                    color: "#334155", 
                    marginBottom: idx < currentDoc.intro.length - 1 ? "14px" : 0 
                  }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Clauses Section */}
              {filteredSections.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 16px", color: "#64748B" }}>
                  <Search size={32} color="var(--color-indigo)" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.05rem", color: "#1E293B", marginBottom: "4px" }}>{ui.noResults}</h3>
                  <p style={{ fontSize: "0.8125rem" }}>Try searching with different keywords or clear the filter.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                  {filteredSections.map((section) => (
                    <section 
                      key={section.id} 
                      id={section.id} 
                      style={{ 
                        scrollMarginTop: "100px",
                        position: "relative"
                      }}
                    >
                      {/* Section Header with Clean Single-Line Number Badge */}
                      <div className="legal-clause-header">
                        <span className="legal-clause-badge">
                          {section.number}
                        </span>
                        <h2 className="legal-clause-title">
                          {section.title}
                        </h2>
                      </div>

                      {/* Section Paragraphs */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: section.bullets ? "16px" : 0 }}>
                        {section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#334155", margin: 0 }}>
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* Section Bullet Points Styled Cleanly Without Ugly Big Bullets */}
                      {section.bullets && section.bullets.length > 0 && (
                        <div style={{ 
                          margin: "14px 0 0 0", 
                          display: "flex", 
                          flexDirection: "column", 
                          gap: "10px" 
                        }}>
                          {section.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="legal-sub-item">
                              <div style={{ 
                                width: "6px", 
                                height: "6px", 
                                borderRadius: "50%", 
                                backgroundColor: "var(--color-indigo)", 
                                marginTop: "8px",
                                flexShrink: 0 
                              }} />
                              <span style={{ flex: 1 }}>
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Section Callout if present */}
                      {section.callout && (
                        <div style={{ 
                          marginTop: "16px", 
                          backgroundColor: "#FEF3C7", 
                          borderLeft: "4px solid #D97706", 
                          padding: "12px 16px", 
                          borderRadius: "0 8px 8px 0",
                          fontSize: "0.875rem",
                          color: "#92400E",
                          lineHeight: 1.55,
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
                  marginTop: "48px", 
                  paddingTop: "36px", 
                  borderTop: "2px dashed #E2E8F0" 
                }}>
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-indigo)", fontWeight: 700, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                      <HelpCircle size={16} />
                      <span>{ui.faqTitle}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 3.8vw, 1.5rem)", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                      {type === "terms" ? "Terms & Billing FAQ" : type === "privacy" ? "Data Privacy & Security FAQ" : "Cookies & Tracking FAQ"}
                    </h3>
                    <p style={{ color: "#64748B", fontSize: "0.875rem", marginTop: "4px" }}>
                      {ui.faqSubtitle}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {currentDoc.faqs.map((faq, fIdx) => {
                      const isOpen = openFaqIndex === fIdx;
                      return (
                        <div 
                          key={fIdx}
                          style={{
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
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
                              padding: "14px 16px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                              textAlign: "left",
                              cursor: "pointer",
                              fontWeight: 700,
                              fontSize: "0.92rem",
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
                              padding: "0 16px 14px 16px",
                              fontSize: "0.875rem",
                              lineHeight: 1.65,
                              color: "#475569",
                              borderTop: "1px solid #F1F5F9",
                              paddingTop: "10px"
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

              {/* Statutory Grievance & Compliance Card */}
              <div style={{ 
                marginTop: "48px", 
                padding: "20px 16px", 
                backgroundColor: "#F8FAFC", 
                color: "#0F172A", 
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid var(--color-indigo)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <UserCheck size={20} color="var(--color-indigo)" />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                    {ui.grievanceTitle}
                  </h3>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#475569", lineHeight: 1.55, marginBottom: "16px" }}>
                  {ui.grievanceDesc}
                </p>

                <div className="legal-grievance-grid">
                  <div>
                    <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.92rem" }}>{ui.officerName}</div>
                    <div style={{ color: "var(--color-indigo)", fontSize: "0.75rem", fontWeight: 600 }}>{ui.officerRole}</div>
                    <div style={{ color: "#64748B", fontSize: "0.75rem", marginTop: "2px" }}>{ui.officerEntity}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Mail size={15} color="var(--color-indigo)" />
                    <a href={`mailto:${ui.officerEmail}`} style={{ color: "var(--color-indigo)", textDecoration: "underline", fontWeight: 600, fontSize: "0.875rem" }}>
                      {ui.officerEmail}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginTop: "12px", fontSize: "0.75rem", color: "#475569" }}>
                  <MapPin size={14} color="#64748B" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{ui.officerAddress}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", fontSize: "0.75rem", color: "#64748B" }}>
                  <Clock size={13} color="var(--color-indigo)" />
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

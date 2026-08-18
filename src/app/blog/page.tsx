"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppDownloadCTA from "@/components/AppDownloadCTA";
import Image from "next/image";
import { 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  X,
  Share2,
  CheckCircle2,
  Sparkles,
  BookOpen
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  paragraphs: {
    heading?: string;
    text: string;
    quote?: string;
  }[];
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
      }
    };
    if (activeArticle) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeArticle]);

  const categories = [
    "All",
    "Engineering",
    "Product",
    "Driver Stories",
    "Safety & Policy",
    "Expansion"
  ];

  const featuredArticle: Article = {
    id: "sub-second-dispatch-architecture",
    title: "How Sub-Second Dispatch Solves Traffic Density in Tier-1 & Tier-2 Metros",
    excerpt: "A deep architectural breakdown of our spatial index clustering, shortest-path matrix caching, and low-latency websocket telemetry that cut passenger wait times by 38%.",
    category: "Engineering",
    readTime: "6 min read",
    date: "Oct 16, 2026",
    author: "Engineering & Core Infrastructure Team",
    image: "/images/ill_blog_featured.png",
    paragraphs: [
      {
        heading: "The Challenge of High-Density Indian Road Networks",
        text: "Urban transit across Indian cities presents unique algorithmic challenges. Traditional Euclidean distance heuristics fail completely when navigating complex one-ways, narrow residential alleys, and multi-tier flyovers. In high-density corridors like Kolkata's EM Bypass, Mumbai's Western Express, or Bengaluru's Outer Ring Road, a driver located 200 meters away across an un-passable median could take 15 minutes to reach a passenger."
      },
      {
        heading: "H3 Hexagonal Spatial Indexing & Sub-Second Matching",
        text: "To overcome this, Riksho utilizes Uber's H3 hierarchical spatial indexing at resolution 9 (~100m hexagon radius) combined with custom Dijkstra shortest-path matrices precomputed every 30 seconds. When a ride request is fired, candidate vehicles are evaluated not just on straight-line distance, but on historical turning latency, live traffic speed vectors, and driver heading angles.",
        quote: "Our matching engine computes over 450,000 spatial permutations per second, achieving a median dispatch confirmation latency of 420 milliseconds."
      },
      {
        heading: "Edge Resilient WebSocket Telemetry",
        text: "Mobile network handoffs in underground passages and dense concrete alleys frequently drop persistent TCP connections. We engineered an offline-first state-sync pipeline using binary Protocol Buffers over fallback MQTT channels. If a driver drops cellular connectivity for up to 45 seconds, the vehicle's dead-reckoning trajectory is calculated on-device and synchronized instantly upon packet restoration."
      },
      {
        heading: "Impact on Passenger ETA & Captain Earnings",
        text: "During our 90-day pilot across 50,000 active daily trips, this dispatch overhaul reduced median passenger pickup wait time from 6.8 minutes down to 4.2 minutes (a 38.2% drop) while cutting driver unpaid deadhead travel by 22%."
      }
    ]
  };

  const articles: Article[] = [
    {
      id: "dispatch-routing-engine",
      title: "Building Hyperlocal Routing for Indian Road Density",
      excerpt: "How our routing graph handles narrow alleyways, flyovers, and offline dead-zones with 99.9% uptime.",
      category: "Engineering",
      readTime: "4 min read",
      date: "Oct 14, 2026",
      author: "Arjun Verma, Lead Systems Architect",
      image: "/images/ill_about_values.png",
      paragraphs: [
        {
          heading: "Mapping Beyond Standard Turn-by-Turn",
          text: "Standard global map providers often lack granular detail regarding dynamic local barricades, market hours, and narrow gullies. Riksho's internal road network graph integrates real-time telemetry from thousands of active auto and bike captains who traverse local neighborhood lanes daily."
        },
        {
          heading: "Graph Partitioning & Live Routing",
          text: "By segmenting city road graphs into localized subnetworks, our routing engine delivers live rerouting suggestions during sudden waterlogging, VIP convoys, or festival road closures without placing high computational loads on low-end smartphones.",
          quote: "Hyperlocal telemetry mapping allows our drivers to bypass 14 minutes of peak congestion daily."
        }
      ]
    },
    {
      id: "driver-morning-payouts",
      title: "Why Next-Morning Settlements Matter for 100,000+ Captains",
      excerpt: "The economics of driver dignity: eliminating high platform cuts and automating 8:00 AM bank transfers.",
      category: "Driver Stories",
      readTime: "3 min read",
      date: "Oct 08, 2026",
      author: "Priya Menon, VP of Partner Operations",
      image: "/images/ill_support_desk_v2.png",
      paragraphs: [
        {
          heading: "Ending the Weekly Payout Cycle",
          text: "Most ride-hailing aggregators hold driver earnings for 7 to 14 days, forcing captains to borrow at high interest rates just to afford fuel, daily CNG refills, and household expenses. At Riksho, we fundamentally redesigned platform economics around driver cash-flow dignity."
        },
        {
          heading: "Automated 8:00 AM Direct Bank Deposits",
          text: "Every morning at 8:00 AM IST, our automated banking integration deposits 100% of the previous day's digital fare earnings directly into the captain's verified bank account via IMPS/NEFT, with transparent commission breakdowns and zero withholding fees.",
          quote: "When a driver wakes up knowing their money is already in their bank, they drive with peace of mind and genuine pride."
        }
      ]
    },
    {
      id: "sos-police-integration",
      title: "Direct Police 112 SOS: What Happens When You Tap Emergency",
      excerpt: "A transparent overview of our encrypted telemetry pipelines, state emergency control rooms, and incident SLA.",
      category: "Safety & Policy",
      readTime: "5 min read",
      date: "Sep 28, 2026",
      author: "Sumit Shaw, Chief Grievance Officer",
      image: "/images/ill_safety_rider.png",
      paragraphs: [
        {
          heading: "Zero-Latency Emergency Escalation",
          text: "Safety cannot depend on automated chatbots or sluggish ticket queues. When a passenger or driver taps the Emergency SOS button in the Riksho app, our platform initiates an immediate two-pronged critical emergency response protocol."
        },
        {
          heading: "State Emergency Services (112) Dispatch",
          text: "The vehicle's exact latitude/longitude, current bearing, driver photo, vehicle license plate, and last 10 minutes of breadcrumb telemetry are transmitted via direct secure API gateway to the state Police Command Center (112) while our internal 24/7 Incident Desk places an instant outbound check-in call.",
          quote: "Our target emergency verification and law enforcement dispatch window is under 30 seconds."
        }
      ]
    },
    {
      id: "darkstore-15min-logistics",
      title: "Micro-Fulfillment & Quick-Commerce Fleet Scaling",
      excerpt: "How darkstores leverage dedicated courier pooling to fulfill urban orders in under 15 minutes.",
      category: "Product",
      readTime: "4 min read",
      date: "Sep 19, 2026",
      author: "Vikram Sengupta, Logistics Director",
      image: "/images/ill_contact_hub.png",
      paragraphs: [
        {
          heading: "The Surge of Hyperlocal Quick Commerce",
          text: "With 10-minute grocery delivery and instant pharmacy needs expanding across Indian metros, retailers require high-density, reliable two-wheeler courier fleets without the overhead of maintaining idle staff during lull periods."
        },
        {
          heading: "Dynamic Demand Batching",
          text: "Riksho's B2B Logistics engine batches orders originating from micro-warehouses within a 2.5km radial cluster, assigning couriers to optimized multi-drop routes that increase delivery throughput by 40% while ensuring predictable rider earnings.",
          quote: "Smart batching enables couriers to complete 4 deliveries per trip while halving city-wide vehicle emissions."
        }
      ]
    },
    {
      id: "tier-2-city-playbook",
      title: "Riksho Expands to 15 New Urban Clusters in Eastern India",
      excerpt: "Bringing no-surge transparent mobility to Lucknow, Patna, Siliguri, and Ranchi with local auto unions.",
      category: "Expansion",
      readTime: "3 min read",
      date: "Sep 11, 2026",
      author: "Communications Desk",
      image: "/images/ill_about_mission.png",
      paragraphs: [
        {
          heading: "Partnering Directly with Local Transport Unions",
          text: "Unlike aggregators that enter new cities aggressively, Riksho partners directly with regional auto-rickshaw unions and municipal transport boards. We set fair base fares that reflect local living costs and ensure captains retain their dignity."
        },
        {
          heading: "Building Trust Across Tier-2 & Tier-3 India",
          text: "In cities like Siliguri, Patna, and Ranchi, commuters rely on shared autos and local cabs. By digitizing these traditional routes without charging surge markups, Riksho achieved 80% market adoption within the first 6 weeks of launch.",
          quote: "We don't disrupt local mobility; we empower the drivers who have served these streets for decades."
        }
      ]
    },
    {
      id: "dpdp-privacy-architecture",
      title: "Complying with DPDP Act 2023: Zero-Leakage Phone Proxies",
      excerpt: "Ensuring end-to-end anonymity: rider and driver contact info is never exposed or logged in plain text.",
      category: "Safety & Policy",
      readTime: "4 min read",
      date: "Aug 29, 2026",
      author: "Security & Compliance Team",
      image: "/images/ill_safety_partner.png",
      paragraphs: [
        {
          heading: "Prioritizing Passenger & Driver Privacy",
          text: "Under the Digital Personal Data Protection (DPDP) Act 2023, personal telephone numbers and customer identities must be safeguarded from unauthorized commercial misuse or harassment."
        },
        {
          heading: "Virtual Telephony & Encrypted Voice Proxies",
          text: "Every in-app phone call and message between rider and driver routes through an ephemeral virtual proxy number that automatically expires 15 minutes after trip completion. Real phone numbers are never stored in customer-accessible frontend memory or shared with third parties.",
          quote: "Zero personal data exposure guarantees complete harassment-free peace of mind on every journey."
        }
      ]
    }
  ];

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const blogFaqs = [
    {
      question: "How often does Riksho publish product and engineering updates?",
      answer: "We publish major engineering deep-dives, product releases, and partner stories bi-weekly. Technical post-mortems and architecture benchmarks are shared openly with the developer community."
    },
    {
      question: "Can driver partners and passengers contribute their own stories?",
      answer: "Yes! We regularly feature captain milestone journeys, passenger transit stories, and fleet operator spotlights. Reach out to stories@riksho.in to submit your journey."
    },
    {
      question: "Where can media outlets find official press kits and branding assets?",
      answer: "Official brand guidelines, high-res logos, and executive bios are available on our Media & Press desk or by emailing press@riksho.in."
    }
  ];

  const handleShare = (article: Article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/blog#${article.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
              src="/images/photo_blog_hero.jpg"
              alt="The Riksho Journal and News"
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
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
                Stories from the road.<br />
                <span style={{ color: "#00C2FF" }}>Updates shaping mobility.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                maxWidth: "620px",
                margin: 0,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.55)"
              }}>
                Product announcements, engineering deep-dives, and driver stories from across India.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Story Spotlight (Editorial Card with Custom Purple Blob Artwork) */}
        <section style={{ padding: "clamp(32px, 5vw, 64px) 0 32px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "24px",
              padding: "clamp(20px, 4vw, 40px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(24px, 4vw, 40px)",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
            }}>
              {/* Left Column: Featured Illustration */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "340px",
                  aspectRatio: "1/1",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Featured Content */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span style={{
                    backgroundColor: "var(--color-indigo-tint)",
                    color: "var(--color-indigo)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    Featured Deep Dive
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#64748B", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} color="#0F172A" strokeWidth={2.2} />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 3.2vw, 34px)",
                  fontWeight: 800,
                  color: "#0F172A",
                  lineHeight: 1.25,
                  marginBottom: "14px"
                }}>
                  {featuredArticle.title}
                </h2>

                <p style={{
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "#475569",
                  marginBottom: "24px"
                }}>
                  {featuredArticle.excerpt}
                </p>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  paddingTop: "18px",
                  borderTop: "1px solid #F1F5F9"
                }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>
                      {featuredArticle.author}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748B" }}>
                      Published {featuredArticle.date} • Kolkata Headquarters
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(featuredArticle)}
                    style={{
                      backgroundColor: "var(--color-indigo)",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease"
                    }}
                  >
                    <span>Read Full Story</span>
                    <ArrowUpRight size={16} color="#FFFFFF" strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Category Filter & Curated Articles Grid */}
        <section style={{ padding: "32px 0 64px 0", backgroundColor: "#FFFFFF" }}>
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
                  The Riksho Journal
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  Latest Dispatches
                </h3>
              </div>

              {/* Minimalist Filter Tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
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
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles Grid (Strictly 3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="article-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    cursor: "pointer"
                  }}
                  onClick={() => setActiveArticle(article)}
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                      <span style={{
                        backgroundColor: "var(--color-indigo-tint)",
                        color: "var(--color-indigo)",
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase"
                      }}>
                        {article.category}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#64748B", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={13} color="#0F172A" strokeWidth={2.2} />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "#0F172A",
                      lineHeight: 1.35,
                      marginBottom: "10px"
                    }}>
                      {article.title}
                    </h4>

                    {/* Excerpt */}
                    <p style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "#64748B",
                      margin: 0
                    }}>
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Author & Read Button with Micro-interaction */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #F1F5F9",
                    fontSize: "0.8rem",
                    color: "#64748B"
                  }}>
                    <span>{article.date}</span>
                    <button
                      type="button"
                      className="read-article-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveArticle(article);
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
                      <span>Read Article</span>
                      <span className="arrow-icon" style={{ display: "inline-flex" }}>
                        <ChevronRight size={15} color="#0F172A" strokeWidth={2.2} />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Article Interactive Modal / Dialogue Box (Clean Text Focused) */}
        {activeArticle && (
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
              if (e.target === e.currentTarget) setActiveArticle(null);
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
                gap: "20px"
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
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
                  color: "#0F172A",
                  transition: "background-color 0.15s ease"
                }}
              >
                <X size={18} color="#0F172A" strokeWidth={2.2} />
              </button>

              {/* Article Header Meta */}
              <div style={{ borderBottom: "1px solid #F1F5F9", paddingBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{
                    backgroundColor: "var(--color-indigo-tint)",
                    color: "var(--color-indigo)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase"
                  }}>
                    {activeArticle.category}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
                    {activeArticle.readTime} • {activeArticle.date}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 3.5vw, 34px)",
                  fontWeight: 800,
                  color: "#0F172A",
                  lineHeight: 1.25,
                  marginBottom: "12px",
                  paddingRight: "36px"
                }}>
                  {activeArticle.title}
                </h2>

                <div style={{ fontSize: "0.9rem", color: "#64748B", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>By <strong>{activeArticle.author}</strong></span>
                </div>
              </div>

              {/* Article Body Paragraphs (Clean Direct Text) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "#334155", fontSize: "1rem", lineHeight: 1.75 }}>
                {activeArticle.paragraphs.map((p, pIdx) => (
                  <div key={pIdx}>
                    {p.heading && (
                      <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "#0F172A",
                        margin: "0 0 8px 0"
                      }}>
                        {p.heading}
                      </h3>
                    )}
                    <p style={{ margin: "0 0 12px 0" }}>{p.text}</p>
                    {p.quote && (
                      <blockquote style={{
                        margin: "16px 0",
                        padding: "16px 20px",
                        backgroundColor: "var(--color-indigo-tint)",
                        borderLeft: "4px solid var(--color-indigo)",
                        borderRadius: "0 12px 12px 0",
                        color: "#0F172A",
                        fontWeight: 600,
                        fontStyle: "italic",
                        fontSize: "0.95rem"
                      }}>
                        "{p.quote}"
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer Controls */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
                paddingTop: "20px",
                borderTop: "1px solid #F1F5F9"
              }}>
                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer"
                  }}
                >
                  <Share2 size={16} color="#0F172A" strokeWidth={2.2} />
                  <span>{copied ? "Link Copied!" : "Share Article"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  style={{
                    backgroundColor: "var(--color-indigo)",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global CSS for 3-Column Responsive Grid and Micro-animations */}
        <style jsx global>{`
          .articles-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          @media (max-width: 1024px) {
            .articles-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 640px) {
            .articles-grid {
              grid-template-columns: 1fr;
            }
          }
          .article-card {
            transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.22s ease !important;
          }
          .article-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 14px 28px -6px rgba(15, 23, 42, 0.09) !important;
            border-color: rgba(67, 56, 202, 0.35) !important;
          }
          .article-card:hover .arrow-icon {
            transform: translateX(4px);
          }
          .arrow-icon {
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>

        {/* Section: Clean Interactive FAQ Accordion */}
        <section style={{ padding: "40px 0 64px 0", backgroundColor: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ color: "var(--color-indigo)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8125rem", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                Editorial Desk
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {blogFaqs.map((faq, fIdx) => {
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

        {/* Home Page Consistent App Download Banner */}
        <AppDownloadCTA />
      </main>

      {/* Home Page Consistent Footer */}
      <Footer />
    </div>
  );
}

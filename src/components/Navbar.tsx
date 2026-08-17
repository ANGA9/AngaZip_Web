"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = {
  star: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  car: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>,
  map: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>,
  box: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  globe: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  dollar: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  bike: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"></path></svg>,
  truck: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  user: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  phone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  heart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  leaf: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>,
  building: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>,
  briefcase: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
  news: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>,
  contact: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
};

const megaMenuData = [
  {
    id: "services",
    label: "Services",
    links: [
      { label: "City rides", desc: "Everyday rides at fair prices.", icon: icons.car, href: "/city-rides" },
      { label: "City to City", desc: "Travel comfortably between cities.", icon: icons.map, href: "/city-to-city" },
      { label: "Darkstore", desc: "Instant fulfillment logistics.", icon: icons.box, href: "/darkstore" },
      { label: "Business", desc: "Corporate fleet & billing solutions.", icon: icons.briefcase, href: "/business" },
    ]
  },
  {
    id: "earn",
    label: "Earn with Riksho",
    links: [
      { label: "Drive a Cab", desc: "Provide rides in your local city.", icon: icons.car, href: "/drive-a-cab" },
      { label: "Bike Taxi", desc: "Flexible bike taxi rides.", icon: icons.bike, href: "/ride-a-bike-taxi" },
      { label: "Courier delivery", desc: "Deliver small packages quickly.", icon: icons.box, href: "/deliver-as-courier" },
      { label: "Join a Fleet", desc: "Manage commercial fleets.", icon: icons.truck, href: "/join-a-fleet" },
    ]
  },
  {
    id: "company",
    label: "Company",
    links: [
      { label: "About us", desc: "Learn about our mission and vision.", icon: icons.building, href: "/about-us" },
      { label: "Careers", desc: "Join our team and build the future.", icon: icons.briefcase, href: "/careers" },
      { label: "Safety Hub", desc: "Our commitment to keeping everyone safe.", icon: icons.shield, href: "/safety" },
      { label: "Blog & News", desc: "Stories, updates and announcements.", icon: icons.news, href: "/blog" },
    ]
  },
  {
    id: "support",
    label: "Support",
    links: [
      { label: "Help Center", desc: "Find answers and troubleshooting.", icon: icons.user, href: "/support" },
      { label: "Contact Us", desc: "Get in touch with us directly.", icon: icons.contact, href: "/contact" },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getTabForPath = (path: string) => {
    const matchingTab = megaMenuData.find(t =>
      t.links.some(link => link.href === path || (link.href !== "/" && path.startsWith(link.href)))
    );
    return matchingTab ? matchingTab.id : "services";
  };

  const [activeTab, setActiveTab] = useState<string>("services");

  useEffect(() => {
    setActiveTab(getTabForPath(pathname));
  }, [pathname]);

  const toggleMenu = () => {
    if (!mobileMenuOpen) {
      setActiveTab(getTabForPath(pathname));
    }
    setMobileMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeTabData = megaMenuData.find(t => t.id === activeTab);
  const showDropdown = mobileMenuOpen && activeTabData && activeTabData.links.length > 0;

  return (
    <>
      <div className={`mega-menu-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
      
      <nav className={`navbar ${(scrolled || mobileMenuOpen) ? "navbar-scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-top-row">
            {/* Wordmark */}
            <Link href="/" className="navbar-brand">
              <img 
                src={(scrolled || mobileMenuOpen) ? "/images/white_riksho.png" : "/images/final_riksho.png"} 
                alt="Riksho" 
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Right Actions */}
            <div className="navbar-actions">
              <Link 
                href="#download" 
                className={`btn-primary btn-nav-cta hidden-mobile ${(scrolled || mobileMenuOpen) ? 'visible' : 'hidden'}`}
                style={{ 
                  backgroundColor: "var(--color-white)", 
                  color: "var(--color-indigo)",
                  border: "1px solid var(--color-indigo)",
                  boxShadow: "none"
                }}
              >
                Get the App
              </Link>

              {/* Language Pill & Dropdown */}
              <div style={{ position: 'relative' }}>
                <button 
                  className="nav-pill lang-pill" 
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px" }}
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                >
                  <svg width="22" height="15" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '2px', objectFit: 'cover' }}>
                    <rect width="300" height="66.66" fill="#FF9933"/>
                    <rect y="66.66" width="300" height="66.66" fill="#FFFFFF"/>
                    <rect y="133.33" width="300" height="66.66" fill="#138808"/>
                    <circle cx="150" cy="100" r="24" fill="none" stroke="#000080" strokeWidth="4"/>
                    <line x1="150" y1="76" x2="150" y2="124" stroke="#000080" strokeWidth="2"/>
                    <line x1="126" y1="100" x2="174" y2="100" stroke="#000080" strokeWidth="2"/>
                    <line x1="133" y1="83" x2="167" y2="117" stroke="#000080" strokeWidth="2"/>
                    <line x1="167" y1="83" x2="133" y2="117" stroke="#000080" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontWeight: 700 }}>En</span>
                </button>

                {languageMenuOpen && (
                  <div className="language-dropdown-card">
                    <div className="language-dropdown-header">
                      <h4>Select Language</h4>
                      <button onClick={() => setLanguageMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <div className="language-dropdown-grid">
                      <button className="lang-option active" onClick={() => setLanguageMenuOpen(false)}>
                        <span className="lang-native">English</span>
                        <span className="lang-en">English</span>
                      </button>
                      <button className="lang-option" onClick={() => setLanguageMenuOpen(false)}>
                        <span className="lang-native">हिन्दी</span>
                        <span className="lang-en">Hindi</span>
                      </button>
                      <button className="lang-option" onClick={() => setLanguageMenuOpen(false)}>
                        <span className="lang-native">मराठी</span>
                        <span className="lang-en">Marathi</span>
                      </button>
                      <button className="lang-option" onClick={() => setLanguageMenuOpen(false)}>
                        <span className="lang-native">తెలుగు</span>
                        <span className="lang-en">Telugu</span>
                      </button>
                      <button className="lang-option" onClick={() => setLanguageMenuOpen(false)}>
                        <span className="lang-native">தமிழ்</span>
                        <span className="lang-en">Tamil</span>
                      </button>
                      <button className="lang-option" onClick={() => setLanguageMenuOpen(false)}>
                        <span className="lang-native">বাংলা</span>
                        <span className="lang-en">Bengali</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Menu Button */}
              <button 
                className="nav-pill menu-pill hidden-mobile" 
                onClick={toggleMenu}
              >
                {mobileMenuOpen ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>Menu</span>
                  </>
                )}
              </button>

              {/* Mobile Hamburger (Only visible on small screens) */}
              <button
                onClick={toggleMenu}
                className={`hamburger visible-mobile ${mobileMenuOpen ? "open" : ""}`}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          {/* Header Tabs Row - attached to navbar! */}
          {mobileMenuOpen && (
            <div className="mega-menu-tabs-wrapper">
              <div className="mega-menu-tabs">
                {megaMenuData.map((tab) => (
                  <button
                    key={tab.id}
                    className={`mega-menu-tab ${activeTab === tab.id ? "tab-active" : ""}`}
                    onMouseEnter={() => setActiveTab(tab.id)}
                    onClick={() => {
                      if (tab.links.length === 0) setMobileMenuOpen(false);
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mega Menu Dropdown Sheet (rendered below navbar) */}
        <div className={`mega-menu-sheet ${showDropdown ? "open" : ""}`}>
          {activeTabData && activeTabData.links.length > 0 && (
            <div className="container" style={{ padding: "32px 16px" }}>
              {/* Content Area */}
              <div className="mega-menu-grid">
                {activeTabData.links.map((link) => {
                  const isSelected = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className={`mega-menu-card ${isSelected ? "selected" : ""}`} 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="mega-card-icon">{link.icon}</div>
                      <div className="mega-card-text">
                        <h4>{link.label}</h4>
                        <p>{link.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <Link
                href="#download"
                className="btn-primary mobile-only-cta"
                style={{ width: "100%", marginTop: "24px" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get the App
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

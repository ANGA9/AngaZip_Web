"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero_banner_1_final.png",
    titleLine1: "One ride away.",
    titleLine2: "One delivery ahead.",
    subtitle: "Cabs, bike taxis, intercity rides, and business fleets — one app for everything that needs to move.",
  },
  {
    image: "/images/hero_banner_2_v2.png",
    titleLine1: "Beat the traffic.",
    titleLine2: "Quick bike rides.",
    subtitle: "Navigate the busy city streets quickly and affordably with our verified bike taxi partners.",
  },
  {
    image: "/images/hero_banner_3.png",
    titleLine1: "Your business fleet.",
    titleLine2: "Scaled on demand.",
    subtitle: "From single parcels to full truckloads, we give enterprises on-demand access to commercial vehicles.",
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const slideData = slides[currentSlide] || slides[0];

  return (
    <section className="hero-section">
      {/* Background images */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className="hero-bg" 
          style={{ opacity: currentSlide === index ? 1 : 0, transition: "opacity 1s ease-in-out" }}
        >
          <Image
            src={slide.image}
            alt="Riksho Hero"
            fill
            priority={index === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <div className="hero-gradient" />
        </div>
      ))}

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div className="hero-content">
          {/* H1 */}
          <h1 className="hero-title animate-fade-in-up stagger-1" key={`title-${currentSlide}`}>
            {slideData.titleLine1}
            <br />
            <span>{slideData.titleLine2}</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtitle animate-fade-in-up stagger-2" key={`sub-${currentSlide}`}>
            {slideData.subtitle}
          </p>

          {/* CTA */}
          <div className="hero-actions animate-fade-in-up stagger-3">
            <a 
              href="https://play.google.com/store/apps/details?id=com.riksho.customer&pcampaignid=web_share" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hero-main-cta"
            >
              Get the App
              <svg style={{ marginLeft: "8px", width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#services" className="btn-outline-white hidden-mobile" style={{ padding: "16px 32px", fontSize: "1rem", borderRadius: "999px" }}>
              Explore Services
            </a>
          </div>
          
          {/* Slide Indicators */}
          <div className="hero-indicators-container animate-fade-in-up stagger-4">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                className={`hero-dot ${currentSlide === idx ? 'active' : currentSlide > idx ? 'passed' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

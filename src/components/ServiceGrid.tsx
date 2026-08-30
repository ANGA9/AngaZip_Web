"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    headline: "Cab Rides",
    description: "Comfortable, fairly-priced rides across the city, anytime.",
    links: [
      { label: "For Riders", href: "/city-rides" },
      { label: "For Drivers", href: "/drive-a-cab" },
    ],
    blobColor: "#4338CA",
    imageSrc: "/images/cab_white_v2.png",
  },
  {
    headline: "Bike Taxi",
    description: "Quick point-to-point hops through traffic, at a fraction of the cost.",
    links: [
      { label: "For Riders", href: "/city-rides" },
      { label: "For Drivers", href: "/ride-a-bike-taxi" },
    ],
    blobColor: "#00C2FF",
    imageSrc: "/images/bike_white_v2.png",
  },
  {
    headline: "City to City",
    description: "Comfortable outstation and intercity travel, door to door.",
    links: [
      { label: "For Riders", href: "/city-to-city" },
      { label: "For Drivers", href: "/drive-a-cab" },
    ],
    blobColor: "#4338CA",
    imageSrc: "/images/city.png",
  },
  {
    headline: "Fleet & Delivery",
    description: "On-demand vehicles and cargo capacity for businesses of any size.",
    links: [
      { label: "For Business", href: "/business" },
      { label: "For Partners", href: "/deliver-as-courier" },
    ],
    blobColor: "#00C2FF",
    imageSrc: "/images/fleet_card.png",
  },
];

export default function ServiceGrid() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <section id="services" className="service-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            One app, every way to move
          </h2>
          <p className="section-subtitle">
            Whether it&apos;s you, your parcel, or your entire delivery fleet —
            Riksho gets it there.
          </p>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="mobile-swipe-wrapper">
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            Swipe to explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          <div className="swipe-track">
            <div className="swipe-thumb" style={{ width: `${Math.max(25, scrollProgress)}%` }} />
          </div>
        </div>

        {/* 2x2 Card Grid */}
        <div className="service-grid" ref={scrollRef} onScroll={handleScroll}>
          {services.map((service) => (
            <div key={service.headline} className="service-card">
              {/* Illustration Image */}
              <div className="service-card-image">
                <Image
                  src={service.imageSrc}
                  alt={service.headline}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text Content */}
              <div className="service-card-content">
                <h3>{service.headline}</h3>
                <p>{service.description}</p>

                {/* Links */}
                <div className="service-card-links">
                  {service.links.map((link) => (
                    <Link key={link.label} href={link.href}>
                      {link.label} ›
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

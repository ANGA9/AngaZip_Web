import Image from "next/image";

export default function AppDownloadCTA() {
  return (
    <section id="download" className="download-section section">
      {/* Decorative elements */}
      <div className="download-bg-shape-1" />
      <div className="download-bg-shape-2" />

      <div className="container">
        <div className="download-grid">
          {/* Left — Content */}
          <div className="download-content">
            <h2>
              Get the Riksho app
            </h2>

            <p>
              Book rides, send parcels, or manage your fleet — all from one app.
            </p>

            {/* App Store Buttons */}
            <div className="download-badges">
              {/* Google Play */}
              <a href="#" className="app-badge">
                <svg className="w-7 h-7" style={{ width: "28px", height: "28px" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.395 13l2.303-3.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
                </svg>
                <div className="app-badge-text">
                  <div className="app-badge-subtitle">Get it on</div>
                  <div className="app-badge-title">Google Play</div>
                </div>
              </a>

              {/* App Store */}
              <a href="#" className="app-badge">
                <svg className="w-7 h-7" style={{ width: "28px", height: "28px" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="app-badge-text">
                  <div className="app-badge-subtitle">Download on the</div>
                  <div className="app-badge-title">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — Phone Mockup */}
          <div className="download-image" style={{ position: "relative" }}>

            
            {/* Phone Mockup */}
            <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
              <Image
                src="/images/home_phone_mockup.png"
                alt="Riksho App Home Mockup"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={100}
                className="phone-mockup-img"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

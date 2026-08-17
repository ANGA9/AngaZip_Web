# Riksho Web Application — Page Perfection & Progress Tracker

This document tracks the end-to-end design, responsiveness, typography, and UX polish across all active pages of the **Riksho Web Application** (`riksho_web`).

---

## 📊 Overall Progress Summary

- **Total Active Pages / Endpoints:** 25
- **Completed & Verified (Satisfied):** 21
- **Pending Review & Perfection:** 4
- **Progress:** 84.0%

---

## 🚀 Status Legend

- [x] **`COMPLETED`**: Fully redesigned, responsive across all mobile/desktop breakpoints, verified with zero errors, and signed off.
- [ ] **`IN PROGRESS`**: Currently being polished / refined.
- [ ] **`PENDING`**: Awaiting review and UX/UI perfection.

---

## 📑 Active Page Checklist

### 1. Consumer Rides & Core Mobility Services
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [x] | `/` | **Home / Landing** | Hero booking widget, vehicle tiers, live reviews, app CTA, light modern branding. |
| [x] | `/city-rides` | **City Rides** | Minimalist photo hero banner, interactive 4-tier vehicle showcase (Auto, Bike Taxi, Mini & Prime Sedan) with upfront rates, custom purple/cyan blob artwork, 4 impact metrics, clean FAQ accordion, AppDownloadCTA, Footer. |
| [x] | `/city-to-city` | **City-to-City** | Minimalist photo hero banner, interactive route showcase with One-Way vs Roundtrip pricing, custom purple/cyan blob artwork, 4 impact metrics, clean FAQ accordion, AppDownloadCTA, Footer. |
| [x] | `/ride-a-bike-taxi` | **Ride a Bike Taxi** | Minimalist photo hero banner, 3 captain advantage pillars, rush hour multipliers, purple/cyan blob artwork, 4 metrics, FAQ, AppDownloadCTA, Footer. |
| [x] | `/* (404)` | **404 Route Not Found** | Minimalist 404 detour layout, cursive quote, 5 popular quick destination pills, Back to Home and Help Center CTA buttons, Navbar, Footer. |

---

### 2. Deliveries & B2B Solutions
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [x] | `/darkstore` | **Darkstore Logistics** | Public partner landing page, Sub-15 min SLA, Smart Pick & Pack workflow, API sync, dual action buttons (Partner & Ops Portal link), purple/cyan blob artwork, 5 pillars (3+2 layout), 4 metrics, FAQ, AppDownloadCTA, Footer. |
| [x] | `/business` | **Riksho for Business** | Public enterprise landing page, employee commute allowances, GST monthly billing, dual action buttons (Partner & Business Portal link), purple/cyan blob artwork, 5 solutions (3+2 layout), 4 metrics, FAQ, AppDownloadCTA, Footer. |

---

### 3. Driver & Fleet Partner Ecosystem
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [x] | `/drive-a-cab` | **Drive a Cab / Auto** | Minimalist photo hero banner, 3 driver pillars, 0% first month commission, daily UPI cashout, purple/cyan blob artwork, 4 metrics, FAQ, AppDownloadCTA, Footer. |
| [x] | `/deliver-as-courier` | **Deliver as Courier** | Minimalist photo hero banner, 3 courier pillars, high-density darkstore orders, contactless OTP, purple/cyan blob artwork, 4 metrics, FAQ, AppDownloadCTA, Footer. |
| [x] | `/join-a-fleet` | **Join as Fleet Owner** | Minimalist photo hero banner, 3 fleet pillars, live GPS telemetry, automated driver revenue splits, purple/cyan blob artwork, 4 metrics, FAQ, AppDownloadCTA, Footer. |

---

### 4. Company, Vision & Culture
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [x] | `/about-us` | **About Us** | Real people photo hero banner, custom purple blob (`#4338CA`) & cyan blob (`#00C2FF`) editorial illustrations, impact metrics, spacious points hierarchy, clean FAQ accordion, AppDownloadCTA, Footer. |
| [x] | `/careers` | **Careers** | Minimalist photo hero banner, custom cyan blob (`#00C2FF`) engineering culture illustration, 4 impact metric cards, interactive 3-column job board with role detail/application modal, clean FAQ accordion, zero promotional banner, Footer. |
| [x] | `/blog` | **Blog & News** | Minimalist photo hero banner, featured editorial spotlight card (`#4338CA`), interactive category filter pills, curated articles grid, clean FAQ accordion, AppDownloadCTA, Footer. |
| [x] | `/safety` | **Safety First** | Minimalist photo hero banner, custom purple blob (`#4338CA`) passenger safety & cyan blob (`#00C2FF`) partner welfare illustrations, impact metrics, spacious points hierarchy, clean FAQ accordion, AppDownloadCTA, Footer. |

---

### 5. Support & Customer Care
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [x] | `/support` | **Help & Support** | 3 minimalist category cards, direct brand indigo channels, custom purple blob scooty illustration (`#4338CA`), clean FAQ accordion, "Still Need Help?" banner, AppDownloadCTA, Footer. |
| [x] | `/contact` | **Contact Us** | 3 unified brand indigo contact cards, interactive contact form with right-side blue blob illustration (`#00C2FF`), mobile responsive stack, clean FAQ accordion, AppDownloadCTA, Footer. |

---

### 6. Legal, Compliance & Privacy Portal
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [x] | `/terms` | **Terms of Service** | 12-Clause Master Terms, dual Customer/Driver toggle, arbitration & SLAs. |
| [x] | `/privacy` | **Privacy Policy** | 14-Clause Data Governance under DPDP Act 2023 & IT Act 2000, Grievance desk. |
| [x] | `/cookie-policy` | **Cookie Policy** | 8-Clause Cookie Governance, third-party tracker disclosures & controls. |

---

### 7. Internal Admin & Operations Console (`/admin`)
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [ ] | `/admin` | **Admin Overview** | Live operational KPIs, active ride telemetry, driver density & GMV. |
| [ ] | `/admin/login` | **Admin Login** | Secure administrative authentication & session security. |
| [ ] | `/admin/drivers` | **Driver Verification** | Driver KYC approval desk (DL, RC, PAN, Aadhaar, Insurance validation). |
| [ ] | `/admin/darkstores` | **Darkstore Hubs** | Micro-fulfillment center radius, inventory and active hubs monitor. |
| [ ] | `/admin/cancellations` | **Cancellations** | Cancellation analytics, driver penalty audit, and passenger refund reviews. |
| [ ] | `/admin/incomplete` | **Incomplete Funnel** | Driver onboarding drop-off recovery & automated SMS reminders. |
| [ ] | `/admin/catalog` | **Pricing & Catalog** | Dynamic fare multipliers, base rate rules & city-level pricing overrides. |
| [ ] | `/admin/push` | **Push Broadcast** | Target audience push notification & promotional broadcast console. |

---

## 🛠️ Perfection Criteria for Every Page

1. **Light, Clean & Aesthetic Theme**:
   - Pure crisp background (`#FFFFFF`), curated slate text (`#0F172A`, `#334155`), Riksho brand indigo (`#4338CA`) and cyan (`#00C2FF`) accents.
   - Zero dark navy backgrounds or muddy containers.

2. **Official Editorial Blob Art Style**:
   - Flat vector cartoon illustration in bold, minimal editorial style with thick black outlines, flat solid color fill, and irregular abstract color blobs (`#4338CA` / `#00C2FF`).

3. **100% Mobile Responsiveness (320px to 4K)**:
   - Zero horizontal scroll, adaptive typography (`clamp()`), and clean touch targets.
   - Proper padding (`100px+` top padding to clear fixed 80px Navbar).

4. **Correct Corporate Information**:
   - Registered address: `G744+2PV, Jalkal, Maheshtala, West Bengal 700141`.
   - Officer Name: `Sumit Shaw` (Chief Nodal & Grievance Redressal Officer).
   - Real contact channels (`support@riksho.in`, `partnercare@riksho.in`, `grievance@riksho.in`).

5. **Home Page Consistency**:
   - Standardized `<AppDownloadCTA />` banner section and `<Footer />` across all pages.

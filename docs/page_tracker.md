# Riksho Web Application — Page Perfection & Progress Tracker

This document tracks the end-to-end design, responsiveness, typography, and UX polish across all active pages of the **Riksho Web Application** (`riksho_web`).

---

## 📊 Overall Progress Summary

- **Total Active Pages / Endpoints:** 26
- **Completed & Verified (Satisfied):** 4
- **Pending Review & Perfection:** 22
- **Progress:** 15.4%

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
| [ ] | `/city-rides` | **City Rides** | Daily urban commute (Auto, Bike Taxi, Mini & Sedan Cabs), transparent rates. |
| [ ] | `/city-to-city` | **City-to-City** | Intercity outstation cabs, one-way/roundtrip bookings, luggage guidelines. |
| [ ] | `/ride-a-bike-taxi` | **Ride a Bike Taxi** | Two-wheeler mobility, helmet rules, instant pickup & congestion bypass. |
| [ ] | `/live-tracking` | **Live Trip Tracking** | Real-time passenger telemetry, emergency safety sharing & driver status. |

---

### 2. Deliveries & B2B Solutions
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [ ] | `/darkstore` | **Darkstore Logistics** | 10–15 min quick-commerce fulfillment solutions & micro-warehousing. |
| [ ] | `/business` | **Riksho for Business** | Corporate fleet management, employee ride billing, cost-center invoicing. |

---

### 3. Driver & Partner Hub ("Earn with Riksho")
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [ ] | `/earn` | **Partner Hub** | Master onboarding portal, daily earnings calculator & incentive schemes. |
| [ ] | `/drive-a-cab` | **Drive a Cab / Auto** | Commercial driver partner onboarding (Cab & Auto), daily bank payouts. |
| [ ] | `/deliver-as-courier` | **Deliver as Courier** | Two-wheeler courier partner registration, onboarding kit & flexible shifts. |
| [ ] | `/join-a-fleet` | **Join as Fleet Owner** | Multi-vehicle fleet operator portal, centralized analytics & vehicle tracking. |

---

### 4. Company, Vision & Culture
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [ ] | `/about-us` | **About Us** | Company mission, leadership principles, founding milestones & roadmap. |
| [ ] | `/careers` | **Careers** | Open job listings, engineering culture, employee benefits & hiring process. |
| [ ] | `/blog` | **Blog & News** | Company news, engineering updates, press releases & transit tips. |
| [ ] | `/safety` | **Safety First** | 24/7 Safety Command Center, Police SOS (112) integration, ride insurance. |

---

### 5. Support & Customer Care
| Status | Endpoint | Page Name | Description & Key Components |
| :---: | :--- | :--- | :--- |
| [ ] | `/support` | **Help & Support** | Categorized FAQ knowledge base, ride dispute ticket submission desk. |
| [ ] | `/contact` | **Contact Us** | Corporate office address, customer support emails, dedicated helpline numbers. |

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

When auditing each page, ensure the following checklist is completed:

1. **Light, Clean & Aesthetic Theme**:
   - Pure crisp background (`#FFFFFF`), curated slate text (`#0F172A`, `#334155`), Riksho brand indigo (`#4338CA`) and cyan (`#00C2FF`) accents.
   - Zero dark navy backgrounds or muddy containers.

2. **Zero Vector/Cartoon Placeholders**:
   - Replace any generic vector graphics with real, high-resolution photographs or clean typography/card layouts.

3. **100% Mobile Responsiveness (320px to 4K)**:
   - Full support for mobile viewports without horizontal scroll or squished content.
   - Proper padding (`100px+` top padding to clear fixed 80px Navbar).
   - Adaptive typography (`clamp()`) and touch-friendly controls.

4. **Correct Corporate Information**:
   - Registered address: `G744+2PV, Jalkal, Maheshtala, West Bengal 700141`.
   - Officer Name: `Sumit Shaw` (Chief Nodal & Grievance Redressal Officer).
   - No placeholder GST numbers or false CIN codes.

5. **SEO Best Practices**:
   - Descriptive `<title>` and `<meta name="description">`.
   - Semantic HTML5 heading hierarchy (`h1`, `h2`, `h3`).

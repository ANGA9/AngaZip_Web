# Riksho Web Application

Modern, high-performance Next.js web application for **Riksho** — on-demand bike taxi, auto-rickshaw, cab, courier delivery, and enterprise mobility platform.

---

## 🎨 Official Brand Design System & Illustration Art Style

### 1. Brand Color Palette
- **Brand Indigo:** `#4338CA` (Primary brand accent, buttons, focus highlights)
- **Indigo Deep:** `#3730A3`
- **Indigo Tint / Background:** `#EEF2FF`
- **Electric Cyan:** `#00C2FF` (Secondary vibrant highlights & gradients)
- **Crisp Neutral Background:** `#FFFFFF`
- **Slate Text:** Primary: `#0F172A`, Secondary: `#334155`, Muted: `#64748B`
- **Borders & Dividers:** `#E2E8F0` / `#F1F5F9`

---

### 2. Illustration Art Style Guidelines

All illustrations across the Riksho platform strictly follow a **bold, minimal editorial vector art style** with thick outlines and brand solid color background blobs:

```
Flat vector cartoon illustration in a bold, minimal editorial style: [SUBJECT DESCRIPTION]. 
Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions, simple background. 
The characters and elements are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color [BRAND COLOR BLOB] behind them. 
No text. Pure white background.
```

#### Base Image Templates:

#### A. Purple Blob Template (`#4338CA`)
> **Prompt:** `Flat vector cartoon illustration in a bold, minimal editorial style: [SUBJECT DESCRIPTION]. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions, simple background. The character and vehicle are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background.`

#### B. Light Blue Blob Template (`#00C2FF`)
> **Prompt:** `Flat vector cartoon illustration in a bold, minimal editorial style: [SUBJECT DESCRIPTION]. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters and vehicle are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background.`

---

## 📸 Image & Illustration Replacement Roadmap (Pending Quota Reset)

When image generation capacity resets, generate the following high-priority assets to replace placeholder fallbacks:

### 1. Careers Page (`/careers`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_careers_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of a diverse team of young Indian software engineers, product designers, and operations managers smiling and collaborating around a wooden table in a bright, modern tech office, natural daylight, genuine creative energy, authentic corporate lifestyle photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Culture Artwork (`#4338CA`)** | `public/images/ill_careers_culture.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: Two young tech professionals high-fiving in front of a whiteboard with flowcharts and rocket launch icon. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Engineering Artwork (`#00C2FF`)** | `public/images/ill_careers_engineering.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A software engineer typing on a laptop with code brackets and server cloud icons. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and equipment are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 2. City Rides Page (`/city-rides`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_city_rides_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of modern urban transit in an Indian metro city during daytime, featuring a green electric auto-rickshaw and a silver cab moving smoothly on a clean city boulevard, passengers smiling inside, natural bright lighting, authentic everyday city mobility lifestyle photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Auto Rickshaw Tier (`#4338CA`)** | `public/images/ill_tier_auto.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A clean modern Indian auto-rickshaw (tuk-tuk) with a driver in front. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The vehicle is drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind it. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Bike Taxi Tier (`#00C2FF`)** | `public/images/ill_tier_bike.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A modern commuter motorcycle / bike taxi with a driver wearing a safety helmet. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The motorcycle and driver are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind it. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Mini Hatchback Tier (`#4338CA`)** | `public/images/ill_tier_mini.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A compact modern city hatchback cab car. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The car is drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind it. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Prime Sedan Tier (`#00C2FF`)** | `public/images/ill_tier_sedan.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A sleek, comfortable premium sedan cab car. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The sedan is drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind it. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Fair Fares Artwork (`#4338CA`)** | `public/images/ill_city_fair_fare.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A smiling Indian passenger and auto-rickshaw driver completing a trip with an upfront fare checkmark and route map navigation icon. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters and auto-rickshaw are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Safety & OTP Artwork (`#00C2FF`)** | `public/images/ill_city_safety_otp.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A female passenger holding a smartphone with a 4-digit OTP shield verification badge next to a modern cab with GPS pin. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters and cab are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 3. City-to-City / Outstation Page (`/city-to-city`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_city_to_city_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of a modern silver sedan driving smoothly along a scenic national highway expressway in India during golden hour, open clean roads, mountain foothills in the background, authentic long-distance road trip travel photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] One-Way Travel Artwork (`#4338CA`)** | `public/images/ill_intercity_oneway.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A comfortable outstation cab traveling between two city skyline silhouettes on a highway with a navigation compass and route pin. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The car and city landmarks are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Highway Safety Artwork (`#00C2FF`)** | `public/images/ill_intercity_safety.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A professional highway driver buddy standing beside a modern SUV with a shield security badge, speed limit radar icon, and emergency SOS emblem. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and vehicle are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 4. Riksho for Business (`/business`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_business_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of modern enterprise logistics in India, showing a clean corporate fleet van and delivery motorcycle parked outside a glass corporate office building, business professionals shaking hands in the foreground, natural morning daylight, authentic B2B corporate photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Invoicing & ITC Artwork (`#4338CA`)** | `public/images/ill_business_invoicing.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A corporate financial manager reviewing an automated digital GST tax invoice and expense chart on a tablet next to an office building and cab silhouette. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and elements are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Developer API Artwork (`#00C2FF`)** | `public/images/ill_business_api.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: Two developers connecting an API plug cable into a logistics server cloud with automated courier motorcycles and delivery trucks flowing outwards. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters and tech equipment are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 5. Darkstore Logistics (`/darkstore`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_darkstore_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of a clean, brightly lit modern quick-commerce micro-warehouse (darkstore) in an Indian metro, warehouse staff in neat vests packing grocery crates, delivery couriers ready with insulated bags, high-energy fulfillment logistics photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Picking & Packing Artwork (`#4338CA`)** | `public/images/ill_darkstore_picking.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A warehouse picker scanning a barcode on a grocery crate with a handheld barcode scanner next to organized shelving bins and a 3-minute stopwatch icon. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and storage bins are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] 15-Min Dispatch Artwork (`#00C2FF`)** | `public/images/ill_darkstore_dispatch.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A 2-wheeler delivery courier wearing an insulated thermal backpack riding a bike from a micro-warehouse towards a customer doorstep with live GPS map pins and 4-digit OTP badge. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The rider and vehicle are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 6. Drive a Cab / Driver Partner (`/drive-a-cab`)

| Asset Description | File Path | Aspect Ratio | Midjourney / Stable Diffusion Generation Prompt |
| :--- | :--- | :--- | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_drive_cab_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of a proud, friendly Indian cab driver buddy standing beside his clean modern white commercial sedan and an auto-rickshaw in an Indian urban street, warm daylight, smiling confidently with his smartphone showing instant earnings, professional commercial driver photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Instant Paperless Onboarding Artwork (`#4338CA`)** | `public/images/ill_driver_onboarding.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A smiling driver buddy holding up a smartphone with an approved green verification badge next to a car silhouette and 10-minute stopwatch emblem. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and elements are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Driver Dignity & Welfare Artwork (`#00C2FF`)** | `public/images/ill_driver_welfare.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A driver buddy receiving a warm handshake at a community support desk with a masked phone security icon and instant UPI rupee coin badge. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters and elements are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 7. Ride a Bike Taxi / Buddy (`/ride-a-bike-taxi`)

| Asset Description | File Path | Aspect Ratio | Midjourney / Stable Diffusion Generation Prompt |
| :--- | :--- | :--- | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_ride_bike_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of a young dynamic Indian motorcycle buddy wearing a neat safety jacket and helmet, standing beside his modern sports bike on an open city flyover during early morning golden hour, confident posture, authentic urban mobility photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Fast-Track Onboarding Artwork (`#4338CA`)** | `public/images/ill_bike_onboarding.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A bike buddy snapping a photo of his driving license on a phone next to an approved checkmark badge and a two-wheeler outline. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and equipment are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Buddy Safety Protection Artwork (`#00C2FF`)** | `public/images/ill_bike_safety.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A bike buddy wearing an ISI certified helmet next to a masked caller shield icon, emergency SOS beacon, and live GPS map route. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and icons are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 8. Deliver as a Courier (`/deliver-as-courier`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_courier_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of an energetic delivery courier partner wearing an insulated thermal backpack, smiling beside his electric delivery scooter outside a bright modern storefront, holding a parcel crate, authentic logistics photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Darkstore Micro-Hub Artwork (`#4338CA`)** | `public/images/ill_courier_darkstore.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A delivery courier picking up three sealed grocery bags from a darkstore counter with sequential multi-drop route navigation pins. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and packages are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] OTP Delivery Handover Artwork (`#00C2FF`)** | `public/images/ill_courier_otp.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A courier partner handing a package box to a happy customer at a doorstep with a digital 4-digit verification checkmark badge in between. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The characters and package are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

### 9. Join as a Fleet Owner (`/join-a-fleet`)
| Asset Type | Target File Path | Format | Exact Generation Prompt (Copy & Paste Ready) |
| :--- | :--- | :---: | :--- |
| **[x] Hero Banner Photo** | `public/images/photo_fleet_owner_hero.jpg` | `16:9 Banner` | `A high-quality realistic cinematic photograph of a confident Indian fleet business owner standing in front of a neat row of commercial white sedans, commercial autos, and delivery bikes in a modern paved lot, holding a digital tablet displaying fleet analytics, corporate mobility photography. Aspect ratio: 16:9 widescreen banner format, --ar 16:9.` |
| **[x] Fleet Telemetry Dashboard Artwork (`#4338CA`)** | `public/images/ill_fleet_telemetry.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: A fleet manager reviewing a digital live GPS map dashboard with vehicle pins, speed gauges, and geo-fence perimeter shields. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The character and screen are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #4338CA behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |
| **[x] Automated Financial Splits Artwork (`#00C2FF`)** | `public/images/ill_fleet_settlement.png` | `1:1 Square` | `Flat vector cartoon illustration in a bold, minimal editorial style: An automated bank vault transferring electronic revenue splits into a fleet business account and driver digital wallets with GST tax invoices. Thick black outlines, flat solid color fill, no gradients, no shading, playful proportions. The elements are drawn in black outline with white fill, sitting on top of an irregular abstract blob shape in solid color #00C2FF behind them. No text. Pure white background. Aspect ratio: 1:1 square format, --ar 1:1.` |

---

## 🚀 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 🏢 Official Corporate Information
- **Entity:** Riksho Technologies Pvt. Ltd.
- **Website:** https://riksho.com
- **Registered Office:** G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India
- **Chief Nodal & Grievance Officer:** Sumit Shaw (`grievance@riksho.in`)
- **Customer Care:** `support@riksho.in`
- **Partner Support:** `partnercare@riksho.in`
- **Corporate & Media:** `business@riksho.in`
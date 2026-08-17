export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
}

export interface LegalFAQ {
  question: string;
  answer: string;
}

export interface LegalDocument {
  title: string;
  subtitle: string;
  version: string;
  lastUpdated: string;
  effectiveDate: string;
  entityName: string;
  intro: string[];
  sections: LegalSection[];
  faqs?: LegalFAQ[];
}

export const legalUiTranslations = {
  customerTab: "Customer / Rider",
  partnerTab: "Driver / Partner",
  tableOfContents: "Document Outline",
  searchPlaceholder: "Search legal clauses, keywords, terms...",
  noResults: "No matching legal clauses found",
  printDoc: "Print Document",
  copyLink: "Copy Link",
  linkCopied: "Link Copied!",
  lastUpdatedLabel: "Last Updated",
  effectiveDateLabel: "Effective Date",
  versionLabel: "Version",
  officialEntity: "Governing Entity",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Quick answers to common legal, payment, data privacy, and compliance queries.",
  grievanceTitle: "Nodal Grievance Redressal & Statutory Compliance",
  grievanceDesc: "Pursuant to the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Consumer Protection (E-Commerce) Rules, 2020, and the Digital Personal Data Protection (DPDP) Act, 2023, please find below the designated statutory Grievance Officer details:",
  officerName: "Rajesh Kumar Sharma",
  officerRole: "Chief Nodal & Grievance Redressal Officer",
  officerEntity: "Riksho Technologies Pvt. Ltd.",
  officerEmail: "grievance@riksho.in",
  officerAddress: "Corporate Office: G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India",
  officerResponseTime: "Statutory SLA: Acknowledgment within 24–48 hours | Resolution within 15–30 days",
  officialNotice: "This is a legally binding electronic agreement executed under the Information Technology Act, 2000 and the rules framed thereunder."
};

// ==========================================
// 1. PRIVACY POLICY - CUSTOMER (14 DETAILED CLAUSES)
// ==========================================
export const webPrivacyCustomerTranslations: LegalDocument = {
  title: "Customer Privacy Policy",
  subtitle: "Complete Data Governance and Privacy Protocol Governing the Collection, Use, Telemetry Tracking, Storage, Disclosure, Transfer, and Protection of Your Personal Information under the Digital Personal Data Protection (DPDP) Act, 2023 and Information Technology Act, 2000.",
  version: "Version 4.1.0 (DPDP Act Compliance)",
  lastUpdated: "July 21, 2026",
  effectiveDate: "August 1, 2026",
  entityName: "Riksho Technologies Pvt. Ltd.",
  intro: [
    "Your privacy matters to Riksho Technologies Pvt. Ltd. (the \"Company\", \"we\", \"Riksho\", \"us\" or \"our\").",
    "This Privacy Policy (\"Policy\") describes our policies and procedures on the collection, use, processing, storage, retrieval, disclosure, transfer, and protection of your information, including personal information and sensitive personal data or information (\"Information\"), that Riksho may receive through your online access, interaction, or use of the Riksho mobile applications (\"Riksho App\"), our website located at https://riksho.in (the website and Riksho App are collectively referred to as the \"Riksho Platform\"), or through your offline interactions with us including via telephone, emails, in-person support desks, or while availing our on-demand mobility and delivery Services.",
    "The terms \"you\" and \"your\" refer to a Customer / Rider, a Captain / Driver Partner, a Delivery Partner, or any other user accessing the Riksho Platform or availing the Services.",
    "Please read this Policy carefully before using the Riksho Platform or submitting any Information to Riksho. This Policy is incorporated into and is to be read alongside the Customer Terms of Service and applicable Partner Agreements available on the Riksho Platform."
  ],
  sections: [
    {
      id: "user-acceptance",
      number: "1",
      title: "User Acceptance & Legal Representations",
      paragraphs: [
        "By downloading, registering, accessing, or using the Riksho Platform or availing any Services, you unconditionally agree and consent to the practices described in this Policy, along with any amendments posted by the Company from time to time.",
        "Any collection, processing, retrieval, transfer, use, storage, disclosure, and protection of your Information will be in strict compliance with applicable statutory enactments, including but not limited to the Digital Personal Data Protection (DPDP) Act, 2023, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (\"Applicable Laws\"). If you do not agree with this Policy, please do not use or access the Riksho Platform.",
        "You hereby represent and warrant to Riksho that:"
      ],
      bullets: [
        "Authenticity: The Information you provide to Riksho from time to time is and will be authentic, correct, current, complete, and updated, and you have all legal rights, permissions, and consents required to provide such Information.",
        "Statutory Compliance: Your provision of Information and Riksho's consequent processing, storage, and transfer will not violate any contractual agreement, Applicable Laws, judgments, or regulatory orders.",
        "Third-Party Authority: If you disclose to us any Information relating to other individuals (e.g. emergency contacts or package recipients), you represent that you possess the lawful authority to do so."
      ],
      callout: "Statutory Consent: By accessing the Platform, you provide explicit consent to the processing of personal data for transit dispatch, safety monitoring, and tax compliance."
    },
    {
      id: "definitions",
      number: "2",
      title: "Statutory Definitions & Interpretations",
      paragraphs: [
        "Unless otherwise defined in this Policy, capitalized terms shall have the meaning ascribed below:"
      ],
      bullets: [
        "Captains / Driver Partners: Independent third-party commercial vehicle operators who provide motorized bike taxi, auto rickshaw, or cab transportation to Customers via the Platform.",
        "Customer / Rider: A natural person who requests, books, or receives transportation, delivery, or logistics services on the Riksho Platform.",
        "Personal Data / Information: Any information that relates to an identified or identifiable natural person, including name, phone number, GPS coordinates, email address, and payment identifiers.",
        "Device Identifier: Unique device identifiers including IMEI, UUID, IP address, MAC address, and operating system build parameters.",
        "Third-Party Service Providers (TPSPs): Trusted third-party technology vendors, payment aggregators, cloud hosts, mapping providers, and background verification agencies contracted by Riksho.",
        "Usage Information: Passive or automated telemetry data collected while interacting with the Riksho Platform."
      ]
    },
    {
      id: "information-you-provide",
      number: "3",
      title: "What Information Do We Collect: Information You Provide to Us",
      paragraphs: [
        "We collect personal information directly from you when you create an account, update your profile, request rides, contact customer support, or participate in promotional surveys:",
        "The Information you provide includes the following distinct categories:"
      ],
      bullets: [
        "Account Registration Information: Mobile telephone number (+91), full legal name, email address, gender, date of birth, profile photograph, and account login credentials.",
        "Saved Transit & Billing Addresses: Home and work addresses, favorite saved landmarks, emergency contact numbers, and invoice preferences.",
        "Driver Partner Statutory KYC: Commercial Driving License (DL), Permanent Account Number (PAN), Aadhaar token (via DigiLocker / offline e-KYC), Vehicle Registration Certificate (RC), Commercial Insurance Policy, Fitness Certificate, and live facial selfie images for continuous identity verification.",
        "Background Verification Records: Police verification certificates, court record histories, and commercial driving records (collected via authorized background check TPSPs).",
        "Customer Support Correspondence: Voice call recordings, chat transcripts, dispute tickets, uploaded accident photographs, and feedback ratings."
      ]
    },
    {
      id: "information-collected-automatically",
      number: "4",
      title: "Information We Collect Automatically as You Access & Use the Riksho App",
      paragraphs: [
        "Whenever you access or interact with the Riksho Platform, our systems automatically capture transactional, spatial, and technical telemetry:",
        "Detailed automated data streams include:"
      ],
      bullets: [
        "Real-Time Location & GPS Telemetry (Customers): We collect precise GPS coordinates from your mobile device when the Riksho App is running in the foreground (open on-screen) and during active transit to determine pickup coordinates, optimize routes, compute fares, and power safety features. Even if precise location permissions are restricted, we link the assigned Captain's real-time trip GPS to your booking receipt for verification.",
        "Real-Time Location & GPS Telemetry (Captains): For Driver Partners, high-precision GPS telemetry is captured both in the foreground and background whenever the 'On-Duty' status toggle is enabled.",
        "Transactional & Ride Telemetry: Pickup and drop-off coordinates, route timestamps, distance traveled (km), duration (minutes), fare breakdown, tolls, and digital transaction tokens.",
        "Device & Telemetry Identifiers: Hardware model, operating system version, screen resolution, mobile carrier network data, battery level, crash dumps, and app gesture interactions.",
        "SMS & OTP Permissions: Device access permissions to read incoming One-Time Passwords (OTPs) sent by Riksho for seamless auto-verification during login and digital payments.",
        "Call Masking & Voice Recordings: For safety and quality assurance, phone calls between Riders and Captains routed via our in-app proxy telephony numbers are recorded.",
        "Cookies & Session Tracking: Essential cookies and session analytics stored in your browser to maintain authentication state."
      ]
    },
    {
      id: "information-from-third-parties",
      number: "5",
      title: "Information Third Parties Provide About You",
      paragraphs: [
        "We may receive information about you from our affiliates, business partners, and Third-Party Service Providers (TPSPs):"
      ],
      bullets: [
        "Payment Aggregators: Settlement status, transaction reference numbers, and UPI VPA verification from RBI-authorized payment gateways.",
        "Government Portals & Verification TPSPs: Driving license validation via VAHAN / SARATHI databases, DigiLocker KYC verification, and criminal background checks.",
        "Corporate Clients & Co-Branded Partners: If your account is linked to an employer corporate ride program, we receive corporate email and cost-center allocation details."
      ]
    },
    {
      id: "use-of-information",
      number: "6",
      title: "Purposes & Legal Bases for Processing Your Information",
      paragraphs: [
        "Riksho processes your Information strictly for lawful, legitimate purposes connected to our mobility dispatch services:",
        "Our processing activities include:"
      ],
      bullets: [
        "Platform Access & Identity Verification: Authenticating your login credentials, verifying age eligibility, and confirming commercial driving permits.",
        "Dispatch Allocation & Route Optimization: Matching Riders with the closest available Captains based on live telemetry, road congestion, and vehicle type.",
        "Safety Engineering & Emergency SOS: Transmitting real-time GPS coordinates, vehicle registration numbers, and live telemetry to Police Control (112) and the Riksho Emergency Response Team upon SOS trigger.",
        "Dynamic Fare Billing & Tax Invoicing: Generating accurate distance-based ride receipts, calculating wait times, deducting tolls, and issuing digital invoices.",
        "Fraud Prevention & Anti-Money Laundering: Detecting GPS spoofing, fraudulent payment chargebacks, account takeovers, and algorithmic referral abuses.",
        "Customer Service & Dispute Resolution: Investigating lost property reports, fare overcharges, and vehicle condition complaints.",
        "Performance Analytics: Identifying app crashes, optimizing backend dispatch servers, and improving transit coverage."
      ]
    },
    {
      id: "disclosure-to-third-parties",
      number: "7",
      title: "How & When We Disclose Information to Third Parties",
      paragraphs: [
        "Riksho does not sell, rent, or trade your personal information to third-party commercial advertisers. We disclose Information strictly in the following circumstances:"
      ],
      bullets: [
        "Between Riders and Captains: When a ride is confirmed, the assigned Captain receives your first name, pickup location, and in-app masked telephone proxy. When a ride ends, your complete personal contact details are immediately hidden.",
        "Third-Party Service Providers (TPSPs): We engage trusted TPSPs to host cloud databases (AWS / GCP in India), process digital payments (Razorpay / Cashfree), verify government KYC credentials, send SMS/WhatsApp notifications, and conduct technical analytics under strict data processing agreements.",
        "Statutory & Legal Compulsion: We disclose information to police authorities, judicial courts, and enforcement agencies in response to valid statutory summons, court orders, or emergency life-threatening situations.",
        "Corporate Restructuring: In the event of a merger, acquisition, asset sale, or corporate reorganization, customer data may be transferred to the continuing entity under equivalent privacy protections."
      ]
    },
    {
      id: "co-branded-promotions",
      number: "8",
      title: "Co-Branded Services, Contests & Promotional Features",
      paragraphs: [
        "Riksho may offer co-branded services, insurance add-ons, or promotional sweepstakes in partnership with reputable commercial institutions (such as financial lenders, fuel discount partners, or charity sponsors).",
        "If you elect to participate in a co-branded program or promotion, your name and relevant contact details may be shared with the co-sponsor as disclosed at the time of entry."
      ]
    },
    {
      id: "third-party-links",
      number: "9",
      title: "Third-Party Content, External Links & Social Media Widgets",
      paragraphs: [
        "The Riksho Platform may contain links to external third-party websites or services (e.g. mapping providers, insurance partners, or social media sharing widgets).",
        "Riksho is not responsible for the privacy practices, content, or security standards of third-party platforms. We encourage you to review the privacy policies of any third-party websites you visit."
      ]
    },
    {
      id: "data-retention",
      number: "10",
      title: "Data Retention Schedules, Account Deactivation & Anonymization",
      paragraphs: [
        "We retain your Information for as long as your account remains active and as necessary to deliver our Services.",
        "Post-Termination Retention (180 Days): Following account deactivation, we retain trip logs, GPS coordinates, and communication records for a statutory period of 180 days to resolve pending disputes, process chargebacks, and prevent fraud.",
        "Long-Term Financial Archival (7 Years): Tax invoices, accounting records, and payout ledger entries are securely archived for seven (7) years in compliance with Indian taxation and corporate record-keeping laws.",
        "Anonymization: After the expiry of retention schedules, personal data is either permanently deleted from production databases or irreversibly anonymized for analytical research."
      ]
    },
    {
      id: "user-rights-dpdp",
      number: "11",
      title: "Your Statutory Rights under the Digital Personal Data Protection Act, 2023",
      paragraphs: [
        "As a Data Principal under the DPDP Act, 2023, you possess comprehensive statutory rights regarding your personal information:"
      ],
      bullets: [
        "Right to Access & Summary: Request a complete summary of personal data processed by Riksho, including identities of TPSPs with whom data has been shared.",
        "Right to Correction & Updating: Rectify inaccurate, misleading, or out-of-date personal information directly in the Riksho App.",
        "Right to Erasure (Account Deletion): Submit an account deletion request via the app Privacy Hub or by emailing grievance@riksho.in.",
        "Right to Nominate: Nominate an individual to exercise your data rights in the event of death or incapacity."
      ]
    },
    {
      id: "security-measures",
      number: "12",
      title: "Information Security, AES-256 Encryption & Data Localization",
      paragraphs: [
        "All Information collected by Riksho is securely stored in ISO 27001, ISO 27018, and SOC-2 certified tier-IV data center facilities physically located within the territorial borders of the Republic of India.",
        "We enforce industry-standard security safeguards including TLS 1.3 encryption in transit, AES-256 encryption at rest, multi-factor administrative authentication, network firewalls, and continuous vulnerability monitoring."
      ]
    },
    {
      id: "children-privacy",
      number: "13",
      title: "Information of Children & Ineligible Persons",
      paragraphs: [
        "The Riksho Platform is not intended for or directed to individuals under eighteen (18) years of age. We do not knowingly collect or solicit personal data from children. If we discover that a minor has registered without verified parental consent, we will promptly delete the account and associated information."
      ]
    },
    {
      id: "grievance-redressal",
      number: "14",
      title: "Nodal Grievance Redressal Officer & Policy Amendments",
      paragraphs: [
        "If you have any questions, concerns, feedback, or legal grievances regarding the processing of your Information, please reach out to our designated Nodal Grievance Officer:",
        "Name: Rajesh Kumar Sharma | Designation: Chief Nodal & Grievance Redressal Officer | Email: grievance@riksho.in | Address: G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India.",
        "Amendments: Riksho reserves the right to modify this Policy periodically. We will notify you of material changes via in-app banner notifications or email prior to the revised Policy taking effect."
      ]
    }
  ],
  faqs: [
    {
      question: "Does Riksho track my location when the app is closed?",
      answer: "For Customers, Riksho only captures your location when the app is actively open on-screen (foreground) and during an active trip to ensure route accuracy and emergency safety. For Driver Partners, location is tracked in the background only when the 'On-Duty' toggle is turned on."
    },
    {
      question: "Does Riksho sell my personal data to advertisers?",
      answer: "No. Riksho strictly never sells, rents, or commercializes your personal data, trip history, or phone number to third-party marketing companies."
    },
    {
      question: "How do I permanently delete my account and data?",
      answer: "You can request account deletion directly inside the app by navigating to Profile > Settings > Data & Privacy > Delete Account, or by emailing our Grievance Officer at grievance@riksho.in. Your personal identifiers will be purged within 30 days."
    },
    {
      question: "Are my phone calls with drivers private?",
      answer: "Yes. Riksho utilizes virtual number masking technology. Drivers and riders cannot view each other's actual personal phone numbers during transit calls."
    }
  ]
};

// ==========================================
// 2. PRIVACY POLICY - DRIVER / PARTNER
// ==========================================
export const webPrivacyPartnerTranslations: LegalDocument = {
  title: "Driver & Delivery Partner Privacy Policy",
  subtitle: "Comprehensive Partner Data Governance Protocol: Statutory KYC Verification, Continuous GPS Telemetry, Banking Payout Settlements, Background Checks, and 7-Year Regulatory Retention.",
  version: "Version 4.1.0 (Partner Privacy)",
  lastUpdated: "July 21, 2026",
  effectiveDate: "August 1, 2026",
  entityName: "Riksho Technologies Pvt. Ltd.",
  intro: [
    "This Partner Privacy Policy (\"Policy\") details the policies and procedures of Riksho Technologies Pvt. Ltd. regarding the collection, verification, storage, and processing of personal, biometric-linked, and telematics data of driver and courier partners (\"Driver Partners\" or \"you\").",
    "Compliance with these data standards is mandatory to maintain an active commercial driving account on the Riksho Platform."
  ],
  sections: [
    {
      id: "partner-data-ingestion",
      number: "1",
      title: "Statutory KYC & Personal Data Collection",
      paragraphs: [
        "To comply with state motor vehicle directives and ensure passenger safety, we collect, verify, and store:"
      ],
      bullets: [
        "Commercial Driving License (DL): Verified via the Ministry of Road Transport and Highways (MoRTH) SARATHI portal.",
        "Identity & Tax Documents: PAN Card and Aadhaar Card (via DigiLocker token).",
        "Vehicle Documentation: Registration Certificate (RC), Commercial Insurance, Fitness Certificate, and PUC.",
        "Live Biometric Selfies: In-app real-time facial selfie verification before activating 'On-Duty' dispatch mode.",
        "Banking & Settlement Data: Bank account number, IFSC code, and UPI VPAs for daily automatic earnings payouts.",
        "Background Verification Records: Police verification certificates and court record checks."
      ]
    },
    {
      id: "continuous-telematics",
      number: "2",
      title: "Continuous High-Frequency GPS Telematics & Telemetry Auditing",
      paragraphs: [
        "While logged into the Partner App in 'On-Duty' status, your real-time GPS telemetry is continuously captured in both the foreground and background to calculate ride dispatches, compute automated distance fares, and monitor safety."
      ]
    },
    {
      id: "regulatory-retention",
      number: "3",
      title: "Regulatory Storage & 7-Year Data Retention Schedules",
      paragraphs: [
        "In compliance with the Motor Vehicles Act, 1988, IT Act, 2000, and tax regulations, partner KYC, trip trajectories, and payout ledger records are securely archived for seven (7) years following account deactivation."
      ]
    },
    {
      id: "partner-rights",
      number: "4",
      title: "Partner Data Rights & Support Contact",
      paragraphs: [
        "Partners may inspect uploaded documents, update bank details, and request tax statements via the Partner App or by writing to partnercare@riksho.in."
      ]
    }
  ],
  faqs: [
    {
      question: "When is my background location tracked?",
      answer: "Background GPS tracking is only enabled when you actively switch your status toggle to 'On-Duty' in the Riksho Partner App."
    },
    {
      question: "How long are my trip logs and earnings records kept?",
      answer: "In compliance with Indian taxation and transport laws, earnings and KYC records are securely archived for 7 years."
    }
  ]
};

// ==========================================
// 3. TERMS OF SERVICE - CUSTOMER (12 CLAUSES)
// ==========================================
export const webTermsCustomerTranslations: LegalDocument = {
  title: "Customer Terms of Service",
  subtitle: "Comprehensive Master Terms & Conditions Governing Rider Accounts, Booking Dispatches, Dynamic Fare Calculations, Payment Settlement, Safety Protocols, and Dispute Mechanisms.",
  version: "Version 4.1.0 (PAN-India Edition)",
  lastUpdated: "July 21, 2026",
  effectiveDate: "August 1, 2026",
  entityName: "Riksho Technologies Pvt. Ltd.",
  intro: [
    "Welcome to Riksho! These Customer Terms of Service (\"Terms\" or \"Agreement\") constitute an electronic contract under the Information Technology Act, 2000 and the rules framed thereunder.",
    "This document is published in accordance with Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and the Consumer Protection (E-Commerce) Rules, 2020.",
    "The Platform is owned and operated by Riksho Technologies Pvt. Ltd., having its registered office at G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India.",
    "By using the Platform, you agree to be bound by these Terms, our Privacy Policy, Cancellation & Refund Policy, and Safety Guidelines."
  ],
  sections: [
    {
      id: "acceptance",
      number: "1",
      title: "Contractual Relationship, Binding Acceptance & Amendments",
      paragraphs: [
        "Your access to and use of the Platform establishes a legally binding contractual relationship between you and Riksho.",
        "Riksho reserves the right to amend these Terms at any time. Continued access after amendments are published constitutes your acceptance of the revised Terms."
      ]
    },
    {
      id: "eligibility",
      number: "2",
      title: "User Eligibility, Capacity to Contract & Verification",
      paragraphs: [
        "The Platform is available only to individuals legally competent to contract under the Indian Contract Act, 1872."
      ],
      bullets: [
        "Age: You must be at least 18 years of age.",
        "Legal Capacity: You must possess full legal capacity to enter into binding contracts.",
        "Good Standing: You must not have been previously suspended or terminated from the Platform.",
        "Mobile Telecommunication: You must hold an active Indian mobile number (+91) registered in your legal name."
      ]
    },
    {
      id: "account",
      number: "3",
      title: "Account Registration, Security & Responsibilities",
      paragraphs: [
        "You must register an Account via OTP verification. You are solely responsible for maintaining the confidentiality of your login credentials and all activities occurring under your Account."
      ],
      bullets: [
        "Single Account: Only one active account is permitted per natural person.",
        "Non-Transferable: You cannot assign or transfer your Account to any third party.",
        "Breach Notification: Promptly notify Riksho at support@riksho.in upon suspecting unauthorized access."
      ]
    },
    {
      id: "services",
      number: "4",
      title: "Nature of Services & Intermediary Role",
      paragraphs: [
        "Riksho operates strictly as an electronic commerce marketplace and technology intermediary under Section 79 of the IT Act, 2000. Riksho connects Riders with independent commercial Driver Partners (Bike Taxi, Auto Rickshaw, and Cabs). Riksho does not provide transportation services directly."
      ]
    },
    {
      id: "bookings",
      number: "5",
      title: "Ride Bookings, Waiting Times & Navigation",
      paragraphs: [
        "When you request a ride, an upfront estimated fare is displayed. A binding trip contract is formed when an independent Driver Partner accepts your dispatch.",
        "A complimentary waiting grace period of 5 minutes is provided at the pickup point. In-transit destination updates will automatically adjust the fare based on distance and duration."
      ]
    },
    {
      id: "payments",
      number: "6",
      title: "Fares, Surge Pricing, Taxes, Tolls & Payments",
      paragraphs: [
        "Fares are calculated based on base fare, distance, time, applicable tolls (FASTag), and applicable statutory taxes. Dynamic surge pricing may apply during peak demand periods.",
        "Accepted payment modes include Direct Cash to Driver, online UPI, Debit/Credit Cards, and Riksho Wallet / Coins."
      ]
    },
    {
      id: "cancellations",
      number: "7",
      title: "Cancellation Policy & Refund Framework",
      paragraphs: [
        "Riders may cancel rides free of charge within 2 minutes of booking acceptance. Cancellations beyond 2 minutes may incur a ₹25–₹50 fee. Driver-initiated cancellations never attract rider fees. Approved refunds are credited instantly to Riksho Wallet or within 3–5 business days to bank accounts."
      ]
    },
    {
      id: "conduct",
      number: "8",
      title: "Rider Code of Conduct & Safety Prohibitions",
      paragraphs: [
        "Users must maintain civility and safety at all times. Physical violence, sexual harassment, verbal abuse, smoking, alcohol, narcotics, and damaging partner vehicles are strictly prohibited and result in immediate account termination."
      ]
    },
    {
      id: "safety",
      number: "9",
      title: "Safety Systems, Live Telemetry & Insurance",
      paragraphs: [
        "Riksho provides 24/7 automated telemetry tracking, in-app Emergency SOS connected to Police (112), driver identity validation, and third-party passenger accidental insurance on every completed trip."
      ]
    },
    {
      id: "ip",
      number: "10",
      title: "Intellectual Property Rights",
      paragraphs: [
        "All software, algorithms, designs, logos, and trademarks remain the exclusive intellectual property of Riksho Technologies Pvt. Ltd."
      ]
    },
    {
      id: "liability",
      number: "11",
      title: "Limitation of Liability & Disclaimers",
      paragraphs: [
        "The Platform is provided on an 'as-is' basis. Riksho's aggregate liability for any direct claim arising from a trip shall not exceed the gross fare paid for that specific trip."
      ]
    },
    {
      id: "disputes",
      number: "12",
      title: "Governing Law, Arbitration & Jurisdiction",
      paragraphs: [
        "These Terms are governed by the laws of India. Unresolved disputes shall be referred to binding sole arbitration in Bengaluru, Karnataka under the Arbitration and Conciliation Act, 1996."
      ]
    }
  ],
  faqs: [
    {
      question: "How are ride fares calculated?",
      answer: "Fares are calculated using transparent base rates + distance + time + applicable tolls and taxes. During peak traffic or rain, dynamic surge multipliers may apply and are always shown upfront."
    },
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel free of charge within 2 minutes of driver assignment. After 2 minutes or upon driver arrival, a ₹25–₹50 fee may apply to compensate the driver for fuel."
    },
    {
      question: "How does the in-app SOS safety button work?",
      answer: "Tapping the in-app SOS button instantly transmits your real-time GPS coordinates, driver details, and trip route to local Police Control (112) and our 24/7 Emergency Response Team."
    },
    {
      question: "What payment methods are supported?",
      answer: "You can pay via Cash directly to the driver, instant UPI QR code, Net Banking, Debit/Credit Cards, or your prepaid Riksho Wallet."
    }
  ]
};

// ==========================================
// 4. TERMS OF SERVICE - DRIVER / PARTNER
// ==========================================
export const webTermsPartnerTranslations: LegalDocument = {
  title: "Driver & Delivery Partner Terms of Service",
  subtitle: "Master Partner Agreement, Onboarding Standards, Commission Structure, Vehicle Compliance & Platform Obligations",
  version: "Version 4.1.0 (Partner Edition)",
  lastUpdated: "July 21, 2026",
  effectiveDate: "August 1, 2026",
  entityName: "Riksho Technologies Pvt. Ltd.",
  intro: [
    "This Master Partner Agreement (\"Agreement\") is entered into between Riksho Technologies Pvt. Ltd. (\"Riksho\", \"Company\", \"we\", or \"us\") and the independent driver/delivery operator (\"Driver Partner\", \"Partner\", or \"you\").",
    "By signing up, submitting KYC documentation, and taking online trip dispatches on the Riksho Partner App, you agree to comply with this Agreement, our Partner Privacy Policy, Vehicle Standards, and Code of Conduct."
  ],
  sections: [
    {
      id: "relationship",
      number: "1",
      title: "Independent Contractor Relationship",
      paragraphs: [
        "You expressly acknowledge and agree that your relationship with Riksho is solely that of an independent commercial contractor. Nothing in this Agreement creates any employer-employee, agency, or partnership relationship.",
        "You retain complete autonomy and freedom to determine when, where, and for how long you log into the Partner App and accept ride dispatches."
      ]
    },
    {
      id: "kyc-verification",
      number: "2",
      title: "Driver Partner Onboarding & Statutory KYC",
      paragraphs: [
        "To receive trip dispatches, you must upload and maintain valid government documentation:"
      ],
      bullets: [
        "Commercial Driving License (DL).",
        "Aadhaar Card and PAN Card for tax compliance.",
        "Vehicle Registration Certificate (RC) with valid fitness certificate.",
        "Motor Insurance: Active third-party commercial vehicle insurance.",
        "Pollution Under Control (PUC) certificate.",
        "Police Verification Certificate."
      ]
    },
    {
      id: "vehicle-standards",
      number: "3",
      title: "Vehicle Standards & EV Mandates",
      paragraphs: [
        "Vehicles must be maintained in roadworthy, clean, and mechanically sound condition at all times. Electric vehicles must maintain at least 20% battery charge before accepting long-distance trips."
      ]
    },
    {
      id: "earnings-commission",
      number: "4",
      title: "Partner Earnings, Commission & Payouts",
      paragraphs: [
        "Riksho deducts a transparent platform facilitation fee (0% to 15%) from gross fares. Digital fares and bonuses are settled via automated daily bank transfers."
      ]
    },
    {
      id: "code-of-conduct",
      number: "5",
      title: "Zero Tolerance Safety & Code of Conduct",
      paragraphs: [
        "No driving under the influence of alcohol, narcotics, or fatigue. Strict zero tolerance for harassment, overcharging, or refusing helmets/seatbelts."
      ]
    },
    {
      id: "disputes",
      number: "6",
      title: "Governing Law & Dispute Resolution",
      paragraphs: [
        "This Agreement is governed by Indian law. Disputes shall be resolved through binding sole arbitration in Bengaluru, Karnataka."
      ]
    }
  ],
  faqs: [
    {
      question: "When are partner payouts settled?",
      answer: "All digital ride fares, tips, and incentive bonuses are calculated daily and transferred directly to your verified bank account or UPI VPA every morning."
    },
    {
      question: "What documents do I need to register as a Driver Partner?",
      answer: "You need a Commercial Driving License (DL), Vehicle Registration Certificate (RC), Commercial Insurance, Pollution Certificate (PUC), PAN Card, and Aadhaar."
    }
  ]
};

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
  allUsersTab: "Web Platform & All Users",
  partnerPortalTab: "Partner Web Portal",
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
  officerName: "Sumit Shaw",
  officerRole: "Chief Nodal & Grievance Redressal Officer",
  officerEntity: "Riksho",
  officerEmail: "grievance@riksho.com",
  officerAddress: "G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India",
  officerResponseTime: "Statutory SLA: Acknowledgment within 24–48 hours | Resolution within 15–30 days",
  officialNotice: "This is a legally binding electronic agreement executed under the Information Technology Act, 2000 and the rules framed thereunder."
};

// ==========================================
// 1. PRIVACY POLICY - CUSTOMER
// ==========================================
export const webPrivacyCustomerTranslations: LegalDocument = {
  title: "Customer Privacy Policy",
  subtitle: "Data Governance and Privacy Protocol Governing the Collection, Use, Telemetry Tracking, Storage, Disclosure, Transfer, and Protection of Your Personal Information under the Digital Personal Data Protection (DPDP) Act, 2023 and Information Technology Act, 2000.",
  version: "Version 4.1.0",
  lastUpdated: "August 2026",
  effectiveDate: "August 2026",
  entityName: "Riksho",
  intro: [
    "Your privacy matters to Riksho (\"we\", \"Riksho\", \"us\" or \"our\").",
    "This Privacy Policy (\"Policy\") describes our policies and procedures on the collection, use, processing, storage, retrieval, disclosure, transfer, and protection of your information, including personal information and sensitive personal data or information (\"Information\"), that Riksho may receive through your online access, interaction, or use of the Riksho mobile applications (\"Riksho App\"), our website located at https://riksho.com (the website and Riksho App are collectively referred to as the \"Riksho Platform\"), or through your offline interactions with us including via telephone, emails, in-person support desks, or while availing our on-demand mobility and delivery Services.",
    "The terms \"you\" and \"your\" refer to a Customer / Rider, a Driver Partner / Buddy, a Delivery Partner, or any other user accessing the Riksho Platform or availing the Services.",
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
        "Driver Buddies / Driver Partners: Independent third-party commercial vehicle operators who provide motorized bike taxi, auto rickshaw, or cab transportation to Customers via the Platform.",
        "Customer / Rider: A natural person who requests, books, or receives transportation, delivery, or logistics services on the Riksho Platform.",
        "Personal Data / Information: Any information that relates to an identified or identifiable natural person, including name, phone number, GPS coordinates, email address, and payment identifiers.",
        "Device Identifier: Unique device identifiers including IMEI, UUID, IP address, MAC address, and operating system build parameters.",
        "Third-Party Service Providers (TPSPs): Trusted technology vendors, cloud hosts, and mapping providers utilized by Riksho.",
        "Usage Information: Telemetry data collected while interacting with the Riksho Platform."
      ]
    },
    {
      id: "information-you-provide",
      number: "3",
      title: "What Information Do We Collect: Information You Provide to Us",
      paragraphs: [
        "We collect personal information directly from you when you create an account, update your profile, request rides, or contact customer support:",
        "The Information you provide includes the following categories:"
      ],
      bullets: [
        "Account Registration Information: Mobile phone number (+91), full name, email address, profile photograph, and account credentials.",
        "Saved Transit Addresses: Saved pickup/drop-off landmarks and emergency contact numbers.",
        "Driver Partner KYC & Vehicle Details: Driving License (DL), Vehicle Registration Certificate (RC), Vehicle Insurance, and Government Identity Proof (Aadhaar/PAN) uploaded during onboarding.",
        "Customer Support Correspondence: Chat messages, dispute tickets, uploaded photographs, and feedback ratings."
      ]
    },
    {
      id: "information-collected-automatically",
      number: "4",
      title: "Information We Collect Automatically as You Access & Use the Riksho App",
      paragraphs: [
        "Whenever you access or interact with the Riksho Platform, our systems capture operational and location data necessary for ride fulfillment:",
        "Detailed automated data streams include:"
      ],
      bullets: [
        "Real-Time Location & GPS Telemetry (Customers): We collect GPS coordinates from your mobile device when the Riksho App is in the foreground (open on-screen) and during active transit to determine pickup coordinates, optimize routes, and compute fares.",
        "Real-Time Location & GPS Telemetry (Drivers): For Driver Partners, GPS telemetry is captured while the 'On-Duty' status toggle is enabled to match nearby rides and navigate routes.",
        "Transactional & Ride Telemetry: Pickup and drop-off coordinates, route timestamps, distance traveled (km), duration (minutes), and fare breakdown.",
        "Device Identifiers: Hardware model, operating system version, crash logs, and app interaction telemetry.",
        "Cookies & Session Tracking: Essential cookies and session tokens stored in your browser to maintain authentication state."
      ]
    },
    {
      id: "information-from-third-parties",
      number: "5",
      title: "Information Received from Third-Party Services",
      paragraphs: [
        "We may receive information about you from trusted technology service providers:",
        "Key integrations include:"
      ],
      bullets: [
        "Mapping Services: Geocoding coordinates and road network distances for route estimation.",
        "Notification Gateways: Delivery receipts for transactional SMS and booking alerts."
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
        "Dispatch Allocation & Route Optimization: Matching Riders with the closest available Buddies based on live telemetry, road congestion, and vehicle type.",
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
        "Between Riders and Buddies: When a ride is confirmed, the assigned Buddy receives your first name, pickup location, and in-app masked telephone proxy. When a ride ends, your complete personal contact details are immediately hidden.",
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
        "Right to Access & Summary: Request a complete summary of personal data processed by Riksho, including identities of service providers with whom data has been shared for ride execution.",
        "Right to Correction & Updating: Rectify inaccurate, misleading, or out-of-date personal information directly in the Riksho App.",
        "Right to Erasure (Account Deletion): Submit an account deletion request via the app Privacy Hub or by emailing grievance@riksho.com.",
        "Right to Nominate: Nominate an individual to exercise your data rights in the event of death or incapacity."
      ]
    },
    {
      id: "security-measures",
      number: "12",
      title: "Information Security & Data Storage",
      paragraphs: [
        "All Information collected by Riksho is securely stored on secure cloud database servers physically located within the territorial borders of the Republic of India.",
        "We enforce industry-standard security safeguards including TLS encryption in transit, encrypted storage at rest, strict access controls, network firewalls, and regular security monitoring."
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
        "Name: Sumit Shaw | Designation: Chief Nodal & Grievance Redressal Officer | Email: grievance@riksho.com | Address: G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India.",
        "Amendments: Riksho reserves the right to modify this Policy periodically. We will notify you of material changes via in-app banner notifications or email prior to the revised Policy taking effect."
      ]
    }
  ],
  faqs: [
    {
      question: "Does Riksho track my location when the app is closed?",
      answer: "For Customers, Riksho only captures your location when the app is actively open on-screen (foreground) and during an active trip to ensure route accuracy and emergency safety. For Driver Partners, location is tracked only when the 'On-Duty' toggle is turned on."
    },
    {
      question: "Does Riksho sell my personal data to advertisers?",
      answer: "No. Riksho strictly never sells, rents, or commercializes your personal data, trip history, or phone number to third-party marketing companies."
    },
    {
      question: "How do I permanently delete my account and data?",
      answer: "You can request account deletion directly inside the app by navigating to Profile > Settings > Data & Privacy > Delete Account, or by emailing our Grievance Officer at grievance@riksho.com. Your personal identifiers will be purged within 30 days."
    },
    {
      question: "Are my phone calls with drivers private?",
      answer: "Yes. Riksho facilitates in-app communication and respects your privacy. Drivers and riders are encouraged to communicate for pickup coordination only."
    }
  ]
};

// ==========================================
// 2. PRIVACY POLICY - DRIVER / PARTNER
// ==========================================
export const webPrivacyPartnerTranslations: LegalDocument = {
  title: "Driver & Delivery Partner Privacy Policy",
  subtitle: "Partner Data Governance Protocol: Driver KYC Verification, GPS Telemetry for Dispatches, Payout Settlements, and Regulatory Compliance.",
  version: "Version 4.1.0 (Partner Privacy)",
  lastUpdated: "August 2026",
  effectiveDate: "August 2026",
  entityName: "Riksho",
  intro: [
    "This Partner Privacy Policy (\"Policy\") details the policies and procedures of Riksho (\"we\", \"our\", or \"us\") regarding the collection, verification, storage, and processing of personal, vehicle, and telematics data of driver and courier partners (\"Driver Partners\" or \"you\").",
    "Compliance with these data standards is required to maintain an active commercial driving account on the Riksho Platform."
  ],
  sections: [
    {
      id: "partner-data-ingestion",
      number: "1",
      title: "Driver KYC & Vehicle Data Collection",
      paragraphs: [
        "To comply with transport directives and ensure passenger safety, we collect, verify, and store:"
      ],
      bullets: [
        "Driving License (DL): Valid commercial or standard category driving license as applicable.",
        "Identity Proofs: Government identity proof (Aadhaar Card or PAN Card) for verification and tax reporting.",
        "Vehicle Documentation: Registration Certificate (RC), Vehicle Insurance, and Fitness / PUC Certificate.",
        "Profile Photograph: Clear face photo for passenger identification.",
        "Banking & Settlement Data: Bank account number, IFSC code, or UPI ID for daily earnings settlements."
      ]
    },
    {
      id: "continuous-telematics",
      number: "2",
      title: "Real-Time GPS Location & Dispatching",
      paragraphs: [
        "While logged into the Partner App in 'On-Duty' status, your GPS location is captured in the foreground and background to dispatch nearby ride requests, compute accurate trip routes, and ensure safety during active trips."
      ]
    },
    {
      id: "regulatory-retention",
      number: "3",
      title: "Data Storage & Retention",
      paragraphs: [
        "In compliance with applicable motor vehicle, tax, and IT regulations, partner KYC details, trip history, and payout records are securely retained as required by law."
      ]
    },
    {
      id: "partner-rights",
      number: "4",
      title: "Partner Data Rights & Support Contact",
      paragraphs: [
        "Partners may view and update their vehicle documents, bank details, and personal profile directly in the Partner App or by contacting partner support at support@riksho.com."
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
      answer: "In compliance with Indian taxation and transport record-keeping requirements, earnings and trip records are securely archived."
    }
  ]
};

// ==========================================
// 3. TERMS OF SERVICE - CUSTOMER
// ==========================================
export const webTermsCustomerTranslations: LegalDocument = {
  title: "Customer Terms of Service",
  subtitle: "Terms & Conditions Governing Rider Accounts, Bookings, Fare Calculations, Payment Methods, Safety Protocols, and Cancellations.",
  version: "Version 4.1.0",
  lastUpdated: "August 2026",
  effectiveDate: "August 2026",
  entityName: "Riksho",
  intro: [
    "Welcome to Riksho! These Customer Terms of Service (\"Terms\" or \"Agreement\") constitute an electronic contract under the Information Technology Act, 2000 and the rules framed thereunder.",
    "This document is published in accordance with Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and the Consumer Protection (E-Commerce) Rules, 2020.",
    "The Platform is owned and operated by Riksho, having its operating address at G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India.",
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
      title: "User Eligibility & Verification",
      paragraphs: [
        "The Platform is available to individuals legally competent to contract under the Indian Contract Act, 1872."
      ],
      bullets: [
        "Age: You must be at least 18 years of age.",
        "Legal Capacity: You must possess full legal capacity to enter into binding contracts.",
        "Good Standing: You must not have been previously suspended or terminated from the Platform.",
        "Mobile Number: You must register with an active Indian mobile phone number (+91)."
      ]
    },
    {
      id: "account",
      number: "3",
      title: "Account Registration & Responsibilities",
      paragraphs: [
        "You must register an Account via OTP verification. You are solely responsible for maintaining the confidentiality of your account credentials and all activities occurring under your Account."
      ],
      bullets: [
        "Single Account: Only one active account is permitted per user.",
        "Non-Transferable: You cannot transfer your Account to any third party.",
        "Breach Notification: Promptly notify Riksho at support@riksho.com upon suspecting unauthorized access."
      ]
    },
    {
      id: "services",
      number: "4",
      title: "Nature of Services & Platform Role",
      paragraphs: [
        "Riksho operates as a technology platform connecting Riders with independent third-party Driver Partners (Auto Rickshaw, Toto / E-Rickshaw, Bike Taxi, and Cargo / Parcel Delivery). Riksho does not own commercial transport vehicles and does not provide transportation services directly."
      ]
    },
    {
      id: "bookings",
      number: "5",
      title: "Ride Bookings & Navigation",
      paragraphs: [
        "When you request a ride, an upfront estimated fare is displayed. A binding trip contract is formed when an independent Driver Partner accepts your request.",
        "A complimentary waiting grace period of 5 minutes is provided at the pickup point. In-transit destination updates will automatically adjust the fare based on distance and route."
      ]
    },
    {
      id: "payments",
      number: "6",
      title: "Fares, Payments & Promotions",
      paragraphs: [
        "Fares are calculated based on base fare, distance traveled, and trip duration metrics. Dynamic adjustments may apply during peak demand or extreme weather periods.",
        "Accepted payment modes include Direct Cash to Driver, Direct UPI to Driver (via QR code / UPI apps), and Riksho Coins / Promotional promo codes."
      ]
    },
    {
      id: "cancellations",
      number: "7",
      title: "Cancellation Policy & Refunds",
      paragraphs: [
        "Riders may cancel rides free of charge within 2 minutes of booking acceptance. If a cancellation occurs after the driver has arrived or traveled significantly towards pickup, a standard cancellation fee may apply to compensate the driver.",
        "Driver-initiated cancellations never attract rider fees. Any promotional coins or eligible refunds will be restored to your account."
      ]
    },
    {
      id: "conduct",
      number: "8",
      title: "Rider Code of Conduct",
      paragraphs: [
        "Users must maintain courtesy and mutual respect at all times. Physical violence, verbal abuse, smoking, alcohol consumption, illicit substances, or damaging partner vehicles is strictly prohibited and will lead to account suspension."
      ]
    },
    {
      id: "safety",
      number: "9",
      title: "Safety Features & Emergency Support",
      paragraphs: [
        "Riksho provides 4-digit start-trip security OTPs, real-time live ride tracking, emergency contacts sharing, and emergency helpline assistance."
      ]
    },
    {
      id: "ip",
      number: "10",
      title: "Intellectual Property Rights",
      paragraphs: [
        "All software, UI designs, brand assets, logos, and trademarks remain the intellectual property of Riksho."
      ]
    },
    {
      id: "liability",
      number: "11",
      title: "Limitation of Liability & Disclaimers",
      paragraphs: [
        "The Platform is provided on an 'as-is' basis. As a technology marketplace, Riksho facilitates connections between riders and independent drivers, and our aggregate liability for any direct claim arising from a trip shall not exceed the gross fare paid for that specific trip."
      ]
    },
    {
      id: "disputes",
      number: "12",
      title: "Governing Law & Dispute Resolution",
      paragraphs: [
        "These Terms are governed by the laws of India. Any disputes arising in connection with the Platform shall be subject to the exclusive jurisdiction of the competent courts in West Bengal, India."
      ]
    }
  ],
  faqs: [
    {
      question: "How are ride fares calculated?",
      answer: "Fares are calculated using transparent base rates + distance + estimated duration. Fares are displayed upfront before you confirm your booking."
    },
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel free of charge within 2 minutes of driver assignment. After 2 minutes or upon driver arrival, a small fee may apply to compensate the driver for fuel and time."
    },
    {
      question: "How does the start-trip OTP work?",
      answer: "When a driver arrives, share the 4-digit OTP shown on your booking screen. The driver enters this into their app to verify your identity and start the ride."
    },
    {
      question: "What payment methods are supported?",
      answer: "You can pay via Direct Cash to the driver, Direct UPI payment (scanning the driver's UPI QR code), or apply Riksho Coins and promo discounts."
    }
  ]
};

// ==========================================
// 4. TERMS OF SERVICE - DRIVER / PARTNER
// ==========================================
export const webTermsPartnerTranslations: LegalDocument = {
  title: "Driver & Delivery Partner Terms of Service",
  subtitle: "Partner Agreement, Onboarding Standards, Zero/Low Commission Structure, Vehicle Compliance & Platform Obligations",
  version: "Version 4.1.0 (Partner Edition)",
  lastUpdated: "August 2026",
  effectiveDate: "August 2026",
  entityName: "Riksho",
  intro: [
    "This Partner Agreement (\"Agreement\") is entered into between Riksho (\"Riksho\", \"we\", or \"us\") and the independent driver/delivery operator (\"Driver Partner\", \"Buddy\", or \"you\").",
    "By signing up, submitting KYC documentation, and taking online trip requests on the Riksho Partner App, you agree to comply with this Agreement, our Partner Privacy Policy, and Code of Conduct."
  ],
  sections: [
    {
      id: "relationship",
      number: "1",
      title: "Independent Contractor Relationship",
      paragraphs: [
        "You expressly acknowledge and agree that your relationship with Riksho is that of an independent commercial contractor. Nothing in this Agreement creates any employer-employee, agency, or partnership relationship.",
        "You retain complete autonomy and freedom to determine when, where, and for how long you log into the Partner App and accept ride dispatches."
      ]
    },
    {
      id: "kyc-verification",
      number: "2",
      title: "Driver Partner Onboarding & KYC",
      paragraphs: [
        "To receive trip dispatches, you must upload and maintain valid government and vehicle documentation:"
      ],
      bullets: [
        "Valid Driving License (DL).",
        "Aadhaar Card or PAN Card for identity verification.",
        "Vehicle Registration Certificate (RC).",
        "Valid third-party vehicle insurance.",
        "Pollution Under Control (PUC) certificate (where applicable)."
      ]
    },
    {
      id: "vehicle-standards",
      number: "3",
      title: "Vehicle Standards & Safety",
      paragraphs: [
        "Vehicles must be maintained in clean, safe, and mechanically sound condition at all times. Electric vehicles (Toto / E-Rickshaws) must ensure adequate battery charge before accepting long trips."
      ]
    },
    {
      id: "earnings-commission",
      number: "4",
      title: "Partner Earnings & Transparent Pricing",
      paragraphs: [
        "Riksho operates on an honest, driver-first model with zero or minimal platform subscription fees. Passenger fares collected via Cash or Direct UPI are retained directly by the driver."
      ]
    },
    {
      id: "code-of-conduct",
      number: "5",
      title: "Safety & Driver Code of Conduct",
      paragraphs: [
        "Zero tolerance for driving under the influence of alcohol or drugs. Drivers must treat all passengers with courtesy, follow traffic rules, wear helmets/seatbelts, and never demand extra unmetered charges."
      ]
    },
    {
      id: "disputes",
      number: "6",
      title: "Governing Law & Dispute Resolution",
      paragraphs: [
        "This Agreement is governed by Indian law and subject to the jurisdiction of competent courts in West Bengal, India."
      ]
    }
  ],
  faqs: [
    {
      question: "How do I receive my earnings?",
      answer: "Passengers pay you directly via Cash or direct UPI scan. Online wallet balances and incentives can be withdrawn directly to your bank account or UPI ID."
    },
    {
      question: "What documents do I need to register as a Driver Partner?",
      answer: "You need a valid Driving License (DL), Vehicle Registration Certificate (RC), Insurance, PAN/Aadhaar Card, and vehicle photos."
    }
  ]
};

// ==========================================
// 5. COOKIE & TRACKING POLICY (WEB PLATFORM)
// ==========================================
export const webCookiePolicyCustomerTranslations: LegalDocument = {
  title: "Cookie & Tracking Technologies Policy",
  subtitle: "Disclosure Regarding the Utilization of Cookies, Local Storage, Session Identifiers, and Analytics Across the Riksho Web Platform under the DPDP Act, 2023 and IT Act, 2000.",
  version: "Version 4.1.0",
  lastUpdated: "August 2026",
  effectiveDate: "August 2026",
  entityName: "Riksho",
  intro: [
    "This Cookie Policy explains how Riksho (\"we\", \"us\", or \"our\") uses cookies, local browser storage, and related web technologies when you visit our website https://riksho.com or access our web portals.",
    "This Cookie Policy is to be read in conjunction with our Customer Privacy Policy and Terms of Service. By continuing to use the Riksho website, you consent to our use of cookies as described herein."
  ],
  sections: [
    {
      id: "what-are-cookies",
      number: "1",
      title: "What Are Cookies and Web Storage?",
      paragraphs: [
        "Cookies are small text files placed on your browser by websites you visit. They help make websites function securely and efficiently, remember user preferences, and provide analytical data to site operators.",
        "Riksho may also utilize HTML5 LocalStorage and SessionStorage to maintain secure session states and improve website responsiveness."
      ]
    },
    {
      id: "categories-of-cookies",
      number: "2",
      title: "Categories of Cookies We Use",
      paragraphs: [
        "We categorize cookies and tracking technologies deployed on our website into functional categories:"
      ],
      bullets: [
        "Strictly Necessary Cookies: Essential for basic website operation, security, CSRF protection, and user session management.",
        "Performance & Analytics Cookies: Gather anonymous telemetry regarding page visits, bounce rates, and navigation paths to help us improve website performance.",
        "Functional & Preference Cookies: Remember your chosen settings such as language selection and theme preferences."
      ],
      callout: "Essential Cookies: Strictly necessary cookies cannot be disabled as they are required for security and core website operation."
    },
    {
      id: "third-party-cookies",
      number: "3",
      title: "Third-Party Services",
      paragraphs: [
        "Some third-party providers integrated with our web platform may set cookies to power specialized functions:",
        "Key integrations include:"
      ],
      bullets: [
        "Mapping & Geocoding: Interactive map visualization and distance estimation.",
        "Analytics: Aggregated performance and error tracking.",
        "Content Delivery & Security: Fast page rendering and protection against DDoS attacks."
      ]
    },
    {
      id: "managing-cookie-preferences",
      number: "4",
      title: "How to Manage Cookies",
      paragraphs: [
        "You can manage your cookie preferences through your web browser settings. Most browsers allow you to view stored cookies, delete existing cookies, or block third-party cookies.",
        "Please note that disabling strictly necessary cookies may impact website functionality."
      ]
    },
    {
      id: "contact-officer",
      number: "5",
      title: "Questions & Compliance Desk",
      paragraphs: [
        "If you have questions regarding our cookie practices, please contact our Grievance Desk:",
        "Name: Sumit Shaw | Role: Chief Nodal & Grievance Redressal Officer | Email: grievance@riksho.com | Address: G744+2PV, Jalkal, Maheshtala, West Bengal 700141, India."
      ]
    }
  ],
  faqs: [
    {
      question: "What happens if I disable cookies on the Riksho website?",
      answer: "You can still view public information pages, but interactive features like saved preferences and web account login may not work properly."
    },
    {
      question: "Does Riksho sell browsing data to advertisers?",
      answer: "No. Riksho never sells or rents your browsing data to third-party advertisers."
    }
  ]
};

export const webCookiePolicyPartnerTranslations: LegalDocument = {
  ...webCookiePolicyCustomerTranslations,
  title: "Partner Portal Cookie & Telemetry Policy",
  subtitle: "Technical Protocol Governing Session State, Partner Dashboard Analytics, and Map Rendering for Driver & Delivery Partners."
};

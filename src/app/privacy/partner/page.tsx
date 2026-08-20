import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Driver & Partner Privacy Policy | Riksho",
  description: "Official Privacy Policy, Data Governance, Location Tracking and Telematics for Riksho Driver and Fleet Partners.",
};

export default function PartnerPrivacyPage() {
  return <LegalLayout type="privacy" defaultAudience="partner" />;
}

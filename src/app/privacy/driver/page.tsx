import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Driver Privacy Policy | Riksho",
  description: "Official Privacy Policy, Data Governance, Location Tracking and Telematics for Riksho Driver Partners.",
};

export default function DriverPrivacyPage() {
  return <LegalLayout type="privacy" defaultAudience="partner" />;
}

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Riksho",
  description: "Official Privacy Policy, Data Governance, Telematics and DPDP Act Compliance for Riksho Users and Driver Partners.",
};

export default function PrivacyPage() {
  return <LegalLayout type="privacy" />;
}

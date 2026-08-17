import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Riksho",
  description: "Official Terms of Service for Riders, Customers, and Driver Partners of Riksho Technologies Pvt. Ltd.",
};

export default function TermsPage() {
  return <LegalLayout type="terms" />;
}

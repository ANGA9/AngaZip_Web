import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Driver & Partner Terms of Service | Riksho",
  description: "Official Driver & Fleet Partner Agreement, Zero Commission Terms and Operating Regulations for Riksho Partners.",
};

export default function PartnerTermsPage() {
  return <LegalLayout type="terms" defaultAudience="partner" />;
}

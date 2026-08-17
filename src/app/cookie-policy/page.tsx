import { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie & Tracking Technologies Policy | Riksho",
  description: "Learn about how Riksho uses cookies, local storage, security tokens, and telemetry tracking technologies across our web platform.",
};

export default function CookiePolicyPage() {
  return <LegalLayout type="cookies" />;
}

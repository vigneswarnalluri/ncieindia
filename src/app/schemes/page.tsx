import { Metadata } from "next";
import SchemesClient from "./SchemesClient";

export const metadata: Metadata = {
  title: "Government Schemes & Student Support | NCIE India",
  description:
    "Explore genuine Central & State Government initiatives, student loans, scholarships, startup seed funds, MUDRA, Stand-Up India, Vidya Lakshmi, NSP, and innovation frameworks facilitated by NCIE India.",
  keywords: [
    "Government Schemes India",
    "Student Loan Support India",
    "National Scholarship Portal NSP",
    "Vidya Lakshmi Education Loan",
    "Startup India Seed Fund SISFS",
    "PM Mudra Yojana",
    "PMEGP Subsidy",
    "AICTE Pragati Saksham Scholarship",
    "Women Entrepreneurship WEP",
    "NCIE Schemes Facilitation"
  ],
  openGraph: {
    title: "Government Schemes & Student Support | NCIE India",
    description:
      "Comprehensive awareness & facilitation platform for Government of India student loans, scholarships, and startup support schemes.",
    url: "https://ncieindia.org/schemes",
    siteName: "NCIE India",
    type: "website",
  },
};

export default function SchemesPage() {
  return <SchemesClient />;
}

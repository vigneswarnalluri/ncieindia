import type { Metadata } from "next";
import StartupsClient from "./StartupsClient";

export const metadata: Metadata = {
  title: "Innovation & Startups Portal | National Council for Innovation & Entrepreneurship",
  description:
    "Start your innovation journey with NCIE. Submit your startup idea, access Dr. A.P.J. Abdul Kalam Startup Validation Programme, 5-stage seed grants up to ₹5 Lakh, and investor linkages up to ₹25 Crore.",
  keywords: [
    "NCIE Startups",
    "Submit Startup Idea India",
    "Dr APJ Abdul Kalam Startup Validation Programme",
    "Seed Funding 5 Lakh",
    "Investor Connect 25 Crore",
    "Student Innovation Challenges",
  ],
};

export default function StartupsPage() {
  return <StartupsClient />;
}

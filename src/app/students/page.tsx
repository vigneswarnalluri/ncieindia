import type { Metadata } from "next";
import StudentsClient from "./StudentsClient";

export const metadata: Metadata = {
  title: "Students Portal | National Council for Innovation & Entrepreneurship",
  description:
    "Explore NCIE student programmes, internships across 10 core sectors, scholarships, innovation leadership certification, and live certificate verification.",
  keywords: [
    "NCIE Students Portal",
    "Viksit Bharat Innovation Leadership Programme",
    "Student Internships India",
    "Certificate Verification",
    "Student Startup Grants",
    "Innovation Challenges",
  ],
};

export default function StudentsPage() {
  return <StudentsClient />;
}

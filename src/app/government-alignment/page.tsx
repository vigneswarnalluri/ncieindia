import type { Metadata } from "next";
import GovernmentAlignmentClient from "./GovernmentAlignmentClient";

export const metadata: Metadata = {
  title: "Government & Policy Alignment | National Council for Innovation & Entrepreneurship",
  description:
    "Explore NCIE's institutional alignment with national priorities of the Government of India, Viksit Bharat @2047, MCA, MeitY, MSME, and MSDE.",
  keywords: [
    "NCIE Policy Alignment",
    "Viksit Bharat 2047",
    "Ministry of Skill Development",
    "Ministry of MSME",
    "Ministry of Electronics and IT",
    "Ministry of Corporate Affairs",
  ],
};

export default function GovernmentAlignmentPage() {
  return <GovernmentAlignmentClient />;
}

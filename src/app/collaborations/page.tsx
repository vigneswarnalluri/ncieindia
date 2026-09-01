import type { Metadata } from "next";
import CollaborationsClient from "./CollaborationsClient";

export const metadata: Metadata = {
  title: "Institutional Collaborations & MoUs | National Council for Innovation & Entrepreneurship",
  description:
    "Explore NCIE institutional partnerships with universities, colleges, industries, R&D bodies, and NGOs. Access the official MoU registry and submit collaboration proposals.",
  keywords: [
    "NCIE Collaborations",
    "MoU Registry India",
    "University Incubation Partnerships",
    "CSR Innovation Support",
    "Campus Entrepreneurship Cells",
  ],
};

export default function CollaborationsPage() {
  return <CollaborationsClient />;
}

import type { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";

export const metadata: Metadata = {
  title: "Documents & Publications Vault | National Council for Innovation & Entrepreneurship",
  description:
    "Official repository of NCIE Detailed Project Reports (DPR), Vision 2047 documents, programme guidelines, circulars, and institutional policies.",
  keywords: [
    "NCIE Documents",
    "Detailed Project Report DPR",
    "NCIE Vision 2047 Document",
    "Programme Guidelines PDF",
    "NCIE Circulars",
  ],
};

export default function DocumentsPage() {
  return <DocumentsClient />;
}

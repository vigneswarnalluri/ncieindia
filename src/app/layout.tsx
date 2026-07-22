import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { LanguageProvider } from "@/contexts/LanguageContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ncieindia.org"),
  title: {
    default: "NCIE India | National Council for Innovation & Entrepreneurship",
    template: "%s | NCIE India",
  },
  description:
    "National Council for Innovation and Entrepreneurship (NCIE) India builds the nation's largest student startup, incubation, and collegiate chapter ecosystem aligned with Viksit Bharat 2047.",
  keywords: [
    "NCIE India",
    "National Council for Innovation and Entrepreneurship",
    "Innovation India Council",
    "NCIE Viksit Bharat 2047 Innovation Leadership Programs",
    "Student Startup Seed Funding",
    "Incubation Ecosystem India",
    "Collegiate Chapters Network",
    "Government Alignment Viksit Bharat",
    "Entrepreneurship Leadership Programs",
    "Youth Startup Incubation",
  ],
  authors: [{ name: "NCIE Secretariat", url: "https://ncieindia.org" }],
  creator: "National Council for Innovation and Entrepreneurship",
  publisher: "NCIE India",
  alternates: {
    canonical: "https://ncieindia.org",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ncieindia.org",
    title: "NCIE India | National Council for Innovation & Entrepreneurship",
    description:
      "National Council for Innovation and Entrepreneurship (NCIE) India builds the nation's largest student startup, incubation, and collegiate chapter ecosystem.",
    siteName: "NCIE India",
    images: [
      {
        url: "https://ncieindia.org/logo-new.png",
        width: 800,
        height: 600,
        alt: "NCIE India Official Crest & Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCIE India | National Council for Innovation & Entrepreneurship",
    description:
      "Building India's largest student innovation and entrepreneurship ecosystem under Viksit Bharat 2047 initiatives.",
    images: ["https://ncieindia.org/logo-new.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-white text-charcoal selection:bg-primary/10 selection:text-primary"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FQ4P91VSD4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FQ4P91VSD4');
          `}
        </Script>
      </body>
    </html>
  );
}

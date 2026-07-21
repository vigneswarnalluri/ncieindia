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
  title: "NCIE India | Council for Innovation & Entrepreneurship",
  description:
    "Building India's largest student innovation and entrepreneurship ecosystem. Fostering institutional collaboration, startup incubation, and regional chapters.",
  keywords: [
    "NCIE India",
    "Innovation",
    "Entrepreneurship",
    "Student Network",
    "Civic Tech India",
    "Startup India",
    "Institutions",
    "Hackathons",
    "Vision 2047",
  ],
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

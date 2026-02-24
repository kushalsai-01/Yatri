import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Space_Mono } from "next/font/google";
import "./globals.css";

/* ═══════════════════════════════════════════
 * Font Configuration
 * Display: Barlow Condensed — bold headings, route badges
 * Body: Barlow — readable labels and descriptions
 * Mono: Space Mono — fares, ticket IDs, numeric data
 * ═══════════════════════════════════════════ */

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "600", "700", "800"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YĀTRI — Digital Ticketing Companion",
  description:
    "A production-grade digital ticketing companion for BMTC bus conductors. Built for speed, one-handed use, and outdoor readability.",
  keywords: ["BMTC", "bus conductor", "digital ticketing", "Bangalore", "BEST"],
  openGraph: {
    title: "YĀTRI — Digital Ticketing Companion",
    description: "Speed-optimized ticketing for BMTC bus conductors",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.variable} ${barlow.variable} ${spaceMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}

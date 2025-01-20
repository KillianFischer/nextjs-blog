import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ConditionalAnalytics } from './components/ConditionalAnalytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CherryNews - Gaming News & Reviews",
  description: "Your premier source for gaming news, reviews, and tutorials",
  openGraph: {
    type: 'website',
    title: 'CherryNews - Gaming News & Reviews',
    description: 'Your premier source for gaming news, reviews, and tutorials',
    siteName: 'CherryNews',
  },
  other: {
    'google-adsense-account': 'ca-pub-9320499470430652',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AnalyticsProvider>
          <Navbar />
          {children}
          <SpeedInsights />
          <ConditionalAnalytics />
          <Footer />
          <CookieBanner />
        </AnalyticsProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ConditionalAnalytics } from './components/ConditionalAnalytics';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nerror - Gaming News & Reviews",
  description: "Your premier source for gaming news, reviews, and tutorials",
  openGraph: {
    type: 'website',
    title: 'Nerror - Gaming News & Reviews',
    description: 'Your premier source for gaming news, reviews, and tutorials',
    siteName: 'Nerror',
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          data-ad-client="ca-pub-9320499470430652"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AnalyticsProvider>
          <header>
            <Navbar />
          </header>
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

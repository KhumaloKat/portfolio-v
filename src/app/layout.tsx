import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import PremiumCursor from "@/components/ui/PremiumCursor";
import { site } from "@/data/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Khumalo Katleho",
  },
  description: site.description,
  keywords: [
    "Khumalo Katleho",
    "Computer Systems Engineering",
    "Software Development",
    "Computer Vision",
    "Machine Learning",
    "Embedded Systems",
    "Pretoria",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/p8.png",
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/p8.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="overflow-x-hidden">
          {children}
          <Analytics />
          <Footer />
        </div>
        <PremiumCursor />
      </body>
    </html>
  );
}

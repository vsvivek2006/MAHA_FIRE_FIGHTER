import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { JsonLd, generateLocalBusinessSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#0a0e17",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mahafirefighters.com"),
  title: {
    default: "Fire Hydrant and Sprinklers System Contractors In Delhi NCR | MAHA FIREFIGHTERS",
    template: "%s | MAHA FIREFIGHTERS Delhi NCR",
  },
  description: "Leading fire protection systems contractor in Delhi NCR. Turnkey fire hydrant installations, automatic sprinklers, addressable fire alarms, and certified in-house extinguisher refilling.",
  keywords: [
    "fire hydrant system Delhi NCR",
    "fire sprinkler system contractor Delhi",
    "fire fighting system contractor Noida",
    "fire alarm installation Gurgaon",
    "fire extinguisher refilling service Delhi",
    "fire safety audit Delhi NCR",
    "fire NOC contractor Delhi",
    "Maha Firefighters",
    "fire safety company Delhi NCR"
  ],
  authors: [{ name: "Maha Firefighters" }],
  creator: "Maha Firefighters",
  publisher: "Maha Firefighters",
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
    url: "https://mahafirefighters.com",
    title: "Fire Hydrant and Sprinklers System Contractors In Delhi NCR | MAHA FIREFIGHTERS",
    description: "Protect your property with certified fire fighting system experts in Delhi NCR. Turnkey installation, AMC services, and high-quality fire safety equipment.",
    siteName: "MAHA FIREFIGHTERS",
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "Maha Firefighters Fire Protection Engineering Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maha Firefighters | Fire Hydrant and Sprinklers System Contractors Delhi NCR",
    description: "Turnkey fire protection engineering, automatic sprinklers, alarms, and in-house extinguisher refilling across Delhi NCR.",
    images: ["/images/hero.webp"],
  },
  icons: {
    icon: "/images/logo.jpeg",
    shortcut: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
  alternates: {
    canonical: "https://mahafirefighters.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${inter.variable} h-full dark`} suppressHydrationWarning>
      <head>
        <JsonLd schema={localBusinessSchema} />
      </head>
      <body 
        className="min-h-full flex flex-col bg-[#0a0e17] text-gray-100 antialiased selection:bg-red-600 selection:text-white pb-14 sm:pb-0"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { RouteScrollReset } from "@/components/navigation/RouteScrollReset";
import { JsonLd, generateLocalBusinessSchema } from "@/components/seo/JsonLd";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
  description: "Leading fire protection systems contractor in Delhi NCR. Turnkey fire hydrant installations, automatic sprinklers, addressable fire alarms, and certified in-house extinguisher refilling. 15+ years, 250+ clients.",
  keywords: [
    "fire hydrant system Delhi NCR",
    "fire sprinkler system contractor Delhi",
    "fire fighting system contractor Noida",
    "fire alarm installation Gurgaon",
    "fire extinguisher refilling service Delhi",
    "fire safety audit Delhi NCR",
    "fire NOC contractor Delhi",
    "Maha Firefighters",
    "fire safety company Delhi NCR",
    "fire hydrant AMC Delhi",
    "automatic sprinkler system Noida",
    "addressable fire alarm Delhi",
    "fire extinguisher refilling Gurugram"
  ],
  authors: [{ name: "Maha Firefighters" }],
  creator: "Maha Firefighters",
  publisher: "Maha Firefighters",
  category: "Fire Safety Services",
  classification: "Fire Protection Contractor",
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
    siteName: "MAHA FIREFIGHTERS | Fire Hydrant and Sprinklers System Contractor in Delhi NCR",
    images: [
      {
        url: "https://mahafirefighters.com/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "Maha Firefighters – Fire Hydrant & Sprinkler System Contractors Delhi NCR",
        type: "image/webp",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/images/logo.png", type: "image/png", sizes: "344x344" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://mahafirefighters.com",
    languages: {
      "en-IN": "https://mahafirefighters.com",
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.6436;77.2347",
    "ICBM": "28.6436, 77.2347",
  },
};

import { siteTheme } from "@/config/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();

  const themeCss = `
    :root {
      --theme-primary: ${siteTheme.colors.primary};
      --theme-primary-hover: ${siteTheme.colors.primaryHover};
      --theme-primary-subtle: ${siteTheme.colors.primarySubtle};
      --theme-primary-border: ${siteTheme.colors.primaryBorder};
      --theme-bg-page: ${siteTheme.colors.bgPage};
      --theme-bg-topbar: ${siteTheme.colors.bgTopBar};
      --theme-bg-header: ${siteTheme.colors.bgHeader};
      --theme-bg-surface: ${siteTheme.colors.bgSurface};
      --theme-bg-surface-elevated: ${siteTheme.colors.bgSurfaceElevated};
      --theme-bg-surface-subtle: ${siteTheme.colors.bgSurfaceSubtle};
      --theme-bg-footer: ${siteTheme.colors.bgFooter};
      --theme-text-primary: ${siteTheme.colors.textPrimary};
      --theme-text-secondary: ${siteTheme.colors.textSecondary};
      --theme-text-muted: ${siteTheme.colors.textMuted};
      --theme-border-subtle: ${siteTheme.colors.borderSubtle};
      --theme-border-medium: ${siteTheme.colors.borderMedium};
      --theme-border-highlight: ${siteTheme.colors.borderHighlight};
    }
  `;

  return (
    <html lang="en-IN" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <style id="site-theme-variables" dangerouslySetInnerHTML={{ __html: themeCss }} />
        <JsonLd schema={localBusinessSchema} />
        {/* Performance: preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </head>
      <body 
        className="min-h-full flex flex-col bg-[var(--theme-bg-page)] text-[var(--theme-text-secondary)] antialiased selection:bg-[var(--theme-primary)] selection:text-white pb-14 sm:pb-0"
        suppressHydrationWarning
      >
        <RouteScrollReset />
        <ScrollProgressBar />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}

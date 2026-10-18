import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const bebasNeue = localFont({
  src: "./fonts/bebas-neue-400.woff2",
  weight: "400",
  variable: "--font-bebas",
});

const oswald = localFont({
  src: "./fonts/oswald-variable.woff2",
  weight: "300 500",
  variable: "--font-oswald",
});

const doto = localFont({
  src: "./fonts/doto-700.woff2",
  weight: "700",
  variable: "--font-dot",
  preload: false,
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-variable.woff2",
  weight: "100 800",
  variable: "--font-mono",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Advik Gupta" },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: "Advik Gupta – Blog" },
      ],
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ede8df",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${oswald.variable} ${doto.variable} ${mono.variable} antialiased`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Archivo_Black, Oswald } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const archivioBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
});

const oswald = Oswald({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advik Gupta — Professional Web Developer",
  description:
    "Advik Gupta is a professional web developer crafting high-conversion digital experiences. Specialising in Next.js, React, and modern web design.",
  keywords: [
    "web developer",
    "Advik Gupta",
    "Next.js developer",
    "React developer",
    "portfolio",
    "web design",
    "frontend developer",
  ],
  authors: [{ name: "Advik Gupta" }],
  creator: "Advik Gupta",
  robots: { index: true, follow: true },
  metadataBase: new URL("https://advikgupta.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://advikgupta.dev",
    title: "Advik Gupta — Professional Web Developer",
    description:
      "Advik Gupta is a professional web developer crafting high-conversion digital experiences.",
    siteName: "Advik Gupta",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Advik Gupta — Professional Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advik Gupta — Professional Web Developer",
    description:
      "Advik Gupta is a professional web developer crafting high-conversion digital experiences.",
    images: ["/og-image.png"],
    creator: "@advikgupta",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${archivioBlack.variable} ${oswald.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Advik Gupta",
              url: "https://advikgupta.dev",
              jobTitle: "Professional Web Developer",
              description:
                "Professional web developer crafting high-conversion digital experiences using Next.js, React, and modern web technologies.",
              sameAs: [],
              knowsAbout: [
                "Web Development",
                "Next.js",
                "React",
                "Frontend Development",
                "UI/UX Design",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Advik Gupta",
              url: "https://advikgupta.dev",
              description: "Professional web developer portfolio",
            }),
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

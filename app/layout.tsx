import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Oswald } from "next/font/google";
import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { EMAIL, SOCIALS } from "@/lib/site";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const oswald = Oswald({
  weight: ["300", "400", "500"],
  variable: "--font-oswald",
  subsets: ["latin"],
});

const TITLE = "Advik Gupta";
const DESCRIPTION =
  "Advik Gupta is a full-stack developer and electronics engineering student at VIT Vellore. Go, Next.js, PostgreSQL, and the occasional biosensor.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Advik Gupta",
    "full-stack developer",
    "Go developer",
    "Next.js",
    "VIT Vellore",
    "CodeChef-VIT",
    "portfolio",
  ],
  authors: [{ name: "Advik Gupta" }],
  creator: "Advik Gupta",
  robots: { index: true, follow: true },
  metadataBase: new URL("https://advikgupta.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://advikgupta.dev",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Advik Gupta",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
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
      className={`${bebasNeue.variable} ${oswald.variable} antialiased`}
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
              email: `mailto:${EMAIL}`,
              jobTitle: "Full-Stack Developer",
              description: DESCRIPTION,
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Vellore Institute of Technology",
              },
              sameAs: SOCIALS.map((s) => s.href),
              knowsAbout: [
                "Go",
                "Next.js",
                "React",
                "PostgreSQL",
                "Redis",
                "System Design",
                "Application Security",
              ],
            }),
          }}
        />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

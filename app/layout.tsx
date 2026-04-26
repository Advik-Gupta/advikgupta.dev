import type { Metadata } from "next";
import { Bebas_Neue, Archivo_Black, Oswald } from "next/font/google";
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
  title: "Advik Gupta — Web Developer",
  description: "Personal portfolio of Advik Gupta, professional web developer.",
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
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sekolahdigitalbisnis.com"),
  title: "SDBI - Sekolah Digital Bisnis Indonesia | Digital Marketing Agency",
  description:
    "Your Strategic Growth & Digital Transformation Partner untuk Perusahaan, Institusi, dan Organisasi di Indonesia.",
  openGraph: {
    title: "SDBI - Sekolah Digital Bisnis Indonesia",
    description:
      "Your Strategic Growth & Digital Transformation Partner untuk Perusahaan, Institusi, dan Organisasi di Indonesia.",
    url: "https://sekolahdigitalbisnis.com",
    siteName: "SDBI",
    images: [{ url: "/hero-images/hero-slide-1.webp", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDBI - Sekolah Digital Bisnis Indonesia",
    description:
      "Your Strategic Growth & Digital Transformation Partner untuk Perusahaan, Institusi, dan Organisasi di Indonesia.",
    images: ["/hero-images/hero-slide-1.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

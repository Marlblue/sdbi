import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
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
      data-scroll-behavior="smooth"
    >
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MNVVRML5');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNVVRML5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AppProvider from "@/components/providers/AppProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raghuls.dev"),
  title: {
    default: "Raghul S | Founding Engineer @ Velt",
    template: "%s | Raghul S",
  },
  description:
    "Raghul S is a Founding Software Engineer at Velt, dedicated to innovation and transformation through the boundless possibilities of technology.",
  authors: [{ name: "Raghul S", url: "https://raghuls.dev" }],
  keywords: [
    "Raghul S",
    "software engineer",
    "founding engineer",
    "Velt",
    "full stack",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/PortfolioLogo.png",
    apple: "/images/PortfolioLogo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raghuls.dev",
    siteName: "Raghul S",
    title: "Raghul S | Founding Engineer @ Velt",
    description:
      "Raghul S is a Founding Software Engineer at Velt, dedicated to innovation and transformation through the boundless possibilities of technology.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Raghul S — Founding Engineer @ Velt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghul S | Founding Engineer @ Velt",
    description:
      "Raghul S is a Founding Software Engineer at Velt, dedicated to innovation and transformation through the boundless possibilities of technology.",
    images: ["/opengraph-image"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AppProvider>
          <>
            <ScrollProgress />
            <NavBar />
            <main className="flex-grow mx-auto px-4 py-6 mt-16 flex w-full">
              {children}
            </main>
            <Footer />
          </>
        </AppProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

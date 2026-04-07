import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AppProvider from "@/components/providers/AppProvider";
import BuildingBanner from "@/components/Banner/BuildingBanner";
import CustomCursor from "@/components/Cursor/CustomCursor";
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
  title: "Raghul S",
  description: "A website to know me better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href={"/images/PortfolioLogo.png"} sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AppProvider>
          <>
            <CustomCursor />
            <ScrollProgress />
            <BuildingBanner />
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

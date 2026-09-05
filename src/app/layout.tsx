import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomTab from "@/components/layout/BottomTab";
import { Providers } from "./Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Flowers Champ – Premium Floral Boutique",
  description: "Luxury bouquets, wedding florals, unique gifts and same-day delivery – crafted with love, just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomTab />
        </Providers>
      </body>
    </html>
  );
}

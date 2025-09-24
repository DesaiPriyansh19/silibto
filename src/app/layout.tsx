import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./NavBar";
import PageTransitionProvider from "@/components/PageTransitionProvider";


const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Silibto - Spectacle Shop Management",
  description: "Manage multiple spectacle shops efficiently with our custom solution.",
  keywords: ["spectacle shop", "multi-shop management", "inventory", "dashboard", "Next.js"],
  authors: [{ name: "tech tycoons", url: "https://yourwebsite.com" }],
  creator: "tech tycoons",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased flex flex-col min-h-screen`}>
        <header>
          <Navbar />
        </header>

        {/* Wrap pages in client-side transitions */}
        <PageTransitionProvider>
          {children}
          </PageTransitionProvider>

        <footer>{/* Footer goes here */}</footer>
      </body>
    </html>
  );
}

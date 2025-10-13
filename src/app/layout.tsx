// layout.tsx - SERVER COMPONENT
// layout.tsx
import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import ClientWrapper from "./ClientWrapper";
import { Toaster } from "react-hot-toast"; // <-- import toaster

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Silibto - Spectacle Shop Management",
  description: "Manage multiple spectacle shops efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased flex flex-col min-h-screen`}>
        <ClientWrapper>
          <PageTransitionProvider>
            {children}
            <Toaster position="top-right" reverseOrder={false} /> {/* add toaster */}
          </PageTransitionProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}

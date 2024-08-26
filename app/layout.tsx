import SessionWrapper from "@/components/SessionWrapper";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bitsol - Registration",
  description: "Generated by Bitsol technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="hidden md:block w-1/2">
            <Sidebar />
          </div>
          <SessionWrapper>
            <main className="w-full md:w-1/2">{children}</main>
          </SessionWrapper>
        </div>
      </body>
    </html>
  );
}

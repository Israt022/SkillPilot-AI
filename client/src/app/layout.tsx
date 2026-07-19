import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/component/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from '@/component/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillPilot AI — Your Agentic Learning Copilot",
  description:
    "SkillPilot AI is a modern agentic AI platform that helps you learn, grow, and master new skills with intelligent AI guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <AuthProvider> */}
        <Navbar />
        {children}
        <Footer />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}

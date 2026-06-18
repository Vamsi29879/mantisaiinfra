import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mantis AI — Agentic Operating System for Independent Businesses",
  description:
    "Mantis AI is the agentic OS that helps independent businesses predict demand, optimize inventory and pricing, manage operations, and reduce waste. One conversational AI teammate that connects to your existing tools, learns your reality, and keeps humans in control. Optional private on-prem deployment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

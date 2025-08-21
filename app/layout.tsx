
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from '@/src/components/Layout/MainLayout'; // Import MainLayout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Powered Portfolio",
  description: "An AI-powered portfolio with a self-learning career coach chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

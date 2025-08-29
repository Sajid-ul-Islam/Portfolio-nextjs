import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sajid Islam - Portfolio | Data Analyst & Full Stack Developer",
  description: "Portfolio of Sajid Islam - Experienced Data Analyst and Full Stack Developer specializing in React, Next.js, Python, and Business Intelligence. View my projects, experience, and skills.",
  keywords: "Sajid Islam, Data Analyst, Full Stack Developer, React, Next.js, Python, Portfolio, Business Intelligence",
  authors: [{ name: "Sajid Islam" }],
  creator: "Sajid Islam",
  openGraph: {
    title: "Sajid Islam - Portfolio",
    description: "Data Analyst & Full Stack Developer Portfolio",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google"; // For Bengali excellence
import "./globals.css";
import VSCodeShell from "./components/vscode/VSCodeShell";
import { siteMeta } from "./data/portfolio";

const tiroBangla = Tiro_Bangla({
  weight: "400",
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
});

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tiroBangla.variable}`}>
      <body className="antialiased font-mono">
        <VSCodeShell>{children}</VSCodeShell>
      </body>
    </html>
  );
}

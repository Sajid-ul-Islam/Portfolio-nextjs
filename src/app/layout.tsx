import type { Metadata } from "next";
import { Tiro_Bangla, Inter } from "next/font/google"; // For Bengali and modern sans-serif excellence
import "./globals.css";
import VSCodeShell from "./components/vscode/VSCodeShell";
import TitleStatus from "./components/TitleStatus";
import { siteMeta } from "./data/portfolio";
import { ThemeProvider } from "./lib/themeContext";
import { AccentProvider } from "./lib/accentContext";

const tiroBangla = Tiro_Bangla({
  weight: "400",
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={`${tiroBangla.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.icons8.com" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <AccentProvider>
              <TitleStatus />
              <VSCodeShell>{children}</VSCodeShell>
            </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );

}

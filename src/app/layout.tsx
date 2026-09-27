import type { Metadata } from "next";
import { Tiro_Bangla, Inter } from "next/font/google"; // For Bengali and modern sans-serif excellence
import "./globals.css";
import VSCodeShell from "./components/vscode/VSCodeShell";
import TitleStatus from "./components/TitleStatus";
import { siteMeta } from "./data/portfolio";
import { ThemeProvider } from "./lib/themeContext";
import { AccentProvider } from "./lib/accentContext";
import { IconProvider } from "./lib/iconContext";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sajid-ul-islam.vercel.app/#person",
      "name": "Sajid Islam",
      "jobTitle": "Co-Founder @ CybrCraft | Forward Deployed Engineer & Solutions Architect",
      "url": "https://sajid-ul-islam.vercel.app",
      "sameAs": [
        "https://www.linkedin.com/in/sajidislamchowdhury/",
        "https://github.com/Sajid-ul-Islam",
        "https://cybrcraft.com/",
        "https://huggingface.co/Sajid-ul-Islam"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "CybrCraft",
        "url": "https://cybrcraft.com/"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://cybrcraft.com/#organization",
      "name": "CybrCraft",
      "url": "https://cybrcraft.com/",
      "logo": "https://cybrcraft.com/favicon.ico",
      "description": "Software Solutions, Custom Web Apps, E-Commerce, LMS, and Business Automation Engineering."
    },
    {
      "@type": "WebSite",
      "@id": "https://sajid-ul-islam.vercel.app/#website",
      "url": "https://sajid-ul-islam.vercel.app",
      "name": "Sajid Islam — Interactive VS Code Portfolio",
      "publisher": {
        "@id": "https://sajid-ul-islam.vercel.app/#person"
      }
    }
  ]
};

import { AestheticProvider } from "./lib/aestheticContext";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <AccentProvider>
            <IconProvider>
              <AestheticProvider>
                <TitleStatus />
                <VSCodeShell>{children}</VSCodeShell>
              </AestheticProvider>
            </IconProvider>
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

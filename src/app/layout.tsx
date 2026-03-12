import type { Metadata } from "next";
import "./globals.css";
import VSCodeShell from "./components/vscode/VSCodeShell";
import { siteMeta } from "./data/portfolio";

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
    <html lang="en">
      <body>
        <VSCodeShell>{children}</VSCodeShell>
      </body>
    </html>
  );
}

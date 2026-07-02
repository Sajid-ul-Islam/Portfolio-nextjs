import type { Metadata } from "next";
import { Tiro_Bangla, Inter } from "next/font/google"; // For Bengali and modern sans-serif excellence
import "./globals.css";
import VSCodeShell from "./components/vscode/VSCodeShell";
import { siteMeta } from "./data/portfolio";
import { ThemeProvider } from "./lib/themeContext";

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
        <style dangerouslySetInnerHTML={{
          __html: `
          :root[data-theme="vscode-dark"] {
            --vscode-editor-background: #1e1e1e;
            --vscode-sideBar-background: #252526;
            --vscode-activityBar-background: #333333;
            --vscode-border: #444444;
            --vscode-titleBar-activeBackground: #323233;
            --vscode-tab-inactiveBackground: #2d2d2d;
            --vscode-tab-activeBackground: #1e1e1e;
          }
          :root[data-theme="vscode-light"] {
            --vscode-editor-background: #ffffff;
            --vscode-sideBar-background: #f3f3f3;
            --vscode-activityBar-background: #2c2c2c;
            --vscode-border: #e4e4e4;
            --vscode-titleBar-activeBackground: #dddddd;
            --vscode-titleBar-activeForeground: #333333;
            --vscode-tab-inactiveBackground: #ececec;
            --vscode-tab-activeBackground: #ffffff;
            --vscode-text-primary: #333333;
            --vscode-text-secondary: #666666;
          }
          :root[data-theme="dracula"] {
            --vscode-editor-background: #282a36;
            --vscode-sideBar-background: #21222c;
            --vscode-activityBar-background: #191a21;
            --vscode-border: #191a21;
            --vscode-titleBar-activeBackground: #21222c;
            --vscode-tab-inactiveBackground: #21222c;
            --vscode-tab-activeBackground: #282a36;
          }
          :root[data-theme="monokai"] {
            --vscode-editor-background: #272822;
            --vscode-sideBar-background: #1e1f1c;
            --vscode-activityBar-background: #272822;
            --vscode-border: #1e1f1c;
            --vscode-titleBar-activeBackground: #1e1f1c;
            --vscode-tab-inactiveBackground: #1e1f1c;
            --vscode-tab-activeBackground: #272822;
          }
        `}} />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <VSCodeShell>{children}</VSCodeShell>
        </ThemeProvider>
      </body>
    </html>
  );

}

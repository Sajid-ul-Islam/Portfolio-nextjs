import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google"; // For Bengali excellence
import "./globals.css";
import VSCodeShell from "./components/vscode/VSCodeShell";
import { siteMeta } from "./data/portfolio";
import { ThemeProvider } from "./lib/themeContext";

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
    <html lang="en" className={`${tiroBangla.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          :root[data-theme="vscode-dark"] {
            --vscode-editor-background: #1e1e1e; /* Dark theme editor background */
            --vscode-sideBar-background: #252526; /* Dark theme sidebar background */
            --vscode-activityBar-background: #333333; /* Dark theme activity bar background */
            --vscode-border: #444444; /* Dark theme border color */
            --vscode-titleBar-activeBackground: #323233; /* Dark theme title bar active background */
            --vscode-tab-inactiveBackground: #2d2d2d; /* Dark theme inactive tab background */
            --vscode-tab-activeBackground: #1e1e1e; /* Dark theme active tab background */
          }
          :root[data-theme="vscode-light"] {
            --vscode-editor-background: #ffffff; /* Light theme editor background */
            --vscode-sideBar-background: #f3f3f3; /* Light theme sidebar background */
            --vscode-activityBar-background: #2c2c2c; /* Light theme activity bar background */
            --vscode-border: #e4e4e4; /* Light theme border color */
            --vscode-titleBar-activeBackground: #dddddd; /* Light theme title bar active background */
            --vscode-titleBar-activeForeground: #333333; /* Light theme title bar active foreground */
            --vscode-tab-inactiveBackground: #ececec; /* Light theme inactive tab background */
            --vscode-tab-activeBackground: #ffffff; /* Light theme active tab background */
            --vscode-text-primary: #333333; /* Light theme primary text color */
            --vscode-text-secondary: #666666; /* Light theme secondary text color */
          }
          :root[data-theme="dracula"] {
            --vscode-editor-background: #282a36; /* Dracula theme editor background */
            --vscode-sideBar-background: #21222c; /* Dracula theme sidebar background */
            --vscode-activityBar-background: #191a21; /* Dracula theme activity bar background */
            --vscode-border: #191a21; /* Dracula theme border color */
            --vscode-titleBar-activeBackground: #21222c; /* Dracula theme title bar active background */
            --vscode-tab-inactiveBackground: #21222c; /* Dracula theme inactive tab background */
            --vscode-tab-activeBackground: #282a36; /* Dracula theme active tab background */
          }
          :root[data-theme="monokai"] {
            --vscode-editor-background: #272822; /* Monokai theme editor background */
            --vscode-sideBar-background: #1e1f1c; /* Monokai theme sidebar background */
            --vscode-activityBar-background: #272822; /* Monokai theme activity bar background */
            --vscode-border: #1e1f1c; /* Monokai theme border color */
            --vscode-titleBar-activeBackground: #1e1f1c; /* Monokai theme title bar active background */
            --vscode-tab-inactiveBackground: #1e1f1c; /* Monokai theme inactive tab background */
            --vscode-tab-activeBackground: #272822; /* Monokai theme active tab background */
          }
        `}} />
      </head>
      <body className="antialiased font-mono">
        <ThemeProvider>
          <VSCodeShell>{children}</VSCodeShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

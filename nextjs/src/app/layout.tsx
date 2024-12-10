import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site-config";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

import { type Metadata } from "next";


import { Cairo } from 'next/font/google'
const cairo = Cairo({ subsets: ['latin', "arabic"],
    weight: ["200", "300", "400", "500", "700", "800", "900"],
 })


export const metadata: Metadata = {
  ...siteConfig,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" className={`${cairo.className}`} dir="rtl">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local"
import { ThemeProvider } from "@/components/providers/ThemeProvider";
const iansuiFont = localFont({src: './font/Iansui-Regular.ttf'})

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "山谷 | The Vale",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${iansuiFont.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Footer className="w-full py-16 px-8" />
        </ThemeProvider>
      </body>
    </html>
  );
}

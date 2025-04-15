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
  metadataBase: new URL("https://thevale.top"),
  title: "山谷｜The Vale",
  description: "匿名抒發心聲的平台。分享低語，傾聽靜谷心聲與星光回聲，尋找共鳴與溫暖。",
  openGraph: {
    title: "山谷｜The Vale",
    description: "匿名抒發心聲的平台。分享低語，傾聽靜谷心聲與星光回聲，尋找共鳴與溫暖。",
    url: "https://thevale.top",
    siteName: "山谷｜The Vale",
  }
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
          <hr />
          <Footer className="w-full py-16 px-8" />
        </ThemeProvider>
      </body>
    </html>
  );
}

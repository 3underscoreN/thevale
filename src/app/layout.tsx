import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";



const iansuiFont = localFont({src: './font/Iansui-Regular.ttf'})

export const metadata: Metadata = {
  title: "山谷",
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
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local"
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import { Toaster } from "sonner";

import Image from "next/image";
import Link from "next/link";

import { getTranslations } from "next-intl/server";

import { NextIntlClientProvider } from 'next-intl';

const iansuiFont = localFont({ src: '../../../public/font/Iansui-Regular.ttf' })

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) : Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL("https://thevale.top"),
    title: t('title'),
    icons: {
      icon: "/icon/vale.svg",
      shortcut: "/icon/vale.svg",
      apple: "/icon/vale.svg",
    },
    description: t('description'),
    openGraph: {
      type: "website",
      locale: locale,
      title: t('title'),
      description: t('description'),
      url: "https://thevale.top",
      siteName: t('title'),
      images: [{
        url: `/og/og_social_${locale}.png`,
        width: 1280,
        height: 640,
        alt: t('title'),
        type: "image/png",
      }],
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning>
      <body className={`${iansuiFont.className} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Toaster expand visibleToasts={1} />
            <div className="relative" aria-hidden="false">
              <div className="absolute top-4 left-4 md:top-8 md:left-16 z-2">
                <Link href="/">
                  <Image
                    src="/icon/vale.svg"
                    alt="The Vale logo"
                    width={80}
                    height={80}
                    className="rounded-full invert-75"
                    priority
                  />
                </Link>
              </div>
            </div>
            <main role="main">
              {children}
            </main>
            <hr />
            <Footer className="w-full p-8 bg-black" aria-hidden="false" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

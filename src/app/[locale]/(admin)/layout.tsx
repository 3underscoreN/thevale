import React from 'react';

import { Button } from '@/components/ui/button';

import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn
} from '@clerk/nextjs'

import { Toaster } from '@/components/ui/sonner';

import { zhTW } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/types';

import { getTranslations } from 'next-intl/server';

import { dark } from '@clerk/themes';

export default async function AdminLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  let localization: LocalizationResource | undefined;
  if (locale === 'zh') {
    localization = zhTW;
  }

  const t = await getTranslations('Admin')

  return (
    <ClerkProvider localization={localization} appearance={{ baseTheme: dark }} >
      <SignedOut>
        <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center" tabIndex={-1}>
          <div className="flex flex-col items-center justify-start px-4 py-16 backdrop-blur-md backdrop-brightness-50 min-h-svh">
            <h1 className="text-4xl font-bold mt-16 mb-8">{t('SignedOut.title')}</h1>
            <p className="text-lg mb-8">{t('SignedOut.subtitle')}</p>
            <hr className="my-8" />
            <div className="flex flex-col items-center justify-center w-full md:w-3/4">
              <SignInButton mode="modal">
                <Button variant="outline" className="hover:cursor-pointer">
                  {t('SignedOut.login')}
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="absolute top-4 right-4 md:top-8 md:right-16 z-2">
          <SignOutButton>
            <Button variant="outline" className="hover:cursor-pointer">
              {t('SignedIn.logout')}
            </Button>
          </SignOutButton>
        </div>
        <Toaster />
        <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center" tabIndex={-1}>
          {children}
        </div>
      </SignedIn>
    </ClerkProvider>
  );
}
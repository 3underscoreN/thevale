import React from "react";

import { Toaster } from '@/components/ui/sonner';

export default function ViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center" tabIndex={-1}>
      <Toaster />
      {children}
    </div>
  );
}
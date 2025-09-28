import React from "react";

export default function ViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed left-0 top-0 -z-1 w-svw h-svh bg-[url(/asset/background.jpg)] bg-cover bg-no-repeat bg-center blur-md brightness-50" tabIndex={-1} />
      <div className="z-0 w-full h-full px-4 py-16">
        {children}
      </div>
      {/* <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center" tabIndex={-1} />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-3xl px-4 py-8">
          {children}
        </div>
        <Toaster richColors />
      </div> */}
    </>
  );
}
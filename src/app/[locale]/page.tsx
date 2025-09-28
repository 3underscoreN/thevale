"use client"

import WelcomeText from "@/components/WelcomeText";
import './page.css'

import BentoGridMenu from "@/components/BentoGridMenu";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ListText } from "@/components/RichTextRenderer";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("LandingPage.Introduction");

  const [ isCookiesDisplayed, setIsCookiesDisplayed ] = useState<boolean>(true);
  const tc = useTranslations("Cookies");

  useEffect(() => {
    setIsCookiesDisplayed(localStorage.getItem('isCookiesDisplayed') === 'true');
    if (!isCookiesDisplayed) {
      toast(<ListText>{(tags) => tc.rich('message', tags)}</ListText>, {
        action: {
          label: tc('accept'),
          onClick: () => {toast.dismiss()},
        },
        duration: Infinity,
        richColors: true,
        invert: true,
      });
      setIsCookiesDisplayed(true);
      localStorage.setItem('isCookiesDisplayed', 'true')
    }
  }, [tc, isCookiesDisplayed]);

  return (
    <>
      <div className="static w-full h-svh">
        <div className="absolute top-0 left-0 background-mountain" />
        <div className="absolute top-0 left-0 foreground-mountain" />
        <div className="absolute top-3/12 left-0 w-full">
          <div className="flex w-full justify-center">
            <WelcomeText />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="flex flex-col gap-2 md:gap-8 text-center overflow-clip text-xl md:text-2xl justify-center w-full">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
          <p>{t("p5")}</p>
          <p>{t("p6")}</p>
          <p>{t("p7")}</p>
        </div>
      </div>
      <hr />
      <div className="section">
        <BentoGridMenu />
      </div>
    </>
  );
}

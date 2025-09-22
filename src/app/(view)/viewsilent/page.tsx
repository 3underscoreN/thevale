"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { useTranslations } from "next-intl";

import ViewCards from "@/components/ViewCards";

export default function ViewPage() {
  const t = useTranslations("ViewPage");

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">{t("Silent.title")}</h1>
        <p className="text-lg text-center mb-8">{t("Silent.subtitle")}</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {t("Rules.title")}
            </CardTitle>
            <CardDescription className="text-md">
              <ol className="list-decimal list-inside space-y-4">
                <li>{t("Rules.r1")}</li>
                <li>{t("Rules.r2")}</li>
                <li>{t("Rules.r3")}</li>
              </ol>
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="my-8 w-full md:w-3/4">
          <ViewCards id={0} cardType="silent"/>
        </div>
      </div>
    </>
  );
}

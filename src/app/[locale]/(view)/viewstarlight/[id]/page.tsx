"use server";

import ViewCards from "@/components/ViewCards";

import ViewCardsReplyForm from "@/components/ViewCards/ViewCardsReplyForm";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

import { getTranslations } from "next-intl/server";

export default async function Page(params: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params.params;
  // const data = await res.json();
  const t = await getTranslations("ViewPage");

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-16 mb-8 w-full md:w-3/4">
        <Button variant="outline" asChild>
          <Link href="/viewsilent">
            <span className="text-md">
              <FontAwesomeIcon icon={faArrowLeft} />&nbsp;{t("Starlight.backToViewAll")}
            </span>
          </Link>
        </Button>
        <Card className="my-8">
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
        <hr />
        <ViewCards cardType="starlight" id={parseInt(id, 10)} locale={locale} isReply />
        <ViewCardsReplyForm cardType="starlight" cardId={parseInt(id, 10)} className="my-4" locale={locale} />
      </div>
    </div>
  );
}
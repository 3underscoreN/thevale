import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParagraphText, SpecialThanksText } from "@/components/RichTextRenderer";

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">{t("title")}</h1>
        <p className="text-lg text-center mb-8">{t("desc")}</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {t("Content.WordsFromDev.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ParagraphText>{(tags) => t.rich("Content.WordsFromDev.content", tags)}</ParagraphText>
            <div className="flex flex-col my-4 mx-4">
              <span className="text-md font-semibold text-right">3_n</span>
              <span className="text-sm text-right">{t("Content.WordsFromDev.lastUpdated")}</span>
            </div>
          </CardContent>
          <hr />
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {t("Content.SpecialThanks.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SpecialThanksText>{(tags) => t.rich("Content.SpecialThanks.content", tags)}</SpecialThanksText>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
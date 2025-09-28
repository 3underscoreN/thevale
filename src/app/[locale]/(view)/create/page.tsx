import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import CommentForm from "@/components/CommentForm";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { ListText } from "@/components/RichTextRenderer";

import { getTranslations } from "next-intl/server";

/**
 * This page is for creating a new post.
 */
export default async function CreatePage(params: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("CreatePage");
  const { locale } = await params.params;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">{t("title")}</h1>
        <p className="text-lg text-center mb-8">{t("subtitle")}</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {t("Rules.title")}
            </CardTitle>
            <CardDescription className="text-md">
              <ListText>{(tags) => t.rich("Rules.rules", tags)}</ListText>
              <p className="text-md mt-4">
                {t.rich("Rules.help", {
                  guide: (chunk) =>
                    <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
                      <Link href="/helpline">
                        {chunk}
                      </Link>
                    </Button>
                })}
              </p>
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent>
            <CommentForm locale={locale} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import CommentForm from "@/components/CommentForm";

import Link from "next/link";

import { useTranslations } from "next-intl";

/**
 * This page is for creating a new post.
 */
export default function CreatePage() {
  const t = useTranslations("CreatePage");

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
              <ol className="list-decimal list-inside space-y-4">
                <li><span className="font-semibold">{t("Rules.R1.title")}</span>{t("Rules.R1.desc")}</li>
                <li><span className="font-semibold">{t("Rules.R2.title")}</span>{t("Rules.R2.desc")}</li>
                <li><span className="font-semibold">{t("Rules.R3.title")}</span>{t("Rules.R3.desc")}</li>
                <li><span className="font-semibold">{t("Rules.R4.title")}</span>{t("Rules.R4.desc")}</li>
                <li><span className="font-semibold">{t("Rules.R5.title")}</span>{t("Rules.R5.desc")}</li>
              </ol>
              <p className="text-md mt-4">{t("Rules.Help.beforeLink")}
                <Link href="/helpline" className="text-blue-300 hover:underline">
                  {t("Rules.Help.linkText")}
                </Link>
                {t("Rules.Help.afterLink")}
              </p>
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent>
            <CommentForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
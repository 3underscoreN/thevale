import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

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
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p1")}
            </p>
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p2")}
            </p>
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p3")}
            </p>
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p4")}
            </p>
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p5")}
            </p>
            <p>
              {t("Content.WordsFromDev.P6.beforeLink")}
                <Link href="https://www.befrienders-jpn.org/tegami" className="text-blue-300 hover:underline">{t("Content.WordsFromDev.P6.linkText")}</Link>
              {t("Content.WordsFromDev.P6.afterLink")}
            </p>
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p7")}
            </p>
            <p className="my-4 text-md">
              {t("Content.WordsFromDev.p8")}
            </p>
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
            <ul className="space-y-4">
              <li>
                <h2 className="text-lg font-semibold">
                  <Link href="https://twitter.com/iaramallows" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                    {t("Content.SpecialThanks.List.Iara.name")}
                  </Link>
                </h2>
                <p className="text-md text-gray-300">
                  {t("Content.SpecialThanks.List.Iara.desc")}
                </p>
              </li>
              <li>
                <h2 className="text-lg font-semibold">
                  <Link href="https://www.facebook.com/happy.chiiwawa" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                    {t("Content.SpecialThanks.List.Chiiwawa.name")}
                  </Link>
                </h2>
                <p className="text-md text-gray-300">
                  {t("Content.SpecialThanks.List.Chiiwawa.Desc.d1")}<br />
                  {t("Content.SpecialThanks.List.Chiiwawa.Desc.d2")}<br />
                </p>
              </li>
              <li>
                <h2 className="text-lg font-semibold">
                  <Link href="https://smkpdl58.top/" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                    {t("Content.SpecialThanks.List.Smoking.name")}
                  </Link>
                </h2>
                <p className="text-md text-gray-300">
                  {t("Content.SpecialThanks.List.Smoking.desc")}
                </p>
              </li>
              <li>
                <h2 className="text-lg font-semibold">
                  {t("Content.SpecialThanks.List.Friends.name")}
                </h2>
                <p className="text-md text-gray-300">
                  {t("Content.SpecialThanks.List.Friends.Desc.d1")}<br />
                  {t("Content.SpecialThanks.List.Friends.Desc.d2")}
                </p>
              </li>
              <li>
                <h2 className="text-lg font-semibold">
                  {t("Content.SpecialThanks.List.Everyone.name")}
                </h2>
                <p className="text-md text-gray-300">
                  {t("Content.SpecialThanks.List.Everyone.Desc.d1")}<br />
                  {t("Content.SpecialThanks.List.Everyone.Desc.d2")}
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
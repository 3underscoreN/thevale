import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PrivacyText } from "@/components/RichTextRenderer";

import { useTranslations } from 'next-intl';

export default function Privacy() {
  const t = useTranslations('Privacy');

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">{t('title')}</h1>
        <p className="text-lg text-center mb-8">{t('subtitle')}</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {t('Content.title')}
            </CardTitle>
            <CardDescription className="text-md">
              <p className="text-md mt-4">{t('Content.lastUpdated')}</p>
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent className="text-md space-y-4">
            <PrivacyText>{(tags) => t.rich('Content.content', tags)}</PrivacyText>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
import { NextRequest, NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';

import { z } from 'zod';

const helplineSchema = z.object({
  region: z.string().default("other"),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export async function GET(request: NextRequest) {
  
  const searchParams = request.nextUrl.searchParams;

  const parsedData = helplineSchema.safeParse({
    region: searchParams.get('region'),
    locale: searchParams.get('locale'),
  });

  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      error: z.treeifyError(parsedData.error),
      data: null,
    }, { status: 400 });
  }
  const { locale } = parsedData.success ? parsedData.data : { locale: routing.defaultLocale };

  const data = await import(`@/messages/${locale}/helplines_${locale}.json`);

  const dataMap = new Map(Object.entries(data));

  const { region } = parsedData.data;

  const resultant = dataMap.get(region) ?? dataMap.get("other");

  return NextResponse.json(resultant);
}
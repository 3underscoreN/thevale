import { NextRequest, NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';

import z from 'zod';

const regionSchema = z.object({
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;

  const parsedData = regionSchema.safeParse({
    locale: searchParams.get('locale'),
  });

  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      error: z.treeifyError(parsedData.error),
      data: null,
    }, { status: 400 });
  }

  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      error: 'Error parsing parameters.',
      data: null,
    });
  }

  const { locale } = parsedData.data;

  const data = await import(`@/messages/helplines_${locale}.json`);

  const keys = Object.keys(data);

  return NextResponse.json({
    success: true,
    error: null,
    data: keys
      .filter((key) => key !== "default")
      .map((key) => ({
        "region": key,
        "name": data[key].name,
      })
    ),
  });
}
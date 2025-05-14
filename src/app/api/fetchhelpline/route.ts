import { NextRequest, NextResponse } from 'next/server';

import data from './helplines.json';

import { z } from 'zod';

const helplineSchema = z.object({
  region: z.string().default("other"),
});

export async function GET(request: NextRequest) {
  const dataMap = new Map(Object.entries(data));
  const searchParams = request.nextUrl.searchParams;

  const parsedData = helplineSchema.safeParse({
    region: searchParams.get('region')
  });

  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      error: parsedData.error.format(),
      data: null,
    });
  }

  const { region } = parsedData.data;

  const resultant = dataMap.get(region) ?? dataMap.get("other");

  return NextResponse.json(resultant);
}
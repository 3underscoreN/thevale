import { NextRequest, NextResponse } from 'next/server';

import data from './helplines.json';

export async function GET(request: NextRequest) {
  const dataMap = new Map(Object.entries(data));
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get('region') ?? "other";

  const resultant = dataMap.get(region) ?? dataMap.get("other");

  return NextResponse.json(resultant);
}
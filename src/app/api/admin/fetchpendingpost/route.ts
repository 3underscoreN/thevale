import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/app/api/sql";

import { routing } from "@/i18n/routing";

import { z } from "zod";

const ItemSchema = z.object({
  fetchType: z.enum(["silent", "starlight"]),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const { fetchType, locale } = ItemSchema.parse({
    fetchType: searchParams.get("fetchType"),
    locale: searchParams.get("locale"),
  });

  const table = sql`${sql.unsafe(`${fetchType}_comments_${locale}`)}`;

  const data = await sql`
    SELECT id, name, content, created_at, reply_count FROM ${table}
    WHERE status = 'pending'
    ORDER BY created_at ASC;
  `;

  return NextResponse.json({
    success: true,
    data: data,
  });
}
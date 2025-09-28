import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/app/api/sql";

import { z } from "zod";

import { routing } from "@/i18n/routing";

const PAGE_SIZE = 10;

const fetchPostSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  fetchType: z.enum(["silent", "starlight"]),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

function normalizePage(inputPage: number | null, totalPages: number): number {
  if (totalPages <= 0) {
    return 1;
  }
  if (!inputPage || inputPage < 1) {
    return 1;
  }
  if (inputPage > totalPages) {
    return totalPages;
  }
  return inputPage;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const fetchPostData = fetchPostSchema.safeParse({
    page: searchParams.get("page"),
    fetchType: searchParams.get("fetchType"),
    locale: searchParams.get("locale"),
  });

  if (!fetchPostData.success) {
    return NextResponse.json({
      success: false,
      error: z.treeifyError(fetchPostData.error),
      data: null,
    }, { status: 400 });
  }

  const { page, fetchType, locale } = fetchPostData.data;

  const table = sql`${sql.unsafe(fetchType)}_comments_${sql.unsafe(locale)}`;
  const itemCount = (await sql`SELECT COUNT(*) FROM ${table} WHERE status = 'approved';`) as { count: number }[];
  const maxPage = Math.max(1, Math.ceil(itemCount[0].count / PAGE_SIZE));
  const actualPage = normalizePage(page, maxPage);
  const offset = (actualPage - 1) * PAGE_SIZE;
  const data = await sql`SELECT id, name, content, created_at, reply_count FROM ${table}
    WHERE status = 'approved'
    ORDER BY created_at DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset};`;

  return NextResponse.json({
    success: true,
    error: null,
    totalPage: maxPage,
    data: data,
  });
}
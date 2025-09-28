import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/app/api/sql";

import { z } from "zod";

import { routing } from "@/i18n/routing";

const fetchReplySchema = z.object({
  id: z.coerce.number().int().positive(),
  page: z.coerce.number().int().positive().default(1),
  fetchType: z.enum(["silent", "starlight"]),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

const PAGE_SIZE = 10;

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

  const fetchReplyData = fetchReplySchema.safeParse({
    id: searchParams.get("id"),
    page: searchParams.get("page"),
    fetchType: searchParams.get("fetchType"),
    locale: searchParams.get("locale"),
  });

  if (!fetchReplyData.success) {
    return NextResponse.json({
      success: false,
      error: z.treeifyError(fetchReplyData.error),
      data: null,
    }, { status: 400 });
  }
  const { id, page, fetchType, locale } = fetchReplyData.data;

  const parentTable = sql`${sql.unsafe(fetchType)}_comments_${sql.unsafe(locale)}`;
  const replyTable = sql`${sql.unsafe(fetchType)}_comments_replies_${sql.unsafe(locale)}`;

  const itemCount = (await sql`SELECT COUNT(*) FROM ${replyTable} WHERE status = 'approved' AND parent_id = ${id};`) as { count: number }[];
  const op = (await sql`SELECT id, name, content, created_at FROM ${parentTable} WHERE id = ${id};`)[0];
  const maxPage = Math.max(1, Math.ceil(itemCount[0].count / PAGE_SIZE));
  const actualPage = normalizePage(page, maxPage);
  const offset = (actualPage - 1) * PAGE_SIZE;
  const data = await sql`SELECT id, name, content, created_at FROM ${replyTable}
    WHERE status = 'approved'
    AND parent_id = ${id}
    ORDER BY created_at DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset};`;

  if (op === undefined) {
    return NextResponse.json({
      success: false,
      error: "The original post does not exist.",
      data: null,
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    error: null,
    totalPage: maxPage,
    data: data,
    op: op
  });
}
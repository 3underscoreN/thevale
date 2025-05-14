import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/app/api/sql";

import { Item } from "@/interfaces/item";

import { z } from "zod";

const fetchReplySchema = z.object({
  id: z.number({ coerce: true }).int().positive(),
  page: z.number({ coerce: true }).int().positive().default(1),
  fetchType: z.enum(["silent", "starlight"]),
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
  });

  if (!fetchReplyData.success) {
    return NextResponse.json({
      success: false,
      error: fetchReplyData.error.format(),
      data: null,
    }, { status: 400 });
  }
  const { id, page, fetchType } = fetchReplyData.data;

  let
    op: Record<string, Item>,
    data: Record<string, Item>[],
    maxPage: number, 
    itemCount: {count: number}[], 
    actualPage: number, 
    offset: number;
  switch (fetchType) {
    case "silent":
      itemCount = (await sql`SELECT COUNT(*) FROM silent_comments_replies WHERE status = 'approved' AND parent_id = ${id};`) as { count: number }[];
      op = (await sql`SELECT id, name, content, created_at FROM silent_comments WHERE id = ${id};`)[0];
      maxPage = Math.max(1, Math.ceil(itemCount[0].count / PAGE_SIZE));
      actualPage = normalizePage(page, maxPage);
      offset = (actualPage - 1) * PAGE_SIZE;
      data = await sql`SELECT id, name, content, created_at FROM silent_comments_replies
        WHERE status = 'approved'
        AND parent_id = ${id}
        ORDER BY created_at DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset};`;
      break;
    case "starlight":
      itemCount = (await sql`SELECT COUNT(*) FROM starlight_comments_replies WHERE status = 'approved' AND parent_id = ${id};`) as { count: number }[];
      op = (await sql`SELECT id, name, content, created_at FROM starlight_comments WHERE id = ${id};`)[0];
      maxPage = Math.max(1, Math.ceil(itemCount[0].count / PAGE_SIZE));
      actualPage = normalizePage(page, maxPage);
      offset = (actualPage - 1) * PAGE_SIZE;
      data = await sql`SELECT id, name, content, created_at FROM starlight_comments_replies
        WHERE status = 'approved'
        AND parent_id = ${id}
        ORDER BY created_at DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset};`;
      break;
  }

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
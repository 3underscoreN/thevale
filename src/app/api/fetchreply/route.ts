import { NextRequest, NextResponse } from "next/server";

import { neon } from "@neondatabase/serverless";

import Item from "@/interfaces/item";

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
  const id = parseInt(searchParams.get("id") ?? "", 10);
  const page = searchParams.get("page");
  const fetchType = searchParams.get("fetchType");
  
  if (isNaN(id)) {
    return NextResponse.json({
      success: false,
      error: "Invalid ID",
      data: null,
    });
  }

  if (fetchType !== "silent" && fetchType !== "starlight") {
    return NextResponse.json({
      success: false,
      error: "Invalid fetchType",
      data: null,
    });
  }

  const pageNumber = parseInt(page as string, 10);

  const sql = (process.env.NODE_ENV === 'production') ? 
      neon(`${process.env.DATABASE_URL}`) :
      neon(`${process.env.DATABASE_URL_DEV}`);

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
      actualPage = normalizePage(pageNumber, maxPage);
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
      actualPage = normalizePage(pageNumber, maxPage);
      offset = (actualPage - 1) * PAGE_SIZE;
      data = await sql`SELECT id, name, content, created_at FROM starlight_comments_replies
        WHERE status = 'approved'
        AND parent_id = ${id}
        ORDER BY created_at DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset};`;
      break;
  }
  return NextResponse.json({
    success: true,
    error: null,
    totalPage: maxPage,
    data: data,
    op: op
  });
}
import { NextRequest, NextResponse } from "next/server";

import { neon } from "@neondatabase/serverless";

export async function GET(request: NextRequest) {
  const PAGE_SIZE = 10;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  let pageNumber = parseInt(page as string, 10);

  const sql = (process.env.NODE_ENV === 'production') ? 
      neon(`${process.env.DATABASE_URL}`) :
      neon(`${process.env.DATABASE_URL_DEV}`);

  const MAX_PAGE_RESULT = await sql`SELECT COUNT(*) FROM comments WHERE status = 'approved' AND positivity = 'neg';`;
  const MAX_PAGE = MAX_PAGE_RESULT as { count: number }[];

  const totalPages = Math.ceil(MAX_PAGE[0].count / PAGE_SIZE);
  if (pageNumber > totalPages) {
    pageNumber = totalPages;
  }
  if (pageNumber < 1) {
    pageNumber = 1;
  }
  if (!pageNumber) {
    pageNumber = 1;
  }
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const data = await sql`SELECT * FROM comments
    WHERE status = 'approved' AND positivity = 'neg'
    ORDER BY created_at DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset};`;

  return NextResponse.json({
    success: true,
    error: null,
    totalCount: MAX_PAGE[0].count,
    data: data,
  });
}
import { NextRequest, NextResponse } from "next/server";

import { neon } from "@neondatabase/serverless";

export async function GET(request: NextRequest) {
  const PAGE_SIZE = 10;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const fetchType = searchParams.get("fetchType");
  
  if (fetchType !== "silent" && fetchType !== "starlight") {
    return NextResponse.json({
      success: false,
      error: "Invalid fetchType",
      data: null,
    });
  }

  let pageNumber = parseInt(page as string, 10);

  const sql = (process.env.NODE_ENV === 'production') ? 
      neon(`${process.env.DATABASE_URL}`) :
      neon(`${process.env.DATABASE_URL_DEV}`);

  const MAX_PAGE_RESULT = await sql`SELECT COUNT(*) FROM silent_comments WHERE status = 'approved';`;
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

  let data;
  switch (fetchType) {
    case "silent":
      data = await sql`SELECT id, name, content, created_at FROM silent_comments
        WHERE status = 'approved'
        ORDER BY created_at DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset};`;
      break;
    case "starlight":
      data = await sql`SELECT id, name, content, created_at FROM starlight_comments
        WHERE status = 'approved'
        ORDER BY created_at DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset};`;
      break;
  }
  return NextResponse.json({
    success: true,
    error: null,
    totalCount: MAX_PAGE[0].count,
    data: data,
  });
}
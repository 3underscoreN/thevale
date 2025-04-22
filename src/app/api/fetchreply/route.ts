import { NextRequest, NextResponse } from "next/server";

import { neon } from "@neondatabase/serverless";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fetchType = searchParams.get("fetchType");
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      success: false,
      error: "Missing ID parameter",
      data: null,
    }, {
      status: 400,
    });
  }

  if (fetchType !== "silent" && fetchType !== "starlight") {
    return NextResponse.json({
      success: false,
      error: "Invalid fetchType parameter",
      data: null,
    }, {
      status: 400,
    });
  }

  const sql = (process.env.NODE_ENV === 'production') ?
    neon(`${process.env.DATABASE_URL}`) :
    neon(`${process.env.DATABASE_URL_DEV}`);

  let data;
  switch (fetchType) {
    case "silent":
      data = await sql`
        SELECT id, name, content, created_at
        FROM silent_comments_replies
        WHERE id = ${id} 
        AND status = 'approved';`;
      break;

    case "starlight":
      data = await sql`
        SELECT id, name, content, created_at
        FROM starlight_comments_replies
        WHERE id = ${id} 
        AND status = 'approved';`;
  }


  return NextResponse.json({
    success: true,
    error: null,
    data: data,
  });
}
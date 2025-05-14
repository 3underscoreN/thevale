import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/app/api/sql";

import { type Item } from "@/interfaces/item";

import { z } from "zod";

const ItemSchema = z.object({
  fetchType: z.enum(["silent", "starlight"]),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const { fetchType } = ItemSchema.parse({
    fetchType: searchParams.get("fetchType"),
  });

  let data: Record<string, Item>[];

  switch (fetchType) {
    case "starlight":
      data = await sql`
        SELECT id, name, content, created_at, reply_count FROM starlight_comments
        WHERE status = 'pending'
        ORDER BY created_at ASC;`;
      break;
    case "silent":
      data = await sql`
        SELECT id, name, content, created_at, reply_count FROM silent_comments
        WHERE status = 'pending'
        ORDER BY created_at ASC;`;
      break;
  }
  return NextResponse.json({
    success: true,
    data: data,
  });
}
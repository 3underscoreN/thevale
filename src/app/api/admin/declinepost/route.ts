import { NextRequest, NextResponse } from 'next/server';

import { sql } from '@/app/api/sql';

import { z } from 'zod';

const ItemSchema = z.object({
  id: z.number(),
  type: z.enum(['silent', 'starlight']),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, type } = ItemSchema.parse(body);

  switch (type) {
    case 'starlight':
      await sql`
        UPDATE starlight_comments
        SET status = 'archived'
        WHERE id = ${id};`;
      break;
    case 'silent':
      await sql`
        UPDATE silent_comments
        SET status = 'archived'
        WHERE id = ${id};`;
      break;
  }
  return NextResponse.json({
    success: true,
  });
}
import { NextRequest, NextResponse } from 'next/server';

import { sql } from '@/app/api/sql';

import { routing } from '@/i18n/routing';

import { z } from 'zod';

const ItemSchema = z.object({
  id: z.number(),
  type: z.enum(['silent', 'starlight']),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, type, locale } = ItemSchema.parse(body);

  const table = sql`${sql.unsafe(`${type}_comments_replies_${locale}`)}`;

  await sql`
    UPDATE ${table}
    SET status = 'archived'
    WHERE id = ${id};
  `;

  return NextResponse.json({
    success: true,
  });
}
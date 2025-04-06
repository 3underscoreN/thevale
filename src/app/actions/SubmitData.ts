'use server'

import { neon } from '@neondatabase/serverless';

export type stateType = {
  success: boolean;
  error: unknown | null;
  lastSubmitted: {
    name: string;
    content: string;
  };
}

export async function submitData(_: stateType, formData: FormData) {
  const name = formData.get('name')?.toString() || '佚名';
  const content = formData.get('content')?.toString() || '';
  const currentDate = new Date().toISOString();
  const status = 'pending';
  const sql = (process.env.NODE_ENV === 'production') ? 
    neon(`${process.env.DATABASE_URL}`) :
    neon(`${process.env.DATABASE_URL_DEV}`);
  try {
    await sql`INSERT INTO comments (name, content, created_at, status) VALUES (${name}, ${content}, ${currentDate}, ${status});`;
    return {
      success: true,
      error: null,
      lastSubmitted: {
        name: name,
        content: content,
      },
    };
  }
  catch (error) {
    return {
      success: false,
      error: error,
      lastSubmitted: {
        name: name,
        content: content,
      },
    }
  }
}
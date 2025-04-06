'use server'

import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const FormDataSchema = z.object({
  name: z.string().max(64).default('佚名'),
  content: z.string().max(2048),
});

export type SubmitState = {
  success: boolean;
  error: any;
  lastSubmitted: {
    name: string;
    content: string;
  };
}

export async function submitData(_: SubmitState, formData: FormData) {
  const parsedData = FormDataSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    throw parsedData.error;
  }
  const { name, content } = parsedData.data;
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
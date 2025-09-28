"use server";

import { neon } from "@neondatabase/serverless";
import { z } from "zod";

import { routing } from "@/i18n/routing";

const FormDataSchema = z.object({
  name: z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() === "") {
      return '-';
    }
    return arg;
  }, z.string().max(64)),
  content: z.string().max(2048),
  category: z.enum(["silent_comments", "starlight_comments"]),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export type SubmitState = {
  success: boolean;
  error: unknown;
  lastSubmitted: {
    name: string;
    content: string;
  };
};

export async function submitPost(_: SubmitState, formData: FormData) {
  const parsedData = FormDataSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    throw parsedData.error;
  }
  const { name, content, category, locale } = parsedData.data;

  const currentDate = new Date().toISOString();
  const status = "pending";

  const sql =
    process.env.NODE_ENV === "production"
      ? neon(`${process.env.DATABASE_URL}`)
      : neon(`${process.env.DATABASE_URL_DEV}`);
  try {
    const table = sql`${sql.unsafe(category)}_${sql.unsafe(locale)}`;
    await sql`
      INSERT INTO ${table} (name, content, created_at, status) 
      VALUES (${name}, ${content}, ${currentDate}, ${status});
    `;
    return {
      success: true,
      error: null,
      lastSubmitted: {
        name: name,
        content: content,
      },
    };
  } catch (error) {
    console.error("Error submitting post:", error);
    return {
      success: false,
      error: error,
      lastSubmitted: {
        name: name,
        content: content,
      },
    };
  }
}

/* eslint @typescript-eslint/no-explicit-any: "warn" */

"use server";

import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const FormDataSchema = z.object({
  name: z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() === "") {
      return '佚名';
    }
    return arg;
  }, z.string().max(64)),
  content: z.string().max(2048),
  category: z.enum(["silent_comments", "starlight_comments"]),
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
  const { name, content, category } = parsedData.data;

  const currentDate = new Date().toISOString();
  const status = "pending";

  const sql =
    process.env.NODE_ENV === "production"
      ? neon(`${process.env.DATABASE_URL}`)
      : neon(`${process.env.DATABASE_URL_DEV}`);
  try {
    if (category === "silent_comments") {
      await sql`
        INSERT INTO silent_comments (name, content, created_at, status) 
        VALUES (${name}, ${content}, ${currentDate}, ${status});
      `;
    }
    if (category === "starlight_comments") {
      await sql`
        INSERT INTO starlight_comments (name, content, created_at, status) 
        VALUES (${name}, ${content}, ${currentDate}, ${status});
      `;
    }
    return {
      success: true,
      error: null,
      lastSubmitted: {
        name: name,
        content: content,
      },
    };
  } catch (error) {
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

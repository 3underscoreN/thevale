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
});

export type SubmitState = {
  success: boolean;
  error: unknown;
  lastSubmitted: {
    name: string;
    content: string;
  };
};

export async function submitReply(_: SubmitState, cardType: "silent" | "starlight", parentId: number, formData: FormData) {
  const parsedData = FormDataSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    throw parsedData.error;
  }
  const { name, content } = parsedData.data;

  const currentDate = new Date().toISOString();
  const status = "pending";

  const sql =
    process.env.NODE_ENV === "production"
      ? neon(`${process.env.DATABASE_URL}`)
      : neon(`${process.env.DATABASE_URL_DEV}`);
  try {
    if (cardType === "silent") {
      await sql`
        INSERT INTO silent_comments_replies (name, content, created_at, status, parent_id) 
        VALUES (${name}, ${content}, ${currentDate}, ${status}, ${parentId});
      `;
    }
    if (cardType === "starlight") {
      await sql`
        INSERT INTO starlight_comments_replies (name, content, created_at, status, parent_id) 
        VALUES (${name}, ${content}, ${currentDate}, ${status}, ${parentId});
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

/* eslint @typescript-eslint/no-explicit-any: "warn" */

"use server";

import { neon } from "@neondatabase/serverless";
import { z } from "zod";

import { routing } from "@/i18n/routing";

import { getTranslations } from "next-intl/server";

export type SubmitState = {
  success: boolean;
  error: unknown;
  lastSubmitted: {
    name: string;
    content: string;
  };
};

export async function submitReply(_: SubmitState, cardType: "silent" | "starlight", parentId: number, formData: FormData) {
  const t = await getTranslations("ViewPage.ReplyForm");
  const FormDataSchema = z.object({
    name: z.preprocess((arg) => {
      if (typeof arg === "string" && arg.trim() === "") {
        return t('nicknameDefault');
      }
      return arg;
    }, z.string().max(64)),
    content: z.string().max(2048),
    locale: z.enum(routing.locales).default(routing.defaultLocale),
  });


  const parsedData = FormDataSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    throw parsedData.error;
  }
  const { name, content, locale } = parsedData.data;

  const currentDate = new Date().toISOString();
  const status = "pending";

  const sql =
    process.env.NODE_ENV === "production"
      ? neon(`${process.env.DATABASE_URL}`)
      : neon(`${process.env.DATABASE_URL_DEV}`);
  try {
    if (cardType !== "silent" && cardType !== "starlight") {
      throw new Error("Invalid card type");
    }
    const table = sql`${sql.unsafe(cardType)}_comments_replies_${sql.unsafe(locale)}`;

    await sql`
      INSERT INTO ${table} (name, content, created_at, status, parent_id) 
      VALUES (${name}, ${content}, ${currentDate}, ${status}, ${parentId});
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

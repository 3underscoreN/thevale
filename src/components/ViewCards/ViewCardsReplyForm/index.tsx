"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { submitReply } from "@/app/actions/submitreply";

import { useActionState } from "react";

import Link from "next/link";
import Form from "next/form";
import { SubmitState } from "@/app/actions/submitpost";

import { useTranslations } from "next-intl";

type ViewCardsReplyFormProps = {
  cardType: "silent" | "starlight";
  cardId: number;
  className?: string;
}

const initialState = {
  success: false,
  error: null,
  lastSubmitted: {
    name: '',
    content: '',
  },
};

export default function ViewCardsReplyForm({ cardType, cardId, className }: ViewCardsReplyFormProps) {
  const [state, formAction, isPending] = useActionState(
    (s: SubmitState, f: FormData) => submitReply(s, cardType, cardId, f),
    initialState
  );
  const t = useTranslations("ViewPage.ReplyForm");

  return (
    <>
      {/* Before receiving success response */}
      {!(state.success) && (
        <div className={className}>
          <hr className="my-4" />
          <Card className="my-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">{t("title")}</CardTitle>
              <CardDescription className="text-md">
                <p>
                  {t.rich("privacyAndRules", {
                    privacy: (chunk) =>
                      <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
                        <Link href="/privacy">
                          {chunk}
                        </Link>
                      </Button>,
                    rules: (chunk) =>
                      <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
                        <Link href="/create">
                          {chunk}
                        </Link>
                      </Button>
                  })}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form action={formAction}>
                <label className="flex flex-col">
                  <span className="text-lg font-semibold my-2">{t("nickname")}</span>
                  <input
                    name="name"
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder={t("nicknameDefault")}
                    maxLength={64}
                    defaultValue={state.lastSubmitted.name || ''}
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-lg font-semibold my-2">{t("reply")}</span>
                  <textarea
                    name="content"
                    className="border border-gray-300 rounded-md p-2"
                    rows={4}
                    placeholder={t("replyDefault")}
                    maxLength={2048}
                    defaultValue={state.lastSubmitted.content || ''}
                    required
                  />
                </label>
                <input type="hidden" name="parent_id" value={cardId} />
                <Button type="submit" className="mt-4 w-full hover:cursor-pointer" disabled={isPending}>
                  {isPending ? t("sending") : t("send")}
                </Button>
              </Form>
              {state.error ? <div className="text-red-500 mt-2">{t("sendError")}</div> : null}
            </CardContent>
          </Card>
        </div>
      )}
      {/* After receiving success response */}
      {state.success && (
        <div className={className}>
          <hr className="my-4" />
          <Card className="my-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-500 mb-4">{t("Sent.title")}</CardTitle>
              <CardDescription className="text-md">
                <p>
                  {t("Sent.desc")}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </>
  );
}
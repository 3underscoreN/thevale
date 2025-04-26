"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { submitReply } from "@/app/actions/submitreply";

import { useActionState } from "react";

import Link from "next/link";
import Form from "next/form";
import { SubmitState } from "@/app/actions/submitpost";

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

export default function ViewCardsReplyForm({cardType, cardId, className}: ViewCardsReplyFormProps) {
  const [state, formAction, isPending] = useActionState(
    (s: SubmitState, f: FormData) => submitReply(s, cardType, cardId, f), 
    initialState
  );

  return (
    <>
      {/* Before receiving success response */}
      {!(state.success) && (
      <div className={className}>
        <hr className="my-4" />
        <Card className="my-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">與此回聲共鳴...</CardTitle>
            <CardDescription className="text-md">
              <p>
                發送前，請閱讀
                <Button variant="link" size="icon" className="text-blue-500 inline text-md" asChild>
                  <Link href="/privacy">
                    私隱聲明
                  </Link>
                </Button>
                以及
                <Button variant="link" size="icon" className="text-blue-500 inline text-md" asChild>
                  <Link href="/create">
                    創造回聲
                  </Link>
                </Button>
                的須知事項。
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
          <Form action={formAction}>
            <label className="flex flex-col">
              <span className="text-lg font-semibold my-2">化名</span>
              <input
                name="name"
                type="text"
                className="border border-gray-300 rounded-md p-2"
                placeholder="佚名"
                maxLength={64}
                defaultValue={state.lastSubmitted.name || ''}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-lg font-semibold my-2">共鳴</span>
              <textarea
                name="content"
                className="border border-gray-300 rounded-md p-2"
                rows={4}
                placeholder="在這裏留下你的共鳴..."
                maxLength={2048}
                defaultValue={state.lastSubmitted.content || ''}
                required
              />
            </label>
            <input type="hidden" name="parent_id" value={cardId} />
            <Button type="submit" className="mt-4 w-full hover:cursor-pointer" disabled={isPending}>
              {isPending ? "請稍後..." : "發送" }
            </Button>
          </Form>
          {state.error ? <div className="text-red-500 mt-2">發送失敗，請稍後再試。</div> : null}
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
              <CardTitle className="text-2xl font-bold text-green-500 mb-4">發表共鳴成功！</CardTitle>
              <CardDescription className="text-md">
                <p>
                  感謝你的回覆！我們會在審核後將其發佈到山谷中，讓更多的旅人能夠看到。
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </>
  );
}
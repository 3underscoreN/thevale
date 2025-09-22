'use client';

import { Button } from '@/components/ui/button';

import { useActionState } from 'react';

import { submitPost } from '@/app/actions/submitpost';

import Link from 'next/link';
import Form from 'next/form';

import { useTranslations } from 'next-intl';

const initialState = {
  success: false,
  error: null,
  lastSubmitted: {
    name: '',
    content: '',
  },
};

export default function CommentForm() {
  const [state, formAction, isPending] = useActionState(submitPost, initialState);
  const t = useTranslations("CreatePage.Form");

  return (
    <>
      {/* Before receiving success response */}
      {!(state.success) &&
        <Form className="flex flex-col space-y-4" action={formAction}>
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-2">{t("nickname")}</span>
            <input
              name="name"
              type="text"
              data-testid="name"
              className="border border-gray-300 rounded-md p-2"
              placeholder={t("nicknameDefault")}
              maxLength={64}
              defaultValue={state.lastSubmitted.name || ''}
            />
          </label>
          <label>
            <span className="text-lg font-semibold mb-2">{t("category")}</span>
            <div className="pt-2 space-y-2">
              <div>
                <input type="radio" name="category" value="silent_comments" id="silent_comments" data-testid="cat-silent" defaultChecked />
                <label className="ml-2 text-md" htmlFor="silent_comments">
                  <span className="text-md">{t("CategorySilent.title")}</span> <br />
                  <span className="text-sm text-gray-400">{t("CategorySilent.desc")}</span>
                </label>
              </div>
              <div>
                <input type="radio" name="category" value="starlight_comments" id="starlight_comments" data-testid="cat-starlight" />
                <label className="ml-2 text-md" htmlFor="starlight_comments">
                  <span className="text-md">{t("CategoryStarlight.title")}</span> <br />
                  <span className="text-sm text-gray-400">{t("CategoryStarlight.desc")}</span>
                </label>
              </div>
            </div>
          </label>
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-2">{t("content")}</span>
            <textarea
              name="content"
              data-testid="content"
              className="border border-gray-300 rounded-md p-2"
              rows={4}
              placeholder={t("contentDefault")}
              maxLength={2048}
              defaultValue={state.lastSubmitted.content || ''}
              required
            />
          </label>
          <p className="text-md text-gray-400">{t("Privacy.beforeLink")}
            <Button variant="link" size="icon" className="text-blue-300 inline text-md" asChild>
              <Link href="/privacy">
                {t("Privacy.linkText")}
              </Link>
            </Button>
            {t("Privacy.afterLink")}
          </p>
          <Button type="submit" data-testid="submit-button" className="w-full mt-4 cursor-pointer" disabled={isPending}>
            {isPending ? t("sending") : t("send")}
          </Button>
          {(state.error) ? <div className="text-red-500 mt-2">{t("sendError")}</div> : null}
        </Form>}
      {/* After receiving success response */}
      {(state.success) &&
        <div className="flex flex-col space-y-4">
          <div className="text-green-500 mt-2 text-lg font-bold">{t("Sent.title")}</div>
          <div className="text-gray-500 mt-2">{t("Sent.desc")}</div>
          <Button type="button" asChild className="w-full mt-4">
            <Link href="/">
              {t("backToHome")}
            </Link>
          </Button>
        </div>
      }
    </>
  )
}
'use client';

import { Button } from '@/components/ui/button';

import { useActionState } from 'react';

import { submitPost } from '@/app/actions/submitpost';

import Link from 'next/link';
import Form from 'next/form';

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

  return (
    <>
      {/* Before receiving success response */}
      {!(state.success) &&
        <Form className="flex flex-col space-y-4" action={formAction}>
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-2">暱稱</span>
            <input
              name="name"
              type="text"
              data-testid="name"
              className="border border-gray-300 rounded-md p-2"
              placeholder="佚名"
              maxLength={64}
              defaultValue={state.lastSubmitted.name || ''}
            />
          </label>
          <label>
            <span className="text-lg font-semibold mb-2">類別</span>
            <div className="pt-2 space-y-2">
              <div>
                <input type="radio" name="category" value="silent_comments" id="silent_comments" data-testid="cat-silent" defaultChecked />
                <label className="ml-2 text-md" htmlFor="silent_comments">
                  <span className="text-md">靜谷之聲</span> <br />
                  <span className="text-sm text-gray-400">匿名訴說你的真心，又或是分享低落，沈重的情緒。</span>
                </label>
              </div>
              <div>
                <input type="radio" name="category" value="starlight_comments" id="starlight_comments" data-testid="cat-starlight" />
                <label className="ml-2 text-md" htmlFor="starlight_comments">
                  <span className="text-md">星光之聲</span> <br />
                  <span className="text-sm text-gray-400">送上暖心的話語，點亮山谷的夜空；溫暖到此停留的旅人。</span>
                </label>
              </div>
            </div>
          </label>
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-2">回聲</span>
            <textarea
              name="content"
              data-testid="content"
              className="border border-gray-300 rounded-md p-2"
              rows={4}
              placeholder="在這裏留下你的回聲..."
              maxLength={2048}
              defaultValue={state.lastSubmitted.content || ''}
              required
            />
          </label>
          <p className="text-md text-gray-400">提交前，請閱讀
            <Button variant="link" size="icon" className="text-blue-500 inline text-md" asChild>
              <Link href="/privacy">
                私隱聲明
              </Link>
            </Button>
            。
          </p>
          <Button type="submit" data-testid="submit-button" className="w-full mt-4 cursor-pointer" disabled={isPending}>
            {isPending ? '請稍後...' : '發送'}
          </Button>
          {(state.error) ? <div className="text-red-500 mt-2">發送失敗，請稍後再試。</div> : null}
        </Form>}
      {/* After receiving success response */}
      {(state.success) &&
        <div className="flex flex-col space-y-4">
          <div className="text-green-500 mt-2 text-lg font-bold">發送成功！</div>
          <div className="text-gray-500 mt-2">感謝你的回聲。正如聲音傳播需要時間，我們也需時處理你的訊息，故請耐心等待。這段時間，也請好好照顧自己！</div>
          <Button type="button" asChild className="w-full mt-4">
            <Link href="/">
              返回首頁
            </Link>
          </Button>
        </div>
      }
    </>
  )
}
'use client';

import { Button } from '@/components/ui/button';

import { useActionState } from 'react';

import { submitData } from '@/app/actions/SubmitData';

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
  const [state, formAction, isPending] = useActionState(submitData, initialState);

  return (
    <>
      {/* Before receiving success response */}
      {!(state.success) &&
        <Form className="flex flex-col space-y-4" action={formAction}>
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-2">化名</span>
            <input
              name="name"
              type="text"
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
                <input type="radio" name="category" value="slient_comments" id="slient_comments" defaultChecked />
                <label className="ml-2 text-md" htmlFor="slient_comments">
                  <span className="text-md">靜谷之聲</span> <br />
                  <span className="text-sm text-gray-400">向其他旅人分享你的故事、情緒。</span>
                </label>
              </div>
              <div>
                <input type="radio" name="category" value="starlight_comments" id="starlight_comments" />
                <label className="ml-2 text-md" htmlFor="starlight_comments">
                  <span className="text-md">星光之聲</span> <br />
                  <span className="text-sm text-gray-400">用溫暖、鼓勵的言語點亮山谷的夜空。</span>
                </label>
              </div>
            </div>
          </label>
          <label className="flex flex-col">
            <span className="text-lg font-semibold mb-2">回聲</span>
            <textarea
              name="content"
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
          <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isPending}>
            {isPending ? '請稍後...' : '發送'}
          </Button>
          {(state.error) && <div className="text-red-500 mt-2">發送失敗，請稍後再試。{state.error.toString()}</div>}
        </Form>}
      {/* After receiving success response */}
      {(state.success) &&
        <div className="flex flex-col space-y-4">
          <div className="text-green-500 mt-2 text-lg font-bold">發送成功！</div>
          <div className="text-gray-500 mt-2">感謝你的回聲。正如聲音傳播需要時間，我們也需時處理你的訊息，故請耐心等待。</div>
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
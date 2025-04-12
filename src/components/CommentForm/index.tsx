'use client';

import { Button } from '@/components/ui/button';

import { useActionState } from 'react';

import { submitData } from '@/app/actions/SubmitData';
import Link from 'next/link';

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
      <form className="flex flex-col space-y-4" action={formAction}>
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
        <p className="text-md text-gray-400">提交前，請閱讀<Link href="/privacy" className="underline underline-offset-2">私隱聲明</Link>。</p>
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? '請稍後...' : '發送'}
        </Button>
        {(state.error) && <div className="text-red-500 mt-2">發送失敗，請稍後再試。</div>}
      </form>}
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
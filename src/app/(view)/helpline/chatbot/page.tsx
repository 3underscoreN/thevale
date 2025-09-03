'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { Message, MessageContent } from '@/components/message';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/conversation';
import { Response } from '@/components/response';
import { Loader } from '@/components/loader';

import { useEffect } from 'react';

import { cn, isMacLike, delay } from '@/lib/utils';

export default function Chat() {
  const [macLike, setMacLike] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chatbot'
    }),
    onError: async (error) => {
      console.error('Error sending message:', error);
      await delay(3000);
      clearError();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((macLike && e.key === 'Enter' && e.metaKey) || (!macLike && e.key === 'Enter' && e.ctrlKey)) {
      e.preventDefault();
      (e.target as HTMLTextAreaElement).form?.requestSubmit();
    }
  }

  useEffect(() => {
    setMacLike(isMacLike(window));
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-16 mb-8">山谷聽友</h1>
      <p className="text-lg mb-8 text-center">不想與山谷分享自己的心聲的話，不妨在這裏説説看。</p>
      <Card className="my-16 w-full md:w-3/4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">須知事項</CardTitle>
          <CardDescription className="text-md">
            <ol className="list-decimal list-inside space-y-4">
              <li>山谷聽友不能取代專業心理醫生以及心理諮商。如果需要更深入的幫助，請尋求專業心理健康資源。</li>
              <li>我們希望山谷聽友能夠幫助每個人，所以請避免惡意使用山谷聽友，包括但不限於提示詞注入、發送不恰當信息等。</li>
              <li>在使用山谷聽友時，請盡量分享過於敏感的資訊。請參考
                <Button variant="link" size="icon" className="text-blue-500 inline text-md" asChild>
                  <Link href="/privacy">
                    私隱聲明
                  </Link>
                </Button>
                以瞭解我們如何收集、使用所提供的數據，以及你所擁有的權利。
              </li>
              <li>服務提供商會過濾有關自傷的內容。對此限制我們深感抱歉，並正在尋求改善方案。</li>
              <li>山谷聽友可能因技術調整、伺服器等因素而暫停運作。我們無法保證山谷聽友隨時可用。</li>
            </ol>
          </CardDescription>
        </CardHeader>
        <hr />
        <CardContent>
          <Conversation className='relative w-full h-[500px]'>
            <ConversationContent>
              {messages.map((message, index) =>
                <Message key={index} from={message.role}>
                  <MessageContent>
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case "text":
                          return (<Response className="list-inside" key={`${message.id}-${index}`}>
                            {part.text}
                          </Response>);
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CardContent>
        <hr />
        <form onSubmit={handleSubmit}>
          <Card className="mx-5">
            <CardContent>
              <div className="flex justify-end-safe place-items-center gap-x-2">
                <div className="flex w-full flex-col gap-y-2">
                  <Textarea
                    className="w-full border-none resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="輸入訊息..."
                    onKeyDown={handleKeyPress}
                  />
                  <p className={cn("text-muted-foreground text-xs", error && "text-red-500")}>
                    {error ? "生成回覆時發生錯誤。" : (macLike ? "按 ⌘ + Enter 發送訊息" : "按 Ctrl + Enter 發送訊息")}
                  </p>
                </div>
                <Button
                  variant={error ? "destructive" : "default"}
                  type="submit"
                  aria-label="發送訊息"
                  disabled={status !== 'ready'}
                >
                  {status === 'ready' ? <FontAwesomeIcon icon={faArrowUp} /> : (error ? <FontAwesomeIcon icon={faExclamationTriangle} /> : <Loader />)}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Card>
    </div>
  );
}
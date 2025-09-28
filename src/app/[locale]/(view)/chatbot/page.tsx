'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
import { useParams } from 'next/navigation';

import { cn, isMacLike, delay } from '@/lib/utils';

import { useTranslations } from 'next-intl';

import { ListText } from '@/components/RichTextRenderer';

export default function Chat() {
  const t = useTranslations("ChatbotPage");

  const { locale } = useParams<{ locale: string }>();
  
  const [macLike, setMacLike] = useState<boolean>(false);
  const [isFormSubmitError, setIsFormSubmitError] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { messages, setMessages, sendMessage, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chatbot?locale=${locale}`
    }),
    onError: async (error) => {
      console.error('Error sending message:', error);
      await delay(3000);
      setMessages((prev) => prev.slice(0, -1));
      clearError();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      if (isFormSubmitError) {
        setIsFormSubmitError(false);
      }
      sendMessage({ text: input });
      setInput('');
    } else {
      setIsFormSubmitError(true);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((macLike && e.key === 'Enter' && e.metaKey) || (!macLike && e.key === 'Enter' && e.ctrlKey)) {
      e.preventDefault();
      (e.target as HTMLTextAreaElement).form?.requestSubmit();
    }
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFormSubmitError) {
      setIsFormSubmitError(false);
    }
    setInput(e.target.value);
  }

  useEffect(() => {
    setMacLike(isMacLike(window));
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-16 mb-8">{t("title")}</h1>
      <p className="text-lg mb-8 text-center">{t("subtitle")}</p>
      <Card className="my-16 w-full md:w-3/4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">{t("Rules.title")}</CardTitle>
          <CardDescription className="text-md">
            <ListText>{(tags) => t.rich("Rules.rules", tags)}</ListText>
          </CardDescription>
        </CardHeader>
        <hr />
        <CardContent>
          <Conversation className='relative w-full h-128'>
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
            <ConversationScrollButton className='backdrop-blur-md animate-bounce hover:cursor-pointer' />
          </Conversation>
        </CardContent>
        <hr />
        <CardFooter>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex place-items-center gap-x-2">
              <div className="flex w-full flex-col gap-y-2">
                <Textarea
                  className={cn("w-full border-none resize-none")}
                  value={input}
                  onChange={handleTextAreaChange}
                  placeholder={t("enterTextPlaceholder")}
                  onKeyDown={handleKeyPress}
                />
                <p className={cn("text-muted-foreground text-xs", (error || isFormSubmitError) && "text-red-500")}>
                  {error
                    ? t("Errors.generateError")
                    : (isFormSubmitError
                      ? t("Errors.noMessage")
                      : (macLike
                        ? t("Tooltips.mac") : t("Tooltips.windows")
                      )
                    )
                  }
                </p>
              </div>
              <Button
                variant={error ? "destructive" : "default"}
                size="icon"
                type="submit"
                aria-label={t("Aria.sendMessage")}
                disabled={status !== 'ready'}
                className={cn("hover:cursor-pointer", "rounded-full", "text-center")}
              >
                {status === 'ready' ? <FontAwesomeIcon icon={faArrowUp} /> : (error ? <FontAwesomeIcon icon={faExclamationTriangle} /> : <Loader />)}
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
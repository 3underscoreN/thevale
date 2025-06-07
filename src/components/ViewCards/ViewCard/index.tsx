/* eslint @typescript-eslint/no-explicit-any: "warn" */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Item }  from "@/interfaces/item";

import { faArrowRight, faComments, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from "sonner";

import MarkdownRenderer from "@/components/MarkdownRenderer";

import Link from "next/link";
import { useCallback } from "react";

type ViewCardProps = {
  datum: Item;
  cardType: "silent" | "starlight" | "replies";
  isReply?: boolean;
  className?: string;
}

export default function ViewCard({datum, cardType, isReply, className}: ViewCardProps) {
  const replyDestination = cardType === "silent" ? "viewsilent" : "viewstarlight";
  const writeToClipboardAndToast = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success("已複製連結！")
      }).catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("複製連結失敗。");
      });
    } else {
      console.warn("Clipboard API not supported.");
      toast.error("複製連結失敗。");
    }
  }, []);

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardDescription className="text-md font-bold mb-2">
            <div className="flex justify-between">
              <span className="text-left">暱稱：{datum.name}</span>
              <span className="text-right">
                {(new Date(Date.parse(datum.created_at))).toLocaleDateString("zh-TW")}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-lg">
          <div className="text-left">
            <MarkdownRenderer content={datum.content} />
          </div>
        </CardContent>
        <CardFooter>
          <div className={`flex w-full justify-end place-items-center space-x-4 ${isReply ? "hidden" : ""}`} data-testid={`reply-view-${datum.id}`}>
            <Button variant="outline" size="icon" className="hover:cursor-pointer" aria-label="分享連結" onClick={() => writeToClipboardAndToast(`https://thevale.top/${replyDestination}/${datum.id}`)}>
              <FontAwesomeIcon icon={faShareNodes} />
            </Button>
            <span className="text-sm text-gray-300">
              <FontAwesomeIcon className="mx-2" icon={faComments} />
              <span data-testid={`reply-count-${datum.id}`}>{datum.reply_count ?? "-"}</span>
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${replyDestination}/${datum.id}`}>
                <span className="">共鳴&nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
/* eslint @typescript-eslint/no-explicit-any: "warn" */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Item } from "@/interfaces/item";

import { faArrowRight, faComments, faShareNodes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from "sonner";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useCallback } from "react";

type ViewCardProps = {
  datum: Item;
  cardType: "silent" | "starlight" | "replies";
  isReply?: boolean;
  className?: string;
}

export default function ViewCard({ datum, cardType, isReply, className }: ViewCardProps) {
  const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false);
  useEffect(() => {
    if (isCopySuccess) {
      const timer = setTimeout(() => setIsCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopySuccess]);

  const replyDestination = cardType === "silent" ? "viewsilent" : "viewstarlight";
  const writeToClipboardAndToast = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopySuccess(true);
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
            {datum.content.split("\n").map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className={`flex w-full justify-end place-items-center space-x-4 ${isReply ? "hidden" : ""}`} data-testid={`reply-view-${datum.id}`}>
            <Button variant="outline" size="icon" className="hover:cursor-pointer" aria-label="分享連結" onClick={() => writeToClipboardAndToast(`https://thevale.top/${replyDestination}/${datum.id}`)}>
              <FontAwesomeIcon icon={isCopySuccess ? faCheck : faShareNodes} className={isCopySuccess ? "text-green-400" : ""} />
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${replyDestination}/${datum.id}`} aria-label="前往回應頁面">
                <div className="text-sm text-gray-300 border-r pr-2">
                  <FontAwesomeIcon icon={faComments} />
                  <span className="ml-2" data-testid={`reply-count-${datum.id}`}>{datum.reply_count ?? "-"}</span>
                </div>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
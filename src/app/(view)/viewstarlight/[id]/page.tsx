"use server";

import ViewCards from "@/components/ViewCards";

import ViewCardsReplyForm from "@/components/ViewCards/ViewCardsReplyForm";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default async function Page(params: { params: Promise<{ id: string }> }) {
  const { id } = await params.params;
  // const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-16 mb-8 w-full md:w-3/4">
        <Button variant="outline" asChild>
          <Link href="/viewsilent">
            <span className="text-md">
              <FontAwesomeIcon icon={faArrowLeft} />&nbsp;返回星光之聲
            </span>
          </Link>
        </Button>
        <Card className="my-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              須知事項
            </CardTitle>
            <CardDescription className="text-md">
              <ol className="list-decimal list-inside space-y-4">
                <li>禁止引用或轉載此處之內容，讓回聲僅在山谷中迴盪。</li>
                <li>旅人無需全盤接受此處之建議或鼓勵；感受由你定義。</li>
                <li>如感不適，請隨時離開此地。山谷隨時靜候你的回歸。</li>
              </ol>
            </CardDescription>
          </CardHeader>
        </Card>
        <hr />
        <ViewCards cardType="starlight" id={parseInt(id, 10)} isReply />
        <ViewCardsReplyForm cardType="starlight" cardId={parseInt(id, 10)} className="my-4" />
      </div>
    </div>
  );
}
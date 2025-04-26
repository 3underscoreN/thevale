/* eslint @typescript-eslint/no-explicit-any: "warn" */
"use client";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { 
  Pagination, 
  PaginationContent, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationItem, 
  PaginationLink 
} from "@/components/ui/pagination";

import ViewCard from "@/components/ViewCards/ViewCard";
import ViewCardsReplyForm from "./ViewCardsReplyForm";

import { Item } from "@/interfaces/item";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type ViewCardsProps = {
  cardType: "silent" | "starlight";
  isReply?: boolean;
  id: number;
  className?: string;
}

export default function ViewCards({cardType, id, isReply, className}: ViewCardsProps) {
  if (id === 0 && isReply) {
    throw new Error("If the cards are shown in a page for replies, id must be provided.");
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Item[] | null>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [op, setOp] = useState<Item | null>(null); {/* This is the original card in viewing replies */ }

  useEffect(() => {
    const apiToFetch = isReply ? "fetchreply" : "fetchpost";
    fetch(`/api/${apiToFetch}?page=${currentPage}&fetchType=${cardType}&id=${id}`)
      .then((res) => res.json())
      .then((resj) => {
        if (resj.success) {
          setData(resj.data);
          setOp(resj.op);
          setTotalPage(Math.ceil(resj.totalPage));
        } else {
          console.error("Error fetching data:", resj.error);
        }
      }
      )
      .catch((error) => {
        setError(error);
      }
      );
  }, [currentPage, cardType, id, isReply]);

  if (!data) {
    return (
      <>
        {/* Loading */}
        <Card className={className}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">加載中</CardTitle>
            <CardDescription className="text-md">
              <div>靜靜地等待回聲的到來...</div>
            </CardDescription>
          </CardHeader>
        </Card>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Error handling*/}
        <Card className={className}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2 text-red-500">
              哎呀！發生了錯誤
            </CardTitle>
            <CardDescription className="text-md">
              <div>回聲似乎迷失於山谷深處。請稍後再試看看？</div>
              <div className="mt-2">技術訊息：{error}</div>
            </CardDescription>
          </CardHeader>
        </Card>
      </>
    );
  }

  if (data.length === 0 && !isReply) {
    return (
      <>
        {/* No data */}
        <Card className={className}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">好靜啊...</CardTitle>
            <CardDescription className="text-md">
              山谷此時靜謐無聲。要來大喊一下嗎？
            </CardDescription>
          </CardHeader>
        </Card>
      </>
    );
  }

  return (
    <>
      <div aria-hidden="true" id="top" />
      {/* Normal */}
      {/* This is to show the original card in viewing replies*/
        isReply ? ( 
          <>
            <Button variant="outline" asChild>
              <Link href={cardType === "silent" ? "/viewsilent" : "/viewstarlight"}>
                <span className="text-md">
                  <FontAwesomeIcon icon={faArrowLeft} />&nbsp;返回{cardType === "silent" ? "靜默" : "星光"}之聲
                </span>
              </Link>
            </Button>
            <Card className="my-16">
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
            {op ? <ViewCard datum={op} cardType={cardType} className="my-4" isReply={isReply}/> : null}
            <hr className="my-4" />
            <h2 className="text-2xl font-bold my-4">共鳴</h2>
          </>
        ) : null
      }
      {data.map((item: Item, index: number) => (
        <ViewCard key={index} datum={item} cardType={cardType} className="my-4" isReply={isReply}/>
      ))}

      {/* Pagination part */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              className={currentPage === 1 ? 'text-gray-500' : ''} 
              href="#top" 
              aria-disabled={currentPage === 1} 
              aria-label="Previous Page 上一頁"
              data-testid="pagination-previous-page"
              isActive={currentPage !== 1} 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              className={currentPage === totalPage ? 'text-gray-500' : ''} 
              href="#top" 
              aria-disabled={currentPage === totalPage} 
              aria-label="Next Page 下一頁"
              data-testid="pagination-next-page"
              isActive={currentPage !== totalPage} 
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPage))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {isReply ? (
        <ViewCardsReplyForm cardType={cardType} cardId={id} className={`${isReply ? "block" : "hidden"} my-4`} />
      ) : null}
    </>
  );
}

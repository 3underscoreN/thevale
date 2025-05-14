/* eslint @typescript-eslint/no-explicit-any: "warn" */
"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

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

import { Skeleton } from "@/components/ui/skeleton";

import { Item } from "@/interfaces/item";

type ViewCardsProps = {
  cardType: "silent" | "starlight";
  isReply?: boolean;
  id: number;
}

export default function ViewCards({cardType, id, isReply}: ViewCardsProps) {
  if (id === 0 && isReply) {
    throw new Error("If the cards are shown in a page for replies, id must be provided.");
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Item[] | null>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [op, setOp] = useState<Item | null>(null); {/* This is the original card in viewing replies */ }

  const router = useRouter();

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
          setError(resj.error);
          if (resj.error === "The original post does not exist.") {
            router.push("/404");
          }
        }
      }
      )
      .catch((error) => {
        setError(error);
      }
      );
  }, [currentPage, cardType, id, isReply, router]);

  if (!data) {
    return (
      <>
        {/* Loading */}
        <div>
          {[...Array(10)].map((_, index) =>
            <div key={index} className="bg-gray-800 h-64 w-full rounded-xl my-4">
              <Skeleton className={`h-64 w-full bg-card rounded-xl my-4`} />
            </div>
          )}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Error handling*/}
        <Card>
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
        <Card>
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
            {op ? <ViewCard datum={op} cardType={cardType} className="my-4" isReply={isReply}/> : null}
            <hr className="my-4" />
            <h2 className="text-2xl font-bold my-4">共鳴</h2>
            {
              data.length === 0 ?
                <div className="flex justify-center items-center my-4">
                  <span className="w-full text-center text-gray-300 text-lg">暫無共鳴</span>
                </div> 
              : null
            }
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
            <PaginationLink href="#top">{currentPage}/{totalPage}</PaginationLink>
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
    </>
  );
}

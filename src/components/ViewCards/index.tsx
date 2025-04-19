/* eslint @typescript-eslint/no-explicit-any: "warn" */
"use client";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { 
  Pagination, 
  PaginationContent, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationItem, 
  PaginationLink 
} from "@/components/ui/pagination";

type ViewCardProps = {
  cardType: "viewn" | "viewp";
  props?: React.PropsWithChildren<any>;
}

export default function ViewCards({cardType, props}: ViewCardProps) {
  const fetchFrom = cardType === "viewn" ? "fetchdatan" : "fetchdatap";

  const PAGE_LIMIT = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/${fetchFrom}?page=${currentPage}`)
      .then((res) => res.json())
      .then((resj) => {
        if (resj.success) {
          setData(resj.data);
          setTotalPage(Math.ceil(resj.totalCount / PAGE_LIMIT));
        } else {
          console.error("Error fetching data:", resj.error);
        }
      }
      )
      .catch((error) => {
        setError(error);
      }
      );
  }, [currentPage]);

  if (error) {
    return (
      <>
        {/* Error handling*/}
        <Card {...props}>
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

  if (data === null) {
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
      {/* Normal */}
      {data.map((item: any, index: number) => (
        <Card key={index} className="my-4">
          <CardHeader>
            <CardDescription className="text-md font-bold mb-2">
              <div className="flex justify-between">
                <span className="text-left">暱稱：{item.name}</span>
                <span className="text-right">
                  {(new Date(Date.parse(item.created_at))).toLocaleDateString("zh-TW")}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg mb-4">
            {item.content.split("\n").map((line: string, index: number) => {
              return (
                <p key={index}>
                  {line}
                </p>
              );
            })}
          </CardContent>
        </Card>
      ))}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className={currentPage === 1 ? 'text-gray-500' : ''} href="#" aria-disabled={currentPage === 1} isActive={currentPage !== 1} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className={currentPage === totalPage ? 'text-gray-500' : ''} href="#" aria-disabled={currentPage === totalPage} isActive={currentPage !== totalPage} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPage))}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

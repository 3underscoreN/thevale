"use client";

import React from "react";

import ViewCardAdmin from "@/components/admin/ViewCardsAdmin";

import { type Item } from "@/interfaces/item";

import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";

type responseFormat = {
  success: boolean;
  data: Item[];
}

type fetchType = "silent" | "starlight";
type sourceType = "post" | "reply";

export default function AdminPage() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<sourceType>("post");
  const [type, setType] = useState<fetchType>("silent");

  useEffect(() => {
    /* Initial fetch */
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/fetchpending${source}?fetchType=${type}`);
        const resj: responseFormat = await res.json();
        if (resj.success) {
          setData(resj.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, source]);

  function approveOrDeclineCallBack(isApproved: boolean, item: Item) {
    fetch(`/api/admin/${isApproved ? `approve${source}` : `decline${source}`}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((resj) => {
        if (resj.success) {
          toast.success(`已${isApproved ? "批准" : "拒絕"}留言。`);
          setData(data.filter((d) => d.id !== item.id));
        }
      }).catch((error) => {
        toast.error(`操作發生了錯誤！`, {action: { label: "複製錯誤訊息", onClick: () => navigator.clipboard.writeText(error.message) }});
      });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
        <h1 className="text-4xl font-bold mt-16 mb-8">管理員介面</h1>
        <p className="text-lg mb-8">這裡是管理員介面，您可以在這裡查看和批准留言。</p>
        <div className="my-8 w-full md:w-3/4">
          <Select onValueChange={setSource as (value: sourceType) => void} name="source" defaultValue="post">
            <SelectTrigger>
              <SelectValue placeholder="選擇來源..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">回聲</SelectItem>
              <SelectItem value="reply">共鳴</SelectItem>
            </SelectContent>
          </Select>
          <div className="my-4" />
          <Select onValueChange={setType as (value: fetchType) => void} name="type" defaultValue="silent">
            <SelectTrigger>
              <SelectValue placeholder="選擇留言..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">靜谷之聲</SelectItem>
              <SelectItem value="starlight">星光之聲</SelectItem>
            </SelectContent>
          </Select>
          {loading ?
            <>
              {
                new Array(10).fill(0).map((_, index) => {
                  return <Skeleton key={index} className="h-64 w-full bg-card rounded-xl my-4" />
                })
              }
            </>
            : (
              data.length > 0 ?
                data.map((item, index) => {
                  return <ViewCardAdmin
                    className="my-4"
                    key={index}
                    datum={item}
                    approveOrDeclineCallBack={(isApproved) => {
                      approveOrDeclineCallBack(isApproved, item);
                    }}
                  />
                })
                : <div className="text-center text-lg my-8">沒有留言。辛苦了！</div>
            )
          }
        </div>
      </div>
    </>
  );
}
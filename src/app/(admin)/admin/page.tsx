"use client";

import React from "react";

import ViewCardAdmin from "@/components/admin/ViewCardsAdmin";

import { type Item } from "@/interfaces/item";

import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type responseFormat = {
  success: boolean;
  data: Item[];
}

type fetchType = "silent" | "starlight";

export default function AdminPage() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<fetchType>("silent");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/fetchpendingpost?fetchType=${type}`)
      .then((res) => res.json())
      .then((resj: responseFormat) => {
        if (resj.success) {
          setData(resj.data);
        }
      }
      );
    setLoading(false);
  }, [type]);

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
        <h1 className="text-4xl font-bold mt-16 mb-8">管理員介面</h1>
        <p className="text-lg mb-8">這裡是管理員介面，您可以在這裡查看和批准留言。</p>
        <div className="my-8 w-full md:w-3/4">
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
              <Skeleton className="h-64 w-full bg-card rounded-xl my-4" />
              <Skeleton className="h-64 w-full bg-card rounded-xl my-4" />
              <Skeleton className="h-64 w-full bg-card rounded-xl my-4" />
              <Skeleton className="h-64 w-full bg-card rounded-xl my-4" />
            </>
            : data.map((item, index) => {
              return <ViewCardAdmin
                className="my-4"
                key={index}
                datum={item}
                approveOrDeclineCallBack={(isApproved) => {
                  fetch(`/api/admin/${isApproved ? "approvepost" : "declinepost"}`, {
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
                      setData(data.filter((d) => d.id !== item.id));
                    }
                  });
                }}
              />
            })
          }
        </div>
      </div>
    </>
  );
}
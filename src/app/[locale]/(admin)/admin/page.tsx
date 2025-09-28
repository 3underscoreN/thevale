"use client";

import React from "react";

import ViewCardAdmin from "@/components/admin/ViewCardsAdmin";

import { type Item } from "@/interfaces/item";

import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useTranslations } from "next-intl";

import { toast } from "sonner";

import { useParams } from "next/navigation";

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

  const { locale } = useParams<{ locale: string} >();

  const t = useTranslations("Admin.SignedIn");

  useEffect(() => {
    /* Initial fetch */
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/fetchpending${source}?fetchType=${type}&locale=${locale}`);
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
  }, [type, source, locale]);

  function approveOrDeclineCallBack(isApproved: boolean, item: Item) {
    fetch(`/api/admin/${isApproved ? `approve${source}` : `decline${source}`}?locale=${locale}`, {
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
          toast.success(t('toastMessage', { type: isApproved ? "approve" : "delete" }));
          setData((prev) => prev.filter((d) => d.id !== item.id));
        }
      }).catch((error) => {
        toast.error(t("toastMessageException"), {action: { label: t("toastCopyMessage"), onClick: () => navigator.clipboard.writeText(error.message) }});
      });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
        <h1 className="text-4xl font-bold mt-16 mb-8">{t('title')}</h1>
        <p className="text-lg text-center mb-8">{t('subtitle')}</p>
        <div className="my-8 w-full md:w-3/4">
          <Select onValueChange={setSource as (value: sourceType) => void} name="source" defaultValue="post">
            <SelectTrigger className="w-full backdrop-blur-xl backdrop-brightness-50">
              <SelectValue placeholder={t('ReplySelector.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">{t('ReplySelector.post')}</SelectItem>
              <SelectItem value="reply">{t('ReplySelector.reply')}</SelectItem>
            </SelectContent>
          </Select>
          <div className="my-4" />
          <Select onValueChange={setType as (value: fetchType) => void} name="type" defaultValue="silent">
            <SelectTrigger className="w-full backdrop-blur-xl backdrop-brightness-50">
              <SelectValue placeholder={t('TypeSelector.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">{t('TypeSelector.silent')}</SelectItem>
              <SelectItem value="starlight">{t('TypeSelector.starlight')}</SelectItem>
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
                : <div className="text-center text-lg my-8">{t("noComment")}</div>
            )
          }
        </div>
      </div>
    </>
  );
}
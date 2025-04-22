/* eslint @typescript-eslint/no-explicit-any: "warn" */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Item from "@/interfaces/item";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

type ViewCardProps = {
  datum: Item;
  cardType: "silent" | "starlight" | "replies";
  isReply?: boolean;
  className?: string;
}

export default function ViewCard({datum, cardType, isReply, className}: ViewCardProps) {
  const replyDestination = cardType === "silent" ? "viewsilent" : "viewstarlight";

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
        <CardContent className="text-lg mb-4">
          {datum.content.split("\n").map((line: string, index: number) => {
            return (
              <p key={index}>
                {line}
              </p>
            );
          })}
        </CardContent>
        <CardFooter>
          <div className={`flex w-full justify-end place-items-end ${isReply ? "hidden" : ""}`}>
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
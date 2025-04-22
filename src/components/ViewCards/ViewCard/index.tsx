/* eslint @typescript-eslint/no-explicit-any: "warn" */

import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { Item } from "@/components/ViewCards"

type ViewCardProps = {
  datum: Item;
  className?: string;
}

export default function ViewCard({datum, className}: ViewCardProps) {
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
      </Card>
    </>
  );
}
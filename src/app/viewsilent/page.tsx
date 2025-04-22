"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import ViewCards from "@/components/ViewCards";

export default function ViewPage() {
  return (
    <>
      <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center" tabIndex={-1}>
        <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
          <h1 className="text-4xl font-bold mt-16 mb-8">靜谷之聲</h1>
          <p className="text-lg mb-8">靜靜聆聽其他人的故事。</p>
          <Card className="my-16 w-full md:w-3/4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-2">
                須知事項
              </CardTitle>
              <CardDescription className="text-md">
                <ol className="list-decimal list-inside space-y-4">
                  <li>禁止引用或轉載此處之內容，讓回聲僅在山谷中迴盪。</li>
                  <li>如感不安，請隨時離開此地。山谷隨時靜候你的回歸。</li>
                </ol>
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="my-8 w-full md:w-3/4">
            <ViewCards id={0} cardType="silent"/>
          </div>
        </div>
      </div>
    </>
  );
}

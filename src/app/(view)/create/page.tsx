import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import CommentForm from "@/components/CommentForm";

import Link from "next/link";
/**
 * This page is for creating a new post.
 */
export default function CreatePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">創造回聲</h1>
        <p className="text-lg mb-8">哪怕只是一聲嘆息，也會在這裏化作回聲。</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              須知事項
            </CardTitle>
            <CardDescription className="text-md">
              <ol className="list-decimal list-inside space-y-4">
                <li><span className="font-semibold">回聲匿名隱谷中。</span>請勿留下真實姓名、地址或任何可辨識身份的痕跡，讓你的回聲在山谷中自由迴盪。</li>
                <li><span className="font-semibold">留聲有度勿傷人。</span>你的言語或許尖銳，但請勿刻意傷人，讓各路旅人都可以在此稍息。</li>
                <li><span className="font-semibold">勿讓山谷承重聲。</span>山谷不禁止旅人分享自傷、結束自己生命的想法，但請勿分享鼓勵傷害自身或他人的內容。如有需要，請參考下列指引。</li>
                <li><span className="font-semibold">靜待聲音化回響。</span>聲音傳播需時，請耐心讓你的聲音融入山谷，無需重複呼喊；靜謐中自有共鳴。</li>
                <li><span className="font-semibold">山谷留聲有權衡。</span>工作人員或將靜默回聲，如有不便，請多包涵。</li>
              </ol>
              <p className="text-md mt-4">如果想跟誰傾訴的話，山谷亦有
                <Button variant="link" size="icon" className="text-blue-500 inline text-md" asChild>
                  <Link href="/helpline">
                    指引
                  </Link>
                </Button>
                相伴。
              </p>
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent>
            <CommentForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
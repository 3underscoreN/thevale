import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import HotLineCard from "@/components/HotLineCard";

/**
 * This page is for creating a new post.
 */
export default function CreatePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-4xl font-bold mt-16 mb-8">創造回聲</h1>
        <p className="text-lg mb-8">哪怕只是一聲嘆息，也會在這裏化作回聲。</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              須知事項
            </CardTitle>
            <CardDescription className="text-md">
              <ol className="list-decimal list-inside space-y-2">
                <li><span className="font-semibold">回聲匿名隱谷中。</span>請勿留下真實姓名、地址或任何可辨識身份的痕跡，讓你的回聲在山谷中自由迴盪。</li>
                <li><span className="font-semibold">留聲有度勿傷人。</span>你的言語或許尖銳，但請勿刻意傷人，讓各路旅人都可以在此稍息。</li>
                <li><span className="font-semibold">勿讓山谷承重聲。</span>請勿分享鼓勵傷害自身或他人的內容，山谷希望回聲在此安穩流轉。</li>
                <li><span className="font-semibold">靜待聲音化回響。</span>聲音傳播需時，請耐心讓你的聲音融入山谷，無需重複呼喊；靜謐中自有共鳴。</li>
                <li><span className="font-semibold">山谷留聲有權衡。</span>工作人員或將靜默回聲，如有不便，請多包涵。</li>
              </ol>
            </CardDescription>
            <CardTitle className="text-xl font-bold my-8">
              如果想跟誰傾訴的話，可以參考以下資源：
            </CardTitle>
            <div className="flex justify-center">
              <HotLineCard />
            </div>
          </CardHeader>
          <CardContent />
        </Card>
      </div>
    </>
  );
}
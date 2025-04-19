import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center">
        <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
          <h1 className="text-4xl font-bold mt-16 mb-8">關於山谷</h1>
          <p className="text-lg mb-8">這裏記載著關於山谷的故事。</p>
          <Card className="my-16 w-full md:w-3/4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-2">
                來自開發者的話
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="my-4 text-md">
                你好，我是3_n。我是「山谷」網站最初的開發者。這片數位空間的故事，始於2024年初夏。
              </p>
              <p className="my-4 text-md">
                那時，我首次接觸到情緒病患者，他們的掙扎讓我開始思考情緒的重量。然而，到了暑假後，
                我自己的內心也開始動盪。我變得易怒，時常無故落淚，彷彿情感像無形的潮水，無法控制地湧來。
                同年秋天，我作為交換生來到台灣，卻在那裡迎來了更深的低谷。
              </p>
              <p className="my-4 text-md">
                幸運的是，我並不孤單。在台灣認識的好友成為我的星光，他們的溫暖與耐心，讓我一步步走出黑暗。
              </p>
              <p className="my-4 text-md">
                這段經歷讓我深刻理解：每一顆心都需要被聽見，每一種感受都值得被珍視。
              </p>
              <p className="my-4 text-md">
                回到香港，城市的快節奏讓我更深刻感受到壓力的重量。
                在這片高樓與霓虹之間，我們總在穿梭於大樓之間，卻很少停下喘口氣。
              </p>
              <p>
                年尾，我偶然發現了日本的「宛名の無い手紙」網站。
                那是一個匿名的平台，讓人們毫無顧忌地傾訴關於自傷，結束自己想法的地方。
                這樣的空間彷彿一處山谷，靜靜承接每一聲回響。
                當時，我正在學習Next.js，一種強大的網頁開發框架。於是，一個念頭萌芽：
                何不親手打造一個屬於我們的「山谷」？
                既是技術的試煉，也是對精神健康的一份承諾。
                經過許多個夜晚的編碼與設計，這片數位的「山谷」終於誕生。
              </p>
              <p className="my-4 text-md">
                在「山谷」，你可以匿名分享自己的情緒。
                無論是深夜的崩潰，還是片刻的感悟，它們都會在「靜谷心聲」中迴響。
                你也可以閱讀他人的故事：
                或許你會看到有人寫下內心的疲憊，或是用詩意的文字描繪自己的無助。
                這些心聲，像山谷間的回聲，彼此交織。
                如果你感受到一絲溫暖，或想為他人點亮一盞燈，「星光回聲」歡迎你的感恩與鼓勵。
              </p>
              <p className="my-4 text-md">
                這裡沒有評判，沒有壓力，只有純粹的傾聽。
                你的每一种感受，都值得被珍視。無論是沉重的悲傷，還是無聲的迷茫，這裡都會溫柔接納。
                你不需要假裝堅強，也不需要立刻好起來。只要來到這裡，你的聲音就是山谷的回響。
              </p>
              <div className="flex flex-col my-4 mx-4">
                <span className="text-md font-semibold text-right">3_n</span>
                <span className="text-sm text-gray-500 text-right">2025年4月</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
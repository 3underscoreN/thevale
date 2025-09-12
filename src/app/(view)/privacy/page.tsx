import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">私隱聲明</h1>
        <p className="text-lg text-center mb-8">山谷收集的資料，在此一一說明。</p>
        <Card className="my-16 w-full md:w-3/4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              山谷 —— 私隱聲明
            </CardTitle>
            <CardDescription className="text-md">
              <p className="text-md mt-4">最後更新日期：2025年9月4日</p>
            </CardDescription>
          </CardHeader>
          <hr />
          <CardContent className="text-md space-y-4">
            <p>
              感謝你使用「山谷」！「山谷」是一個匿名的線上空間，讓你以及其他旅人可以自由地分享自己的心聲。
              我們深知私隱的重要性，遵守香港《個人資料（私隱）條例》，確保你的個人資料得到妥善保護。
              請閱讀下列私隱聲明，了解我們如何收集、使用和保護你的個人資料。
            </p>
            <h2 className="pt-8 text-lg font-bold">我們收集並使用的資料</h2>
            <p>為維持「山谷」的運作並優化體驗，我們以及託管平台（Vercel）會收集以下資料：</p>
            <ul className="list-disc list-inside space-y-2">
              <li>互聯網協議（IP）地址：當你瀏覽「山谷」時，Vercel或會記錄IP地址，用於檢測和應對網絡威脅、以及防止濫用。</li>
              <li>裝置元數據：包括你的瀏覽器類型（如Chrome、Safari）和操作系統（如Windows、iOS），用於了解訪客的技術環境。</li>
              <li>
                匿名留言內容：你在「創造回聲」提交的留言或會被顯示於「靜谷之聲」或「星光之聲」頁面中。
                同時，你在任何「與此回聲共鳴...」頁面中留下的留言，也或會被展示於與其相關聯的留言之「共鳴」頁面中。
              </li>
              <li>
                「山谷聽友」對話內容：你與「山谷聽友」之間的對話內容會被我們用於改善「山谷聽友」的服務。
              </li>
            </ul>
              <p>我們不會主動收集任何可直接識別你身份的個人資料（如姓名、電郵或電話號碼）。</p>
            <h2 className="pt-8 text-lg font-bold">資料分享與披露</h2>
            <p>除下列情況外，我們不會將你的資料出售或出租給第三方：</p>
            <ul className="list-disc list-inside space-y-2">
              <li>服務提供商：我們可能會將資料分享給第三方服務提供商（如Vercel），以協助我們運營「山谷」。
                這些服務提供商受其界定的私隱聲明約束。可以參考
                <Link href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline underline-offset-2">Vercel的私隱聲明</Link>
                以及
                <Link href="https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy?tabs=azure-portal" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline underline-offset-2">Microsoft Azure OpenAI關於數據、隱私與安全的聲明</Link>
                了解更多。</li>
              <li>法律要求：若香港法律或法庭命令要求，我們可能需提供IP地址或裝置元數據。</li>
            </ul>
            <h2 className="pt-8 text-lg font-bold">第三方連結</h2>
            <p>我們的網站可能包含第三方網站的連結。這些網站的私隱聲明可能與我們不同，我們不會對這些網站的內容或私隱做法負責。</p>
            <h2 className="pt-8 text-lg font-bold">你的權利</h2>
            <p>你有權要求查閱、更正或刪除我們持有的你的個人資料。若你希望行使這些權利，請透過GitHub或<Link href="mailto:support@thevale.top" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline underline-offset-2">電郵</Link>聯絡開發者。</p>
            <h2 className="pt-8 text-lg font-bold">私隱聲明的更新</h2>
            <p>我們可能會不時更新本私隱聲明。請定期查看本頁面，以了解最新的私隱聲明。</p>
            <p>感謝你與我們同行。</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
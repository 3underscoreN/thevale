import HotLineCard from "@/components/HotLineCard";

export default function HotLinePage() {
  return (
    <>
      <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center">
        <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
          <h1 className="text-4xl font-bold mt-16 mb-8">支援資源</h1>
          <p className="text-lg mb-8">當回聲難以承載心聲，外界的熱線與資源在此守候。</p>
          <blockquote className="my-8 border-l-2 pl-6 text-md italic">
            辛苦了。<br />
            我沒有辦法感知你的痛苦，但關於你的故事，<br />
            要不要分享給他們聽聽？
            <div className="pt-4 text-sm text-right">— 3_n</div>
          </blockquote>
          <HotLineCard />
        </div>
      </div>
    </>
  );
}
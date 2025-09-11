"use client"

import WelcomeText from "@/components/WelcomeText";
import './page.css'

import BentoGridMenu from "@/components/BentoGridMenu";

export default function Home() {

  return (
    <>
      <div className="static w-full h-svh">
        <div className="absolute top-0 left-0 background-mountain" />
        <div className="absolute top-0 left-0 foreground-mountain" />
        <div className="absolute top-3/12 left-0 w-full">
          <div className="flex w-full justify-center">
            <WelcomeText />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="flex flex-col gap-2 md:gap-8 text-center overflow-clip text-xl md:text-2xl justify-center w-full">
          <p>你好，旅人。</p>
          <p>日子堆疊的縫隙裡，</p>
          <p>總有些情緒無處安放——</p>
          <p>可能是小小的悵惘，又或者感覺</p>
          <p>沉入無人能達的深淵。</p>
          <p>就像對著山谷盡情大喊般，</p>
          <p>把心中想說的，化為回聲，融入這片靜謐吧。</p>
        </div>
      </div>
      <hr />
      <div className="section">
        <BentoGridMenu />
      </div>
    </>
  );
}

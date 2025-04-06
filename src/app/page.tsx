"use client"

import WelcomeText from "@/components/WelcomeText";
import './page.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faExternalLink } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

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
        <div className="flex flex-col gap-8 text-center overflow-clip text-2xl justify-center w-full">
          <p>你好，陌生人。</p>
          <p>日子堆疊的縫隙裡，總有些情緒無處安放——</p>
          <p>可能是小小的悵惘，又或者像是感覺</p>
          <p>沉入無人能達的深淵。</p>
          <p>就像對著山谷盡情大喊般，</p>
          <p>把心中想說的，化為回聲，融入這片靜謐吧。</p>
        </div>
      </div>
      <hr />
      <div className="section">
        <div className="flex flex-col md:flex-row gap-8 text-center overflow-clip text-2xl justify-center w-full">
          <Button className="text-2xl min-h-12 bg-[#F4C430]" asChild>
            <Link href="/create">
              創造回聲
            </Link>
          </Button>
          <Button className="text-2xl min-h-12 bg-[#87CEEB]">傾聽回聲</Button>
        </div>
      </div>
      <hr />
      {/* footer */}
      <Footer className="section" />
      <div className="end-footer" />
    </>
  );
}

import WelcomeText from "@/components/WelcomeText";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="static">
        <div className="absolute top-0 left-0 w-full h-screen bg-[url(/asset/background.jpg)] bg-cover bg-center brightness-50 -z-1" />
        <div className="absolute top-42 left-0 w-full">
          <div className="flex w-full justify-center">
            <WelcomeText />
          </div>
        </div>
      </div>
    </>
  );
}

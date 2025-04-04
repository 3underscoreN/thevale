import WelcomeText from "@/components/WelcomeText";
import './page.css'


export default function Home() {
  return (
    <>
      <div className="static w-full h-svh">
        <div className="absolute top-0 left-0 background-mountain" />
        <div className="absolute top-42 left-0 w-full">
          <div className="flex w-full justify-center">
            <WelcomeText />
          </div>
        </div>
      </div>
      <div className="w-full py-16 px-8">
        <div className="flex text-center justify-center w-full">
          
        </div>
      </div>
    </>
  );
}

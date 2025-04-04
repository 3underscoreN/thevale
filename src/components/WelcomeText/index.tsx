import "./WelcomeText.css"

import localFont from "next/font/local"

const iansuiFont = localFont({src: './font/Iansui-Regular.ttf'})

type Props = {
  className?: string
}

export default function WelcomeText(props: Props) {
  return (
    <div className={props.className}>
      <div className={`text-shadow-lg/30 tracking-widest text-center ${iansuiFont.className}`}>
        <h1 className="animated-text text-6xl md:text-8xl">
          山谷
        </h1>
        <h2 className="py-8 animated-text text-lg md:text-2xl">
          內心有什麼想說的嗎？
        </h2>
      </div>
    </div>
  )
}
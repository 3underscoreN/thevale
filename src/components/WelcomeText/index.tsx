import "./WelcomeText.css"

import { useTranslations } from "next-intl"

type Props = {
  className?: string
}

export default function WelcomeText(props: Props) {
  const t = useTranslations("LandingPage.WelcomeText");

  return (
    <div className={props.className}>
      <div className="text-shadow-lg/30 tracking-widest text-center">
        <h1 className="text-6xl md:text-8xl">
          {t("title")}
        </h1>
        <h2 className="py-8 animated-text text-lg md:text-2xl">
          {t("subtitle")}
        </h2>
      </div>
    </div>
  )
}
import "./WelcomeText.css"

type Props = {
  className?: string
}

export default function WelcomeText(props: Props) {
  return (
    <div className={props.className}>
      <div className="text-shadow-lg/30 tracking-widest text-center">
        <h1 className="text-6xl md:text-8xl">
          山谷
        </h1>
        <h2 className="py-8 animated-text text-lg md:text-2xl">
          有什麼想說的嗎？
        </h2>
      </div>
    </div>
  )
}
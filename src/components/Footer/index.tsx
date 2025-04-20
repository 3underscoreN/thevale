import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import React from "react";

export default function Footer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <footer role="contentinfo" {...props}>
      <div className="w-full">
        <div className="overflow-clip text-md ps-2 mb-4">
          <p>山谷 / The Vale - by:&nbsp;
            <Link href="https://3underscoreN.github.io" className="underline-offset-2 hover:underline">3_n</Link>
          </p>
        </div>
        <ul className="overflow-clip text-sm ps-2 my-2 space-y-2">
          <hr />
          <li>
            <p>圖片來源：Freepik /&nbsp;
              <Link href="https://fontawesome.com/" className="underline-offset-2 hover:underline">FontAwesome</Link>&nbsp;
              <FontAwesomeIcon icon={faExternalLink} />
            </p>
          </li>
          <li>
            <p>
              靈感：
              <Link href="https://www.befrienders-jpn.org/tegami" className="underline-offset-2 hover:underline">宛名の無い手紙</Link>&nbsp;
              <FontAwesomeIcon icon={faExternalLink} />
            </p>
          </li>
          <hr />
          <li>
            <div className="flex flex-col md:flex-row justify-start space-x-0 md:space-x-4 space-y-2 md:space-y-0">
              <Link href="/privacy" className="underline-offset-2 hover:underline">私隱聲明</Link>
              <Link href="/about" className="underline-offset-2 hover:underline">關於「山谷」</Link>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  )
}
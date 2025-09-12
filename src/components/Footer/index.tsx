import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function Footer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <footer role="contentinfo" {...props}>
      <div className="w-full">
        <div className="overflow-clip text-md ps-2 mb-4">
          <p>山谷 / The Vale - <Link href="https://3underscoreN.github.io" className="underline-offset-2 hover:underline text-xs">3_n</Link></p>
        </div>
        <hr />
        <ul className="overflow-clip text-sm ps-2 my-2 space-y-2">
          <li>
            <p>圖片：Freepik</p>
          </li>
          <li>
            <p>
              靈感：
              <Link href="https://www.befrienders-jpn.org/tegami" className="underline-offset-2 hover:underline">宛名の無い手紙</Link>&nbsp;
              <FontAwesomeIcon icon={faExternalLink} />
            </p>
          </li>
        </ul>
        <hr />
        <ul className="overflow-clip ps-2 my-2 space-y-4">
          <li>
            <div className="flex flex-col md:flex-row justify-start space-x-0 md:space-x-4 space-y-2 md:space-y-0 text-sm">
              <Link href="/privacy" data-testid="privacy" className="underline-offset-2 hover:underline">私隱聲明</Link>
              <Link href="/about" data-testid="about" className="underline-offset-2 hover:underline">關於「山谷」</Link>
            </div>
          </li>
          <li>
            <div className="flex flex-row justify-start space-x-4">
              <Button variant="outline" size="icon" className="text-lg" asChild>
                <Link href="https://github.com/3underscoreN/theVale" target="_blank" rel="noopener noreferrer" aria-label="Github Repository">
                  <FontAwesomeIcon icon={faGithub}/>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="text-lg" asChild>
                <Link href="https://www.instagram.com/thevale_echo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram}/>
                </Link>
              </Button>
            </div>
          </li>
        </ul>   
      </div>
    </footer>
  )
}
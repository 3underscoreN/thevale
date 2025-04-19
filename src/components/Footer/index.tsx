import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import React from "react";

export default function Footer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="w-full">
        <div className="overflow-clip text-md ps-2">
          <p>山谷 / The Vale - by:
            <Button variant="link" size="sm" asChild>
              <Link href="https://3underscoreN.github.io">3_n</Link>
            </Button>
            <FontAwesomeIcon icon={faExternalLink} />
          </p>
        </div>
        <div className="my-1" />
        <div className="overflow-clip text-sm ps-2">
          <p>圖片：
            <Button variant="link" size="sm" asChild>
              <Link href="https://www.freepik.com/">Freepik</Link>
            </Button>
            <FontAwesomeIcon icon={faExternalLink} />
            <Button variant="link" size="sm" asChild>
              <Link href="https://fontawesome.com/">FontAwesome</Link>
            </Button>
            <FontAwesomeIcon icon={faExternalLink} />
          </p>
          <p>
            靈感：
            <Button variant="link" size="sm" asChild>
              <Link href="https://www.befrienders-jpn.org/tegami">宛名の無い手紙</Link>
            </Button>
            <FontAwesomeIcon icon={faExternalLink} />
          </p>
          <p>私隱： 
            <Button variant="link" size="sm" asChild>
              <Link href="/privacy">私隱聲明</Link>
            </Button>
            ｜關於：
            <Button variant="link" size="sm" asChild>
              <Link href="/about">關於山谷</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

import { useTranslations } from "next-intl";

export default function Footer(props: React.HTMLProps<HTMLDivElement>) {
  const t = useTranslations("Footer");

  return (
    <div role="contentinfo" {...props}>
      <div className="w-full">
        <div className="overflow-clip text-md p-2">
          <p>{t("title")}<Link href="https://3underscoreN.github.io" className="underline-offset-2 hover:underline text-xs">3_n</Link></p>
        </div>
        <hr />
        <div className="flex flex-col items-start space-y-2 p-2">
          <div className="flex flex-col justify-start space-y-2 text-sm">
            <Link href="/privacy" data-testid="privacy" className="underline-offset-2 hover:underline">{t("privacy")}</Link>
            <Link href="/about" data-testid="about" className="underline-offset-2 hover:underline">{t("about")}</Link>
            <Link href="/admin" data-testid="admin" className="underline-offset-2 hover:underline">{t("admin")}</Link>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-start space-x-2 p-1">
            <Button variant="ghost" size="icon" className="text-lg" asChild>
              <Link href="https://github.com/3underscoreN/theVale" target="_blank" rel="noopener noreferrer" aria-label="Github Repository">
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-lg" asChild>
              <Link href="https://www.instagram.com/thevale_echo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-lg" asChild>
              <Link href="mailto:support@thevale.top" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </Button>
          </div>
        </div>
        <ul className="overflow-clip text-xs ps-2 my-2 space-y-2">
          <li>
            <p>{t("imageSource")}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
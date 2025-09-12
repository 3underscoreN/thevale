"use client";

import MenuItem from "@/components/BentoGridMenu/MenuItem";

import Link from "next/link";
import { Card, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";

import { useState } from "react";

import './styles.css';

function BentoButton({
  title,
  testid,
  description,
  href,
  className,
  color,
}: MenuItem) {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link href={href} className={cn("h-full w-full", className)} data-testid={testid} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative flex h-full w-full">
        <div className={cn("absolute inset-0 rounded-xl bg-transition", { hovered: isHovered }, color)} />
        <Card className="h-full w-full z-0 bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl">
              <span>
                {title}
              </span>
            </CardTitle>
            <CardDescription>
              <span>{description}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter className={cn("h-full w-full items-end justify-end")}>
            <FontAwesomeIcon icon={faArrowRight}
              className="text-2xl transition duration-300 ease-in-out"
              style={{
                opacity: isHovered ? 1 : 0.5,
                translate: isHovered ? "4px" : "0px",
              }}
            />
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}

export { BentoButton };
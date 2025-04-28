"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";

import "./bg-colors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink, faPhone } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";

import { Helpline } from "@/interfaces/helpline";

import { HelplineType2Text } from "@/lib/helplineformatter";


export default function HotLineCard() {
  const [region, setRegion] = useState<string>("hk");
  const [helplinesData, setHelplinesData] = useState<{ chinese_name: string, hotlines: Helpline[] } | null>(null);

  useEffect(() => {
    fetch(`/api/fetchhelpline?region=${region}`)
      .then((response) => response.json())
      .then((data) => {
        setHelplinesData(data);
      })
      .catch((error) => {
        console.error("Error fetching helplines data:", error);
      });
  }, [region]);

  return (
    <>
      <Card className="w-full md:w-3/4 rainbow-mesh border-[1] border-gray-500">
        <CardHeader>
          <CardTitle className="backdrop-brightness-50 rounded-md my-4">
            <Select onValueChange={setRegion} name="region" autoComplete="off" defaultValue="hk">
              <SelectTrigger>
                <SelectValue placeholder="香港" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hk">香港</SelectItem>
                <SelectItem value="tw">台灣</SelectItem>
                <SelectItem value="mo">澳門</SelectItem>
                <SelectItem value="sg">新加坡</SelectItem>
                <SelectItem value="my">馬來西亞</SelectItem>
                <SelectItem value="other">其他地區</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
            {helplinesData?.hotlines.map((helpline, index) => (
              <Card key={index} className="bg-transparent backdrop-blur-xl backdrop-brightness-50 min-h-fit">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{helpline.title}</CardTitle>
                  <CardDescription>
                    <span className="flex gap-2">
                      {HelplineType2Text(helpline)}
                      {helpline.is247 ? <Badge variant="outline">24/7</Badge> : null}
                    </span>
                    {helpline.is247 ? null : <span>{helpline.opening_hours}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col place-items-baseline">
                    <span>{helpline.phone ? `電話：${helpline.phone}` : ""}&nbsp;</span>
                    <span className="text-sm">{helpline.description ?? ""}&nbsp;</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full" asChild>
                    <a href={helpline.link} target="_blank" rel="noopener noreferrer">
                      {helpline.type === "hotline"
                        ? <div><span>致電</span>&nbsp;<FontAwesomeIcon icon={faPhone} /></div>
                        : <div><span>前往網站</span>&nbsp;<FontAwesomeIcon icon={faExternalLink} /></div>
                      }
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
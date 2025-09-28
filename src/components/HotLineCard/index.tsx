"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import "./bg-colors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink, faPhone } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";

import { Helpline } from "@/interfaces/helpline";

import { HelplineType2Text } from "@/lib/helplineformatter";

import { useTranslations } from "next-intl";


export default function HotLineCard() {
  const [region, setRegion] = useState<string>("hk");
  const [regions, setRegions] = useState<Array<{ region: string, name: string }>>([]);
  const [helplinesData, setHelplinesData] = useState<{ name: string, hotlines: Helpline[] } | null>(null);
  const { locale } = useParams<{ locale: string }>();

  const t = useTranslations("Helpline");

  useEffect(() => {
    fetch(`/api/fetchhelpline/fetchregion?locale=${locale}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        if (data.success) {
          setRegions(data.data);
        } else {
          console.error("Error fetching regions data:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions data:", error);
      });
  }, [locale]);

  useEffect(() => {
    fetch(`/api/fetchhelpline?region=${region}&locale=${locale}`)
      .then((response) => response.json())
      .then((data) => {
        setHelplinesData(data);
      })
      .catch((error) => {
        console.error("Error fetching helplines data:", error);
      });
  }, [region, locale]);

  return (
    <>
      <Card className="w-full md:w-3/4 rainbow-mesh border-[1] border-gray-500">
        <CardHeader>
          <CardTitle className="">
            <Select onValueChange={setRegion} name="region" autoComplete="off" defaultValue="hk">
              <SelectTrigger className="backdrop-blur-xl backdrop-brightness-50 w-full md:w-auto">
                <SelectValue placeholder={t("hongKong")} />
              </SelectTrigger>
              <SelectContent>
                {regions.map((reg) => (
                  <SelectItem key={reg.region} value={reg.region}>{reg.name}</SelectItem>
                ))}
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
                    <span className="mr-2">{HelplineType2Text(helpline)}</span>
                    <span>{helpline.is247 ? <Badge variant="outline">24/7</Badge> : <span>{helpline.opening_hours}</span>}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col place-items-baseline">
                    <span>{helpline.phone ? `${t("phoneDescription")}${helpline.phone}` : ""}&nbsp;</span>
                    <span className="text-sm">{helpline.description ?? ""}&nbsp;</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <CardAction className="w-full">
                    <Button variant="default" className="w-full" asChild>
                      <a href={helpline.link} target="_blank" rel="noopener noreferrer">
                        {helpline.type === "hotline"
                          ? <div><span>{t("call")}</span>&nbsp;<FontAwesomeIcon icon={faPhone} /></div>
                          : <div><span>{t("goToWebsite")}</span>&nbsp;<FontAwesomeIcon icon={faExternalLink} /></div>
                        }
                      </a>
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
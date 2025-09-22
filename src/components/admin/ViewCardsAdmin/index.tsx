"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Item } from "@/interfaces/item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faBan } from "@fortawesome/free-solid-svg-icons";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { useState } from "react";

type ViewCardProps = {
  datum: Item;
  approveOrDeclineCallBack?: (isApproved: boolean) => void;
  className?: string;
}

export default function ViewCardAdmin({ datum, approveOrDeclineCallBack, className }: ViewCardProps) {
  const [isApproveOpened, setApproveOpened] = useState(false);
  const [isDeclineOpened, setDeclineOpened] = useState(false);

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardDescription className="text-md font-bold mb-2">
            <div className="flex justify-between">
              <span className="text-left">暱稱：{datum.name}</span>
              <span className="text-right">
                {(new Date(Date.parse(datum.created_at))).toLocaleDateString("zh-TW")}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-lg">
          <div className="text-left">
            {datum.content.split('\n').map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-end place-items-center space-x-4">
            <Popover open={isApproveOpened} onOpenChange={setApproveOpened}>
              <PopoverTrigger asChild>
                <Button variant="default" size="icon" className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faCheck} className="mx-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <ul className="space-y-2">
                  <li>
                    <p className="text-sm text-center">確定要批准這則留言嗎？</p>
                  </li>
                  <li>
                    <div className="flex flex-row space-x-2 justify-center">
                      <Button 
                        onClick={() => {
                          setApproveOpened(false);
                          approveOrDeclineCallBack?.(true); 
                        }} 
                        variant="default" 
                        className="hover:cursor-pointer">
                        <FontAwesomeIcon icon={faCheck} className="mx-2" />
                      </Button>
                      <Button 
                        onClick={() => {
                          setApproveOpened(false);
                        }}
                        variant="destructive" 
                        className="hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faBan} className="mx-2" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
            <Popover open={isDeclineOpened} onOpenChange={setDeclineOpened}>
              <PopoverTrigger asChild>
                <Button variant="destructive" size="icon" className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faXmark} className="mx-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <ul className="space-y-2">
                  <li>
                    <p className="text-sm text-center">確定要刪除這則留言嗎？</p>
                  </li>
                  <li>
                    <div className="flex flex-row space-x-2 justify-center">
                      <Button 
                        onClick={() => {
                          setDeclineOpened(false);
                          approveOrDeclineCallBack?.(false);
                        }} 
                        variant="default" 
                        className="hover:cursor-pointer">
                        <FontAwesomeIcon icon={faCheck} className="mx-2" />
                      </Button>
                      <Button 
                        onClick={() => {
                          setDeclineOpened(false);
                        }}
                        variant="destructive" 
                        className="hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faBan} className="mx-2" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
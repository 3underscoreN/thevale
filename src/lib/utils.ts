import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMacLike = (window: Window) => {
  return window.navigator.userAgent.indexOf("Mac") !== -1;
}

export const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
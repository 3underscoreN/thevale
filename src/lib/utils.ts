import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMacLike(window: Window): boolean {
  return window.navigator.userAgent.includes("Mac");
}

export const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
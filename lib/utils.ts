import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const openLink = (url: string, target: string = "_blank") => {
  window.open(url, target);
} 

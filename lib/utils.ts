import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MAX_STARS = 5;

/** RPG-style star rating, e.g. starRating(4) → "★★★★☆" */
export function starRating(stars: number): string {
  return "★".repeat(stars) + "☆".repeat(MAX_STARS - stars);
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatNumberWithCommas(numStr: string)  {
  const num = Number(numStr);
  return isNaN(num) ? "Invalid number" : num.toLocaleString();
};

export function cleanNumString(numStr: string) {
  return numStr.replace(/,/g, "")
}
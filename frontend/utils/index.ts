import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const snakeToPlainText = (str: string) => {
  if (!str?.length) return str;
  const text = str.replace(/_/g, " ").toLowerCase();
  return text[0].toUpperCase() + text.substring(1);
};

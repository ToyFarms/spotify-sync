import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isServerRunning(url: string) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(100) });
    return res.status === 200 && (await res.text()) === "pong";
  } catch {
    return false;
  }
}

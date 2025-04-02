import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function isServerRunning(url: string) {
  try {
    const res = await fetch(url)
    return res.status === 200;
  } catch {
    return false;
  }
}

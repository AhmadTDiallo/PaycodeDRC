import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { fr } from "date-fns/locale";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSafeDate = (dateValue: any, formatStr: string = "dd MMM yyyy") => {
  try {
    if (!dateValue) return "Date non disponible";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Date non disponible";
    return format(date, formatStr, { locale: fr });
  } catch {
    return "Date non disponible";
  }
}
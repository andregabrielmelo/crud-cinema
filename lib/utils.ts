import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GenericData } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  date = new Date(date)
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  return `${date.getDate().toString().padStart(2,"0")} de ${meses[date.getMonth()]} de ${date.getFullYear()}, ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}`
}

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringToColor(str: string) {
  // Calcula um hash da string
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convertendo para um número de 32 bits
  }

  // Converte o hash para uma cor hexadecimal
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('0' + value.toString(16)).slice(-2) // Usar slice para garantir que sejam sempre dois caracteres
  }

  return color
}

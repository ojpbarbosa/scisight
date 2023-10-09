/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fisherYatesShuffle(array: any[]) {
  let i = array.length,
    j: number,
    k: any

  while (i) {
    j = Math.floor(Math.random() * i--)
    k = array[i]
    array[i] = array[j]
    array[j] = k
  }

  return array
}

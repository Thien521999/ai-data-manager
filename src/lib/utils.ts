import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const isBrowser = typeof window !== 'undefined'

export const getRoleFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('role') : null
}

export const getUserFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('user') : null
}

export const removeRoleAndUserFromLocalStorage = () => {
  if (isBrowser) {
    localStorage.removeItem('role')
    localStorage.removeItem('user')
  }
}

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

export const getTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem('token') : null
}

export const removeTokensFromLocalStorage = () => {
  if (isBrowser) {
    localStorage.removeItem('token')
  }
}

/**
 * Xoa di ky tu '/' dau tien cua path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

'use client'
import { getTokenFromLocalStorage, removeTokensFromLocalStorage } from '@/lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  // createContext,
  ReactNode,
  useEffect,
} from 'react'
import { create } from 'zustand'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // true: chuyen qua tab khac quay lai => nó sẽ tự động fetch api lại
      refetchOnMount: false, // Khi component mount lại (ví dụ: quay lại trang từ trang khác), query sẽ tự động gọi API lại.
      staleTime: 60000,
      // cacheTime mặc đinh là 5 phút(30000s)
    },
  },
})

// Zustand

type AppStoreType = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const useAppStore = create<AppStoreType>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => {
    set({ isAuth })
    if (!isAuth) {
      removeTokensFromLocalStorage()
    }
  },
}))

type AppProviderProps = {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  const setIsAuth = useAppStore((state) => state.setIsAuth)

  // dummy data
  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      setIsAuth(true)
    }
  }, [setIsAuth])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

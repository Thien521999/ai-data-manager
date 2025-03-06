'use client'
import { UserType } from '@/lib/types'
import { getTokenFromLocalStorage, removeTokensFromLocalStorage } from '@/lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { del, get, set as idbSet } from 'idb-keyval'
import { ReactNode, useEffect } from 'react'
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
  role: string
  setRole: (role: string) => void
  user: UserType | undefined
  setUser: (user: UserType) => void
  loadUser: () => Promise<void>
  logout: () => Promise<void>
}

export const useAppStore = create<AppStoreType>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => {
    set({ isAuth })
    if (!isAuth) {
      removeTokensFromLocalStorage()
    }
  },
  role: 'user',
  setRole: (role) => {
    set({ role })
    if (!role) {
      removeTokensFromLocalStorage()
    }
  },
  user: undefined,
  setUser: async (user) => {
    set({ user })
    await idbSet('user', user)
  },
  loadUser: async () => {
    const user = await get('user') // Lấy lại từ IndexedDB
    if (user) set({ user })
  },
  logout: async () => {
    await del('user') // Xóa user khỏi IndexedDB
    set({ user: undefined, isAuth: false, role: 'user' }) // Reset Zustand using undefined
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

  const loadUser = useAppStore((state) => state.loadUser)

  useEffect(() => {
    loadUser()
  }, [loadUser]) // Load user khi app khởi động

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

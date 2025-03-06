'use client'

import { useAppStore } from '@/contexts/app'

export const useUser = () => {
  const user = useAppStore((state) => state.user)
  return user
}

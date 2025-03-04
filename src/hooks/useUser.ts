'use client'

import { UserType } from '@/lib/types'
import { getUserFromLocalStorage } from '@/lib/utils'

export const useUser = () => {
  const user = getUserFromLocalStorage()
  const parseData: UserType = user && JSON.parse(user)
  return parseData
}

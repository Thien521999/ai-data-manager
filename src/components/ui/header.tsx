// src/components/layout/Header.tsx
'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header() {
  const pathname = usePathname()

  // Lấy tiêu đề theo pathname
  const getPageTitle = () => {
    if (pathname.startsWith('/projects')) return 'Projects'
    if (pathname.startsWith('/users')) return 'Users'
    if (pathname.startsWith('/datasets')) return 'Datasets'
    return 'Dashboard'
  }

  return (
    <header className="bg-white shadow-md flex items-center justify-between px-6 py-4">
      {/* Tiêu đề trang */}
      <h1 className="text-xl font-semibold">{getPageTitle()}</h1>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">John Doe</span>
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

// Danh sách menu
const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Projects', path: '/projects' },
  { name: 'Users', path: '/users' },
  { name: 'Datasets', path: '/datasets' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">AI Management</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block p-3 rounded-md transition ${
                  pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

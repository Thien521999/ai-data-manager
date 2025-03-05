import AppProvider from '@/contexts/app'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import * as React from 'react'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'AI Data Manager',
  description: 'A powerful platform for managing AI datasets, models, and training pipelines.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

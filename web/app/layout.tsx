import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], fallback: ['sans-serif'] })

export const metadata: Metadata = {
  title: 'SciSight',
  description: 'The best way to visualize open science data.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

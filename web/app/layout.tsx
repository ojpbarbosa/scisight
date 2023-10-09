import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import Providers from './providers'
import Icon from '@/public/favicon.ico'
import Logo from '@/components/layout/logo'
import Actions from '@/components/layout/actions'

const inter = Inter({ subsets: ['latin'], fallback: ['sans-serif'] })

export const metadata: Metadata = {
  title: 'SciSight',
  description: 'Simplifying open science data for everyone.',
  icons: [{ rel: 'icon', url: Icon.src }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className={inter.className}>
        <Logo />
        <Providers>
          <Actions />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

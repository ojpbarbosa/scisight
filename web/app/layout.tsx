import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import Providers from './providers'
import Icon from '@/public/favicon.ico'
import Logo from '@/components/layout/logo'
import ThemeSwitcher from '@/components/layout/theme-switcher'

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
          <ThemeSwitcher />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}

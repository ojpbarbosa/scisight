'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  )
}

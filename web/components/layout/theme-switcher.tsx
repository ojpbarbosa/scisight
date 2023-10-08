'use client'

import { useTheme } from 'next-themes'
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <a
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-2xl absolute right-20 top-[3.75rem] cursor-pointer"
    >
      {theme === 'light' ? <BsMoonFill /> : <BsFillSunFill />}
    </a>
  )
}

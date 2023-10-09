'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { BsFillSunFill, BsGithub, BsMoonFill } from 'react-icons/bs'
import GitHubButton from 'react-github-btn'

export default function Actions() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="text-2xl absolute top-12 right-10 md:right-20 md:top-[2.875rem] flex flex-row gap-x-4 items-center">
      <a
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="cursor-pointer text-2xl"
      >
        {theme === 'light' ? <BsMoonFill /> : <BsFillSunFill />}
      </a>
      <div className="flex flex-row gap-x-4 items-center text-2xl">
        <Link href="/github">
          <BsGithub />
        </Link>
        <div className="mt-[3.5px] hidden sm:block text-sm">
          <GitHubButton
            href="https://github.com/ojpbarbosa/scisight"
            data-color-scheme={`no-preference: ${theme}; ${theme}: light; dark: ${theme};`}
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star ojpbarbosa/scisight on GitHub"
          >
            <div className="hidden">Star</div>
          </GitHubButton>
        </div>
      </div>
    </div>
  )
}

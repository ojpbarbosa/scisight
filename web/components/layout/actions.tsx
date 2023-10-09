'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { BsFillSunFill, BsGithub, BsMoonFill } from 'react-icons/bs'
import GitHubButton from 'react-github-btn'

export default function Actions() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="text-2xl absolute top-[46px] right-10 flex flex-row gap-x-4 items-center">
      <a
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="cursor-pointer text-2xl"
      >
        {theme && theme === 'light' ? <BsMoonFill /> : <BsFillSunFill />}
      </a>
      <div className="flex flex-row gap-x-4 items-center text-2xl">
        <Link
          href="https://github.com/ojpbarbosa/github"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <BsGithub />
        </Link>
        {theme && (
          <div className="mt-[3.5px] hidden sm:block text-sm">
            <GitHubButton
              href="https://github.com/ojpbarbosa/scisight"
              data-color-scheme={`no-preference: ${theme}; light: ${theme}; dark: ${theme};`}
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star ojpbarbosa/scisight on GitHub"
            >
              <div className="hidden">Star</div>
            </GitHubButton>
          </div>
        )}
      </div>
    </div>
  )
}

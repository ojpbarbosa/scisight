import { Space_Grotesk } from 'next/font/google'

import Slogan from './components/slogan'
import SearchForm from './components/search-form'
import TrendingTopics from './components/trending-topics'
import { cn } from '@/library/utilities'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex w-full sm:justify-center flex-col gap-y-8 sm:gap-y-6 items-center px-10 pb-10 pt-28">
      <div className="flex lg:w-3/4 xl:w-3/5 items-center gap-y-4 md:gap-y-6 sm:justify-between lg:flex-row flex-col gap-x-6">
        <Slogan />
        <SearchForm />
      </div>
      <div className="w-full lg:w-3/4 xl:w-3/5 flex flex-col justify-center gap-y-4">
        <h1 className={cn('text-xl', spaceGrotesk.className)}>Trending queries</h1>
        <TrendingTopics />
      </div>
    </main>
  )
}

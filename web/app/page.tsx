import { Space_Grotesk } from 'next/font/google'

import Slogan from './components/slogan'
import SearchForm from './components/search-form'
import TrendingTopics from './components/trending-topics'
import { cn } from '@/library/utilities'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FiHelpCircle } from 'react-icons/fi'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex w-full sm:justify-center flex-col gap-y-8 sm:gap-y-6 items-center px-10 pb-10 pt-28">
      <div className="flex lg:w-3/4 xl:w-3/5 items-center gap-y-4 md:gap-y-6 sm:justify-between lg:flex-row flex-col gap-x-6">
        <Slogan />
        <SearchForm />
      </div>
      <div className="w-full lg:w-3/4 xl:w-3/5 flex flex-col justify-center gap-y-4">
        <div className="flex flex-row align-middle items-center gap-x-1 text-xl">
          <h2 className={cn('text-xl', spaceGrotesk.className)}>Trending queries</h2>
          <Popover>
            <PopoverTrigger>
              <FiHelpCircle className="text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter mr-10 sm:mr-0">
              <p>
                SciSight keeps track of recent and most accessed queries. Click on a trending query
                to search about it!
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <TrendingTopics />
      </div>
    </main>
  )
}

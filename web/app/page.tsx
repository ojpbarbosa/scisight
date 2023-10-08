import Slogan from '@/components/home/slogan'
import SearchForm from '@/components/home/search-form'
import TrendingTopics from '@/components/home/trending-topics'

export default function Home() {
  return (
    <main className="bg-[#090909] h-screen flex justify-center flex-col items-center">
      <div className="flex items-center sm:justify-center sm:flex-row flex-col gap-x-6">
        <Slogan />
        <SearchForm />
      </div>
      <div className="w-full flex justify-center">
        <TrendingTopics />
      </div>
    </main>
  )
}

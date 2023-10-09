import Slogan from './components/slogan'
import SearchForm from './components/search-form'
import TrendingTopics from './components/trending-topics'

export default async function Home() {
  return (
    <main className="h-screen flex justify-center flex-col items-center sm:mt-0 mt-16">
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

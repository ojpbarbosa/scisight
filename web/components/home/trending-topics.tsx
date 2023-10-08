'use client'

import { useEffect, useState } from 'react'
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io'

import { api } from '@/library/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '../ui/button'
import Link from 'next/link'

const N_TRENDING_TOPICS = 5

export default function TrendingTopics() {
  const [trendingTopics, setTrendingTopics] = useState([] as string[])

  useEffect(() => {
    async function fetchTrendingTopics() {
      setTrendingTopics(await api.ml.fetchRandomTrainTexts(N_TRENDING_TOPICS))
    }

    fetchTrendingTopics()
  }, [])

  return (
    <div className="flex flex-col gap-y-6 sm:gap-y-2 mt-10 px-2">
      {trendingTopics.length > 0
        ? trendingTopics.map((topic) => (
            <div key={topic} className="flex flex-row items-center mt-2 gap-x-2">
              <span className="text-2xl">
                {Math.random() < 0.7 ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
              </span>
              <Button variant="link" className="text-base h-0 p-0" asChild>
                <Link href={`/search?q=${topic}`}>{topic}</Link>
              </Button>
            </div>
          ))
        : [...Array(N_TRENDING_TOPICS)].map((_, i) => (
            <div className="flex flex-row gap-x-2 gap-y-6 sm:gap-y-0 mt-2" key={i}>
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-56 sm:w-[36rem] h-6 rounded-full" />
            </div>
          ))}
    </div>
  )
}

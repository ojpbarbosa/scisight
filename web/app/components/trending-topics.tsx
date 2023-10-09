'use client'

import { useEffect, useState } from 'react'
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io'
import Link from 'next/link'

import { api } from '@/library/api'
import { Skeleton } from '@/components/ui/skeleton'

const TRENDING_TOPICS = 5

export default function TrendingTopics() {
  const [trendingTopics, setTrendingTopics] = useState([] as string[])

  useEffect(() => {
    async function fetchTrendingTopics() {
      setTrendingTopics((await api.ml.fetchRandomTrainTexts('v2', TRENDING_TOPICS)) as string[])
    }

    fetchTrendingTopics()
  }, [])

  return (
    <div className="flex flex-col gap-y-8 sm:gap-y-4">
      {trendingTopics.length > 0
        ? trendingTopics.map((topic) => (
            <div
              key={topic}
              className="flex flex-col items-start gap-y-1 sm:flex-row sm:items-center gap-x-2"
            >
              <span className="text-2xl">
                {Math.random() < 0.6 ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
              </span>
              <Link href={{ pathname: '/search', query: { query: topic } }} className="font-normal">
                {topic}
              </Link>
            </div>
          ))
        : [...Array(TRENDING_TOPICS)].map((_, i) => (
            <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-y-0" key={i}>
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-full sm:h-6 h-20 rounded-md" />
            </div>
          ))}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { PredictedMetadata, SearchResult } from '@/library/api'
import { api } from '@/library/api'
import Loading from '@/components/search/loading'
import Results from '@/components/search/results'

export default function Search({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [loading, setLoading] = useState(true)

  const { push } = useRouter()

  const [predictedQuery, setPredictedQuery] = useState({} as PredictedMetadata)

  const query = searchParams?.query

  const [searchResult, setSearchResult] = useState({} as SearchResult)

  useEffect(() => {
    if (!query || query.length < 30) return push('/')

    async function fetchPredictedData() {
      const predictedData = await api.ml.predict('v2', query as string)
      setPredictedQuery(predictedData as PredictedMetadata)
    }

    fetchPredictedData()
  }, [query, push])

  useEffect(() => {
    if (!predictedQuery.api) return

    async function fetchSearchResult() {
      setSearchResult((await api.core.search(predictedQuery)) as SearchResult)

      setTimeout(() => {
        setLoading(false)
      }, 5 * 1000) // 5 seconds
    }

    fetchSearchResult()
  }, [predictedQuery])

  return loading ? (
    <Loading predictedQuery={predictedQuery} />
  ) : (
    <Results
      predictedQuery={predictedQuery}
      setPredictedQuery={setPredictedQuery}
      searchResult={searchResult}
      setSearchResult={setSearchResult}
    />
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { PredictedMetadata, SearchResult } from '@/library/api'
import { api } from '@/library/api'
import Loading from './components/loading'
import Results from './components/results'

const RELATED_QUERIES = 3

export default function Search({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [loading, setLoading] = useState(true)
  const [predictedQuery, setPredictedQuery] = useState({} as PredictedMetadata)
  const [searchResult, setSearchResult] = useState({} as SearchResult)
  const [relatedQueries, setRelatedQueries] = useState<string[]>([])

  const { push } = useRouter()

  const query = searchParams?.query

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

    if (predictedQuery.api === 'Health')
      if (
        ['nasa', 'space', 'galaxy', 'planet', 'astronaut', 'terrestrial'].some((word) =>
          predictedQuery.input?.includes(word)
        )
      )
        predictedQuery.api = 'nasa'
      else predictedQuery.api = 'weather'

    async function fetchSearchResult() {
      setSearchResult((await api.core.search(predictedQuery)) as SearchResult)
      setLoading(false)
    }

    fetchSearchResult()
  }, [predictedQuery, push])

  useEffect(() => {
    if (!predictedQuery.input) return

    async function fetchRelatedQueries() {
      const similarQueries = (await api.ml.fetchRelatedQueries(
        predictedQuery,
        RELATED_QUERIES
      )) as string[]

      const randomQueries = (await api.ml.fetchRandomTrainTexts(
        'v2',
        RELATED_QUERIES * 2
      )) as string[]

      const newRelatedQueries = [...similarQueries]

      randomQueries.forEach((query) => {
        if (!newRelatedQueries.includes(query) && newRelatedQueries.length < RELATED_QUERIES * 2)
          newRelatedQueries.push(query)
      })

      setRelatedQueries(newRelatedQueries)

      // setTimeout(() => {
      // }, 3.5 * 1000) // 3.5 seconds
    }

    fetchRelatedQueries()
  }, [predictedQuery])

  return loading ? (
    <Loading predictedQuery={predictedQuery} />
  ) : (
    <Results
      predictedQuery={predictedQuery}
      setPredictedQuery={setPredictedQuery}
      searchResult={searchResult}
      setSearchResult={setSearchResult}
      relatedQueries={relatedQueries}
      setRelatedQueries={setRelatedQueries}
    />
  )
}

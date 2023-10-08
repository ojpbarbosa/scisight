'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

  const [predictedQuery, setPredictedQuery] = useState(
    {} as { occupation: string; field: string; input: string }
  )

  const query = searchParams?.q
  if (!query || query.length < 30) push('/')

  useEffect(() => {
    async function predictQuery() {
      setPredictedQuery(await api.ml.predict(query as string))
    }

    predictQuery()

    // todo: core api call
    setTimeout(() => setLoading(false), 6000)
  }, [query, push])

  return loading ? (
    <Loading predictedQuery={predictedQuery} />
  ) : (
    <Results predictedQuery={predictedQuery} />
  )
}

import type { Dispatch, SetStateAction } from 'react'

import { getFieldMetadata, getContextMetadata } from '@/library/metadata'
import { Skeleton } from '@/components/ui/skeleton'
import SearchForm from './search-form'
import type { PredictedMetadata, SearchResult } from '@/library/api'

export default function Results({
  predictedQuery,
  setPredictedQuery,
  searchResult,
  setSearchResult
}: {
  predictedQuery: PredictedMetadata
  setPredictedQuery: Dispatch<SetStateAction<PredictedMetadata>>
  searchResult: SearchResult
  setSearchResult: Dispatch<SetStateAction<SearchResult>>
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-start p-10 gap-y-4">
      {predictedQuery.input ? (
        <>
          <SearchForm
            predictedQuery={predictedQuery}
            setPredictedQuery={setPredictedQuery}
            setSearchResult={setSearchResult}
          />
          <div className="flex flex-row items-center justify-center gap-x-4">
            {getContextMetadata(predictedQuery.context)}
            {getFieldMetadata(predictedQuery.field)}
          </div>
          {/* todo: health doesnt work, show toast or message telling user about it. */}
          <h1>{searchResult.bestAPIsOptions[0].api}</h1>
        </>
      ) : (
        <>
          <Skeleton className="rounded-full h-8 w-96" />
          <div className="flex flex-row items-center justify-center gap-x-4">
            <Skeleton className="rounded-full h-8 w-32" />
            <Skeleton className="rounded-full h-8 w-32" />
          </div>
        </>
      )}
    </div>
  )
}

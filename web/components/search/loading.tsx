import TextTransition, { presets } from 'react-text-transition'
import { CgSpinner } from 'react-icons/cg'

import { getFieldMetadata, getOccupationMetadata } from '@/library/metadata'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'

const TEXTS = ['Mapping data', 'Looking for societal benefit', 'Analyzing datasets']

export default function Loading({
  predictedQuery
}: {
  predictedQuery: { occupation: string; field: string; input: string }
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((index) => index + 1),
      2000 // 2 seconds
    )

    return () => clearTimeout(interval)
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <CgSpinner fontSize={52} className="animate-spin -mt-20" />
      <h2 className="text-4xl font-bold transition-colors duration-3000">
        <TextTransition springConfig={presets.default}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h2>
      <p className="text-center text-lg px-4 max-w-[28rem] mt-1">
        Please be patient while the best resources are picked across different sources.
        <br />
      </p>
      {predictedQuery.input ? (
        <>
          <Badge
            className="rounded-full text-base font-normal text-neutral-400 bg-[#202020]/40 py-1 px-3"
            variant="outline"
          >
            {predictedQuery.input}
          </Badge>
          <div className="flex flex-row items-center justify-center gap-x-4">
            {getOccupationMetadata(predictedQuery.occupation)}
            {getFieldMetadata(predictedQuery.field)}
          </div>
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

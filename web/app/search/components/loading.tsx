import TextTransition, { presets } from 'react-text-transition'
import { CgSpinner } from 'react-icons/cg'
import { useEffect, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'

import { getFieldMetadata, getContextMetadata as getContextMetadata } from '@/library/metadata'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/library/utilities'
import type { PredictedMetadata } from '@/library/api'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const TEXTS = ['Mapping data', 'Looking for societal benefit', 'Analyzing datasets']

export default function Loading({
  query,
  predictedQuery
}: {
  query: string
  predictedQuery: PredictedMetadata
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((index) => index + 1),
      1.5 * 1000 // 1.5 seconds
    )

    return () => clearTimeout(interval)
  }, [])

  return (
    <div className="flex h-screen p-10 flex-col items-center justify-center gap-y-4">
      <CgSpinner fontSize={52} className="animate-spin -mt-20 text-primary" />
      <h2
        className={cn(
          'md:text-5xl text-4xl text-center font-semibold transition-colors duration-3000',
          spaceGrotesk.className
        )}
      >
        <TextTransition className="mt-1 mb-4 sm:mb-0" springConfig={presets.gentle}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h2>
      <p className="text-center mt-4 sm:mt-0 text-lg max-w-[28rem] text-muted-foreground">
        Please be patient while the best resources are picked across different sources.
        <br />
      </p>
      <Badge
        className="text-base overflow-hidden text-center sm:max-w-[70%] lg:max-w-[45%] font-normal text-foreground bg-neutral-400/10 dark:bg-[#202020]/40 p-2"
        variant="outline"
      >
        {query}
      </Badge>
      {predictedQuery.input ? (
        <div className="flex flex-row items-center justify-center gap-x-4">
          {getContextMetadata(predictedQuery.context)}
          {getFieldMetadata(predictedQuery.field)}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 items-center w-full">
          <div className="flex flex-row items-center justify-center gap-x-4">
            <Skeleton className="rounded-full h-8 w-32" />
            <Skeleton className="rounded-full h-8 w-32" />
          </div>
        </div>
      )}
    </div>
  )
}

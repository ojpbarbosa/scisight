'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { IoSearch } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/library/utilities'
import type { PredictedMetadata } from '@/library/api'
import { api, type SearchResult } from '@/library/api'

const formSchema = z.object({
  query: z
    .string()
    .min(30, {
      message: 'Search query must be at least 30 characters long.'
    })
    .max(200, {
      message: 'Search query must be less than 200 characters long.'
    })
})

export default function SearchForm({
  predictedQuery,
  setPredictedQuery,
  setSearchResult,
  relatedQueries,
  setRelatedQueries,
  className
}: {
  predictedQuery: PredictedMetadata
  setPredictedQuery: Dispatch<SetStateAction<PredictedMetadata>>
  setSearchResult: Dispatch<SetStateAction<SearchResult>>
  relatedQueries: string[]
  setRelatedQueries: Dispatch<SetStateAction<string[]>>
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  const { push } = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: predictedQuery.input
    }
  })

  async function onSubmit({ query }: z.infer<typeof formSchema>) {
    setLoading(true)

    const predictedData = (await api.ml.predict('v2', query as string)) as PredictedMetadata
    setPredictedQuery(predictedData)

    setSearchResult((await api.core.search(predictedData)) as SearchResult)

    const relatedQueriesLength = relatedQueries.length
    const similarQueries = (await api.ml.fetchRelatedQueries(
      predictedData,
      relatedQueriesLength
    )) as string[]

    const randomQueries = (await api.ml.fetchRandomTrainTexts(
      'v2',
      relatedQueriesLength * 2
    )) as string[]

    const newRelatedQueries = [...similarQueries]

    randomQueries.forEach((query) => {
      if (!newRelatedQueries.includes(query) && newRelatedQueries.length < relatedQueriesLength * 2)
        newRelatedQueries.push(query)
    })

    setRelatedQueries(newRelatedQueries)

    setLoading(false)

    push(`/search?query=${query}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full flex flex-row items-end gap-x-2 justify-start', className)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-3 w-full">
              <FormMessage className="text-base text-[#FA00FF]/70 font-normal" />
              <FormControl className="w-full">
                <Input
                  className="w-full h-10 text-base flex items-center active:ring-[#6C5CC2] active:border-[#6C5CC2]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className={cn(
            'hover:text-[#0D9A9A] text-2xl h-10 p-1 bg-neutral-400/10 hover:dark:bg-[#0D9A9A]/20 hover:bg-[#0D9A9A]/20',
            !loading && 'text-[#0D9A9A] border-[#0D9A9A]'
          )}
          variant="outline"
          type="submit"
          disabled={loading}
        >
          <span className="px-2 py-1">
            {loading ? <CgSpinner className="animate-spin" /> : <IoSearch />}
          </span>
        </Button>
      </form>
    </Form>
  )
}

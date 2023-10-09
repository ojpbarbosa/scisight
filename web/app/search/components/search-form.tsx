'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { IoSearch } from 'react-icons/io5'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/library/utilities'
import type { PredictedMetadata } from '@/library/api'
import { api, type SearchResult } from '@/library/api'
import { RELATED_QUERIES } from '../page'

const formSchema = z.object({
  query: z
    .string()
    .min(30, {
      message: 'Search query must be at least 30 characters long'
    })
    .max(200, {
      message: 'Search query must be less than 200 characters long'
    })
})

export default function SearchForm({
  predictedQuery,
  setPredictedQuery,
  searchResult,
  setSearchResult,
  setRelatedQueries,
  className
}: {
  predictedQuery: PredictedMetadata
  setPredictedQuery: Dispatch<SetStateAction<PredictedMetadata>>
  searchResult: SearchResult
  setSearchResult: Dispatch<SetStateAction<SearchResult>>
  setRelatedQueries: Dispatch<SetStateAction<string[]>>
  className?: string
}) {
  const [loading, setLoading] = useState(false)

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

    const searchData = await api.core.search(predictedData)
    setSearchResult(searchData as SearchResult)

    const similarQueries = (await api.ml.fetchRelatedQueries(
      predictedQuery,
      RELATED_QUERIES
    )) as string[]

    const randomQueries = (await api.ml.fetchRandomTrainTexts(
      'v2',
      RELATED_QUERIES * 2
    )) as string[]

    const newRelatedQueries = Array.from(new Set([...similarQueries]))

    randomQueries.forEach((query) => {
      if (!newRelatedQueries.includes(query)) newRelatedQueries.push(query)
    })

    setRelatedQueries(newRelatedQueries.slice(0, RELATED_QUERIES * 2))

    window.history.replaceState(null, 'SciSight', `/search?query=${query}`)

    if (searchResult) setLoading(false)
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
                  className="w-full h-10 text-base flex items-center active:ring-[#6C5CC2] active:border-[#6C5CC2] dark:bg-[#202020]/40 bg-neutral-400/10"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className={cn(
            'hover:text-[#0D9A9A] text-2xl h-10 p-1 hover:dark:bg-[#0D9A9A]/20 hover:bg-[#0D9A9A]/20 dark:bg-[#202020]/40 bg-neutral-400/10',
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

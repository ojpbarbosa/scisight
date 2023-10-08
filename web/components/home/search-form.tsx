'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoSearch } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/library/utilities'
import { Badge } from '@/components/ui/badge'
import { api } from '@/library/api'
import { useEffect, useState } from 'react'

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

export default function SearchForm({ className }: { className?: string }) {
  const [searchPlaceholder, setSearchplaceHolder] = useState('')
  const [supriseQuery, setSupriseQuery] = useState('')

  const { push } = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: ''
    }
  })

  useEffect(() => {
    async function fetchData() {
      setSearchplaceHolder((await api.ml.fetchRandomTrainTexts('v1', 1)) as string)
      setSupriseQuery((await api.ml.fetchRandomTrainTexts('v2', 1)) as string)
    }

    fetchData()
  }, [])

  async function supriseMe() {
    push(`/search?query=${supriseQuery}`)
  }

  function onSubmit({ query }: z.infer<typeof formSchema>) {
    push(`/search?query=${query}`)
  }

  return (
    <div className="flex flex-col items-center gap-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'space-y-3 max-w-full flex flex-row items-end gap-x-2 justify-start',
            className
          )}
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start space-y-3">
                <FormDescription className="text-base text-primary">
                  <span className="text-primary">Learn anything based on science.</span>
                </FormDescription>
                <FormMessage className="text-base text-[#FA00FF]/70 font-normal" />
                <FormControl>
                  <Input
                    placeholder={searchPlaceholder}
                    {...field}
                    className="sm:w-[23.5rem] w-72 h-10 text-base flex items-center active:ring-[#6C5CC2] active:border-[#6C5CC2]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="hover:text-[#0D9A9A] text-[#0D9A9A] border-[#0D9A9A] text-2xl h-10 p-1 bg-neutral-400/10 hover:bg-[#0D9A9A]/20 hover:dark:bg-[#0D9A9A]/20"
            variant="outline"
            type="submit"
          >
            <span className="px-2 py-1">
              <IoSearch />
            </span>
          </Button>
        </form>
      </Form>
      <Badge
        className="rounded-full text-base font-normal border-[#6C5CC2] bg-neutral-400/10 dark:bg-neutral-400/10 py-1 px-3"
        variant="outline"
      >
        <span className="text-neutral-500 dark:text-neutral-400">Not sure what to search?</span>
        <Button className="text-[#6C5CC2] text-base p-0 h-0 ml-1" variant="link">
          <span onClick={supriseMe}>Surprise me!</span>
        </Button>
      </Badge>
    </div>
  )
}

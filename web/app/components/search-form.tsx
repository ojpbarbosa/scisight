'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoSearch } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { FiHelpCircle } from 'react-icons/fi'
import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from 'react'

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

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
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col w-full items-start space-y-3">
                  <FormDescription className="text-base w-full">
                    <span className="text-primary text-xl flex flex-row gap-x-1 sm:w-full">
                      <span className={spaceGrotesk.className}>
                        Learn anything based on science
                      </span>
                      <Popover>
                        <PopoverTrigger>
                          <FiHelpCircle className="text-muted-foreground" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter">
                          <span>
                            Provide a detailed search query in order to feed SciSight{`'`}s
                            algorithm with valuable data and get relevant suggestions.
                          </span>
                        </PopoverContent>
                      </Popover>
                    </span>
                  </FormDescription>
                  <FormMessage className="text-base text-[#FA00FF]/70 font-normal" />
                  <FormControl>
                    <Input
                      placeholder={searchPlaceholder}
                      {...field}
                      className="w-full h-10 text-base flex items-center active:ring-[#6C5CC2] active:border-[#6C5CC2]"
                    />
                  </FormControl>
                </FormItem>
              )
            }}
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
        <span className="text-foreground">Not sure what to search?</span>
        <Button className="text-[#6C5CC2] text-base p-0 h-0 ml-1" variant="link">
          <span onClick={supriseMe}>Surprise me!</span>
        </Button>
      </Badge>
    </div>
  )
}

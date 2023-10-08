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

const formSchema = z.object({
  query: z.string().min(40, {
    message: 'Search query must be at least 40 characters long.'
  })
})

export default function SearchForm({ className }: { className?: string }) {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: ''
    }
  })

  async function supriseMe() {
    const trainText = await api.ml.fetchRandomTrainTexts(1)
    push(`/search?q=${trainText[0]}`)
  }

  function onSubmit({ query }: z.infer<typeof formSchema>) {
    push(`/search?q=${query}`)
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
                <FormDescription className="text-base">
                  Learn anything based on science.
                </FormDescription>
                <FormMessage className="text-base text-[#FA00FF]/70 font-normal" />
                <FormControl>
                  <Input
                    placeholder="My work involves analyzing the effectiveness of economic instruments for climate change mitigation and adaptation."
                    className="sm:w-[23.5rem] w-72 h-10 text-base flex items-center active:ring-[#6C5CC2] active:border-[#6C5CC2] bg-[#202020]/40"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="text-white text-2xl h-10 p-1 border-[#0D9A9A] bg-[#202020]/40 hover:bg-[#0D9A9A]/40"
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
        className="rounded-full text-base font-normal text-neutral-400 border-[#6C5CC2] bg-[#202020]/40 py-1 px-3"
        variant="outline"
      >
        Not sure what to search?
        <Button className="text-[#6C5CC2] text-base p-0 h-0 ml-1" variant="link">
          <span onClick={supriseMe}>Surprise me!</span>
        </Button>
      </Badge>
    </div>
  )
}

'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import { DateTime } from 'luxon'
import { FiExternalLink, FiHelpCircle } from 'react-icons/fi'
import Link from 'next/link'
import { scaleOrdinal } from 'd3'
import { useMediaQuery } from 'react-responsive'
import dynamic from 'next/dynamic'
import { CgSpinner } from 'react-icons/cg'

import { Skeleton } from '@/components/ui/skeleton'
import SearchForm from './search-form'
import type { PredictedMetadata, SearchResult } from '@/library/api'
import { cn, fisherYatesShuffle } from '@/library/utilities'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import BestApisOptionsChart from './best-apis-options-chart'
import { Button } from '@/components/ui/button'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const ACCENT_COLORS = [
  '#C025E6',
  '#3183A9',
  '#37CC5B',
  '#DC8F34',
  '#C70A14',
  '#75D113',
  '#FFA28B',
  '#939AFF'
]

const Globe = dynamic(() => import('react-globe.gl'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

type GlobeLabel = {
  id: string
  label: string
  lat: number
  lng: number
  date: string
}

export default function Results({
  predictedQuery,
  setPredictedQuery,
  searchResult,
  setSearchResult,
  relatedQueries,
  setRelatedQueries
}: {
  predictedQuery: PredictedMetadata
  setPredictedQuery: Dispatch<SetStateAction<PredictedMetadata>>
  searchResult: SearchResult
  setSearchResult: Dispatch<SetStateAction<SearchResult>>
  relatedQueries: string[]
  setRelatedQueries: Dispatch<SetStateAction<string[]>>
}) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const [globeImageUrl, setGlobeImageUrl] = useState('pale-blue-dot-texture.jpg')

  if (!searchResult) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col gap-y-2">
        <CgSpinner fontSize={52} className="animate-spin text-primary" />
        <p className="text-muted-foreground text-base">
          If the loading takes too long, please{' '}
          <span
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            reload
          </span>{' '}
          this page.
        </p>
      </div>
    )
  }

  const { weather, nasaEvents, relatedScientificInfo, bestAPIsOptions } = searchResult
  const data: Partial<typeof weather & typeof nasaEvents> = weather ?? nasaEvents

  const colorScale = scaleOrdinal(ACCENT_COLORS)

  return (
    <div className="flex flex-col items-center justify-start p-10 gap-y-10 md:mt-0 mt-[4.25rem]">
      {predictedQuery.input ? (
        <>
          <div className="w-full md:w-3/5 lg:w-3/4 2xl:w-3/5">
            <SearchForm
              predictedQuery={predictedQuery}
              setPredictedQuery={setPredictedQuery}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              setRelatedQueries={setRelatedQueries}
            />
          </div>
          <div className="flex flex-col justify-between lg:w-3/4 2xl:w-3/5 w-full gap-y-4">
            <div className="flex relative flex-col md:flex-row justify-between gap-x-6 gap-y-6">
              <div className="flex flex-col gap-y-2">
                <p className="text-[#C025E6]">Entity</p>
                <div className="flex flex-row gap-x-2 items-center">
                  <h1 className={cn('font-semibold text-4xl md:text-5xl', spaceGrotesk.className)}>
                    {weather ? 'NOAA' : 'NASA'}
                  </h1>
                  {weather ? (
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/NOAA_logo.svg/1024px-NOAA_logo.svg.png"
                      width={62}
                      height={62}
                      className="w-[62px] h-[62px]"
                      alt="NOAA"
                    />
                  ) : (
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png"
                      width={80}
                      height={65}
                      className="w-[80px] h-[65px]"
                      alt="NASA"
                    />
                  )}
                </div>
                <Link
                  href={weather ? 'https://www.weather.gov' : 'https://api.nasa.gov'}
                  referrerPolicy="no-referrer"
                  target="_blank"
                  className="text-muted-foreground underline underline-offset-4 flex flex-row items-center gap-x-1"
                >
                  {weather ? 'National Weather Service' : 'NASA Open APIs'}
                  <FiExternalLink />
                </Link>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col h-full md:items-center sm:flex-row gap-x-6 justify-between lg:justify-start gap-y-2 px-5 py-4 dark:bg-[#202020]/40 bg-neutral-400/10 rounded border border-dashed divide-dashed">
                  <div className="flex flex-col gap-y-2 w-2/3 lg:w-auto">
                    <div className="flex flex-row align-middle items-center gap-x-1">
                      <p className="text-[#DC8F34]">Context</p>
                      <Popover>
                        <PopoverTrigger>
                          <FiHelpCircle className="text-muted-foreground text-xl" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter ml-10 sm:ml-0">
                          <p>
                            SciSight{`'`}s machine learning model identified that the query has a{' '}
                            {predictedQuery.context.toLowerCase()} context, meaning that the query
                            represents a{' '}
                            {predictedQuery.context === 'Community'
                              ? "group idea. Therefore, SciSight's algorithm will recommend colective suggestions related to such."
                              : "single individual idea. As a result, SciSight's algorithm will recommend personalized suggestions related to such."}
                          </p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <h1
                      className={cn('font-semibold text-4xl md:text-5xl', spaceGrotesk.className)}
                    >
                      {predictedQuery.context}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-y-2 w-1/3 lg:w-auto">
                    <div className="flex flex-row align-middle items-center gap-x-1">
                      <p className="text-[#C70A14]">Field</p>
                      <Popover>
                        <PopoverTrigger>
                          <FiHelpCircle className="text-muted-foreground text-xl" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter ml-10 sm:ml-0">
                          <p>
                            SciSight{`'`}s machine learning model identified that the query is
                            related to the {predictedQuery.field.toLowerCase()} field, meaning that
                            the it pertains to{' '}
                            {predictedQuery.field === 'Health'
                              ? "health-related subjects. Therefore, SciSight's algorithm will recommend health-focused suggestions."
                              : predictedQuery.field === 'Space'
                              ? "cosmo-related topics. As a result, SciSight's algorithm will recommend space exploration and astronomy suggestions."
                              : predictedQuery.field === 'Climate'
                              ? "climate-related matters. Hence, SciSight's algorithm will recommend suggestions related to climate change and environmental issues."
                              : "unknown field. SciSight's algorithm will provide general recommendations for this field."}
                          </p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <h1
                      className={cn('font-semibold text-4xl md:text-5xl', spaceGrotesk.className)}
                    >
                      {predictedQuery.field}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:w-3/4 2xl:w-3/5 items-start gap-y-10">
            <div className="flex flex-col gap-y-2 w-full">
              <div className="flex flex-row align-middle items-center gap-x-1 text-xl">
                <h2 className={spaceGrotesk.className}>To broaden your horizons</h2>
                <Popover>
                  <PopoverTrigger>
                    <FiHelpCircle className="text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter mr-10 sm:mr-0">
                    <p>
                      SciSight{`'`}s in-depth materials are mapped change dynamically and
                      specifically for each search. As a result, each query has it{`'`}s own set of
                      best related resources.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="font-normal text-muted-foreground text-base w-full">
                SciSight{`'`}s algorithm selected and ranked the {bestAPIsOptions.length} best
                entities related data so you can deepen your research.
              </p>
              <div className="w-full flex items-center justify-center h-full">
                <BestApisOptionsChart colors={ACCENT_COLORS} bestAPIsOptions={bestAPIsOptions} />
              </div>
            </div>
            <div className="columns-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestAPIsOptions.map((option, i) => {
                const [agencyAbbreviation, agencyName] = option.api.split(' - ')

                return (
                  <div key={option.api} className="text-base font-normal flex flex-col gap-y-2">
                    <h2 className={cn('text-xl md:text-3xl', spaceGrotesk.className)}>
                      <span className={`text-[${ACCENT_COLORS[i % ACCENT_COLORS.length]}]`}>
                        {i + 1}.
                      </span>
                      {` `}
                      {agencyAbbreviation}
                    </h2>
                    <p className="text-muted-foreground">{agencyName}</p>
                    <p>{option.reason}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="w-full flex flex-col lg:w-3/4 2xl:w-3/5 items-start gap-y-6">
            <div className="flex flex-col gap-y-2">
              <h2 className={cn('text-xl flex flex-col sm:flex-row', spaceGrotesk.className)}>
                Applications for societal
                <div className="flex flex-row align-middle items-center gap-x-1">
                  <span className="ml-0 sm:ml-1">benefits</span>
                  <Popover>
                    <PopoverTrigger>
                      <FiHelpCircle className="text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter ml-10 sm:ml-0">
                      <p>
                        SciSight{`'`}s social benefits are analyzed for each data set according to
                        the query. Therefore, the suggestions change dynamically and specifically
                        for each search.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
              </h2>

              <p className="font-normal text-muted-foreground text-base w-full">
                SciSight{`'`}s machine learning model identified that the query can be used in order
                to result in societal benefits through the following suggestions.
              </p>
            </div>
            <div className="columns-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fisherYatesShuffle(relatedScientificInfo).map((info) => (
                <div
                  key={info}
                  className="rounded border text-base font-normal p-4 dark:bg-[#202020]/40 bg-neutral-400/10"
                >
                  <p>{info}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col lg:w-3/4 2xl:w-3/5 items-start gap-y-6">
            <div className="flex flex-col w-full items-star justify-between md:flex-row gap-x-6 md:gap-y-0 gap-y-4">
              <div className="flex flex-col gap-y-2">
                <p className="text-[#37CC5B]">Result</p>
                <h1 className={cn('font-semibold text-4xl md:text-5xl', spaceGrotesk.className)}>
                  {data.title}
                </h1>
              </div>
              <div className="flex flex-col gap-y-2 md:text-right text-left">
                <p className="text-[#3183A9]">Date</p>
                <h1 className={cn('font-semibold text-4xl md:text-5xl', spaceGrotesk.className)}>
                  {DateTime.fromISO(data.updated ?? new Date().toISOString())
                    .setLocale('en-us')
                    .toLocaleString(DateTime.DATE_FULL)}
                </h1>
              </div>
            </div>
            {nasaEvents ? (
              <>
                <div className="flex relative items-center w-full max-w-screen flex-col justify-center">
                  <div className="absolute top-0 right-0 z-10 text-2xl sm:text-4xl">
                    <Popover>
                      <PopoverTrigger>
                        <FiHelpCircle className="text-muted-foreground" />
                      </PopoverTrigger>
                      <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter mr-10 sm:mr-0">
                        <p>Move the globe around to check for ongoing natural events.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Globe
                    width={isTabletOrMobile ? 320 : 720}
                    height={isTabletOrMobile ? 320 : 720}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl={`/images/globe/${globeImageUrl}`}
                    rendererConfig={{ preserveDrawingBuffer: true }}
                    showGraticules={true}
                    labelsData={nasaEvents.events.map((event) => {
                      const lastGeometry = event.geometries[event.geometries.length - 1]
                      return {
                        label: event.title,
                        lat: lastGeometry.coordinates[0],
                        lng: lastGeometry.coordinates[1]
                      }
                    })}
                    labelText="label"
                    labelSize={4}
                    labelDotRadius={1}
                    labelColor={(data) => colorScale((data as GlobeLabel).id!)}
                    animateIn
                  />
                  <div className="flex flex-row gap-x-2">
                    <Button
                      className="h-10 text-base hover:text-[#3183A9] text-[#3183A9] border-[#3183A9] bg-neutral-400/10 hover:bg-[#3183A9]/20 hover:dark:bg-[#3183A9]/20"
                      variant="outline"
                      onClick={() => setGlobeImageUrl('pale-blue-dot-texture.jpg')}
                    >
                      Realistic
                    </Button>
                    <Button
                      className="h-10 text-base hover:text-[#0D9A9A] text-[#0D9A9A] border-[#0D9A9A] bg-neutral-400/10 hover:bg-[#0D9A9A]/20 hover:dark:bg-[#0D9A9A]/20"
                      variant="outline"
                      onClick={() => setGlobeImageUrl('cartoon-texture.png')}
                    >
                      Carton
                    </Button>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-y-6">
                  <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex flex-row align-middle items-center gap-x-1 text-xl">
                      <h2 className={spaceGrotesk.className}>
                        {data.description?.replace('.', '')}
                      </h2>
                      <Popover>
                        <PopoverTrigger>
                          <FiHelpCircle className="text-muted-foreground" />
                        </PopoverTrigger>
                        <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter mr-10 sm:mr-0">
                          <p>
                            SciSight{`'`}s algorithm accesses real time NASA data and elects the
                            most recent natural events to display all around the globe in their
                            actual and last known coordinates.
                          </p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="font-normal text-muted-foreground text-base w-full">
                      SciSight{`'`}s algorithm gathered the {nasaEvents.events.length} most recent
                      natural events from Earth Observatory Natural Event Tracker (EONET).
                    </p>
                    <div className="columns-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {nasaEvents.events.map((event, i) => {
                        const eventGeometry = event.geometries[event.geometries.length - 1]

                        return (
                          <div
                            key={event.id}
                            className="text-base font-normal flex flex-col gap-y-2"
                          >
                            <h2 className={cn('text-xl md:text-3xl', spaceGrotesk.className)}>
                              <span className={cn(`text-[${colorScale(event.id)}]`)}>{i + 1}.</span>
                              {` `}
                              {event.title}
                            </h2>
                            <p className="text-muted-foreground">{event.id}</p>
                            <p>
                              At{' '}
                              {eventGeometry.coordinates[0] > 0
                                ? `+${eventGeometry.coordinates[0]}`
                                : eventGeometry.coordinates[0]}
                              ,{' '}
                              {eventGeometry.coordinates[1] > 0
                                ? `+${eventGeometry.coordinates[1]}`
                                : eventGeometry.coordinates[1]}{' '}
                              on{' '}
                              {DateTime.fromISO(eventGeometry.date).toLocaleString(
                                DateTime.DATE_MED
                              )}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex relative items-center w-full max-w-screen flex-col justify-center">
                  <div className="absolute top-0 right-0 z-10 text-2xl sm:text-4xl">
                    <Popover>
                      <PopoverTrigger>
                        <FiHelpCircle className="text-muted-foreground" />
                      </PopoverTrigger>
                      <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter mr-10 sm:mr-0">
                        <p>Move the globe around to check for ongoing natural events.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Globe
                    width={isTabletOrMobile ? 320 : 720}
                    height={isTabletOrMobile ? 320 : 720}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl={`/images/globe/${globeImageUrl}`}
                    rendererConfig={{ preserveDrawingBuffer: true }}
                    animateIn
                    objectLat={-100}
                  />
                  <div className="flex flex-row gap-x-2">
                    <Button
                      className="h-10 text-base hover:text-[#3183A9] text-[#3183A9] border-[#3183A9] bg-neutral-400/10 hover:bg-[#3183A9]/20 hover:dark:bg-[#3183A9]/20"
                      variant="outline"
                      onClick={() => setGlobeImageUrl('pale-blue-dot-texture.jpg')}
                    >
                      Realistic
                    </Button>
                    <Button
                      className="h-10 text-base hover:text-[#0D9A9A] text-[#0D9A9A] border-[#0D9A9A] bg-neutral-400/10 hover:bg-[#0D9A9A]/20 hover:dark:bg-[#0D9A9A]/20"
                      variant="outline"
                      onClick={() => setGlobeImageUrl('cartoon-texture.png')}
                    >
                      Carton
                    </Button>
                  </div>
                </div>
              </>
            )}
            <div className="w-full flex flex-col items-start gap-y-6">
              <div className="flex flex-col gap-y-2 w-full">
                <div className="flex flex-row align-middle items-center gap-x-1 text-xl">
                  <h2 className={spaceGrotesk.className}>Related search queries</h2>
                  <Popover>
                    <PopoverTrigger>
                      <FiHelpCircle className="text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="dark:bg-[#202020]/40 bg-neutral-400/10 backdrop-blur-lg filter mr-10 sm:mr-0">
                      <p>
                        SciSight{`'`}s algorithm performs syntax analisys and comparisons of your
                        query with its database of queries. It then ranks each query based on
                        similarities and differences, taking into consideration the predicted query
                        metadata by the SciSight{`'`}s machine learning model.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="font-normal text-muted-foreground text-base w-full">
                  SciSight{`'`}s algorithm picked {relatedQueries.length} queries that might be
                  related to yours.
                </p>
                <div className="w-full flex flex-col md:flex-row gap-x-4 gap-y-6 items-start justify-center h-full">
                  <div className="w-full md:w-1/2 flex flex-col gap-y-2">
                    <h2>Associated queries</h2>
                    <ul className="marker:text-green space-y-4 flex flex-col justify-start list-outside list-disc ml-6">
                      {relatedQueries
                        .slice(0, Math.ceil(relatedQueries.length / 2))
                        .map((query) => (
                          <li key={query}>
                            <p
                              className="underline underline-offset-4 cursor-pointer"
                              onClick={() => {
                                window.history.replaceState(
                                  null,
                                  'SciSight',
                                  `/search?query=${query}`
                                )
                                window.location.reload()
                              }}
                            >
                              {query}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col gap-y-2">
                    <h2>Queries to explore and discover</h2>
                    <ul className="marker:text-green space-y-4 flex flex-col justify-start list-outside list-disc ml-6">
                      {relatedQueries.slice(Math.ceil(relatedQueries.length / 2)).map((query) => (
                        <li key={query}>
                          <p
                            className="underline underline-offset-4 cursor-pointer"
                            onClick={() => {
                              window.history.replaceState(
                                null,
                                'SciSight',
                                `/search?query=${query}`
                              )
                              window.location.reload()
                            }}
                          >
                            {query}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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

import { getFieldMetadata, getOccupationMetadata } from '@/library/metadata'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import SearchForm from '@/components/home/search-form'

export default function Loading({
  predictedQuery
}: {
  predictedQuery: { occupation: string; field: string; input: string }
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-start p-10 gap-y-4">
      {/* improve */}
      <SearchForm />
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

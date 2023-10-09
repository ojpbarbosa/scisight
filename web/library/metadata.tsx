import { BiRocket, BiGroup, BiUser, BiCloud, BiPlusMedical } from 'react-icons/bi'

import { Badge } from '@/components/ui/badge'

export function getContextMetadata(context: string) {
  return (
    <Badge
      className="rounded-full text-base font-normal bg-neutral-400/10 text-foreground dark:bg-[#202020]/40 py-1 px-3"
      variant="outline"
    >
      <span className="text-2xl">{context === 'Individual' ? <BiUser /> : <BiGroup />}</span>
      <span className="ml-1">{context}</span>
    </Badge>
  )
}

export function getFieldMetadata(field: string) {
  return (
    <Badge
      className="rounded-full text-base font-normal bg-neutral-400/10 text-foreground dark:bg-[#202020]/40 py-1 px-3 flex flex-row items-center justify-center"
      variant="outline"
    >
      <span className="text-2xl">
        {field === 'Space' ? <BiRocket /> : field === 'Health' ? <BiPlusMedical /> : <BiCloud />}
      </span>
      <span className="ml-1">{field}</span>
    </Badge>
  )
}

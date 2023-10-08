import { PiStudentFill, PiToolboxFill, PiTreeEvergreenBold } from 'react-icons/pi'
import { BiSolidRocket } from 'react-icons/bi'
import { GiHealthNormal } from 'react-icons/gi'
import { BsFillCloudSunFill } from 'react-icons/bs'

import { Badge } from '@/components/ui/badge'

export function getOccupationMetadata(occupation: string) {
  return (
    <Badge
      className="rounded-full text-base font-normal text-neutral-400 bg-[#202020]/40 py-1 px-3"
      variant="outline"
    >
      <span className="text-2xl">
        {occupation === 'Researcher' ? <PiStudentFill /> : <PiToolboxFill />}
      </span>
      <span className="ml-1">{occupation}</span>
    </Badge>
  )
}

export function getFieldMetadata(field: string) {
  return (
    <Badge
      className="rounded-full text-base font-normal text-neutral-400 bg-[#202020]/40 py-1 px-3 flex flex-row items-center justify-center"
      variant="outline"
    >
      <span className="text-2xl">
        {field === 'Ecology' ? (
          <PiTreeEvergreenBold />
        ) : field === 'Space' ? (
          <BiSolidRocket />
        ) : field === 'Health' ? (
          <GiHealthNormal />
        ) : (
          <BsFillCloudSunFill />
        )}
      </span>
      <span className="ml-1">{field}</span>
    </Badge>
  )
}

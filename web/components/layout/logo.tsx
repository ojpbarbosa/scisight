import Image from 'next/image'
import Link from 'next/link'
import SciSight from '@/public/scisight.svg'

export default function Logo() {
  return (
    <Link className="absolute z-10 top-10 left-10" href="/">
      <Image src={SciSight} alt="SciSight" className="sm:w-2/3 w-1/2" />
    </Link>
  )
}

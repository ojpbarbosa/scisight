import Image from 'next/image'
import Link from 'next/link'
import SciSight from '@/public/images/scisight.svg'

export default function Logo() {
  return (
    <Link className="absolute z-10 top-10 sm:top-8 left-10" href="/">
      <Image src={SciSight} alt="SciSight" className="w-32 md:w-40" />
    </Link>
  )
}

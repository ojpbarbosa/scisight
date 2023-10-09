import Image from 'next/image'
import Link from 'next/link'
import SciSight from '@/public/images/scisight.svg'

export default function Logo() {
  return (
    <Link className="absolute z-10 top-[38px] 2xl:top-8 left-10" href="/">
      <Image src={SciSight} alt="SciSight" className="w-32 2xl:w-40" />
    </Link>
  )
}

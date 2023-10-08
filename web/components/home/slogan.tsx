'use client'

import { Space_Grotesk } from 'next/font/google'
import { cn } from '@/library/utilities'
import { TypeAnimation } from 'react-type-animation'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function Slogan() {
  return (
    <h1
      className={cn(
        'text-transparent sm:p-0 p-7 sm:max-w-[28rem] max-w-[20rem] sm:min-w-[28rem] min-w-[20rem] sm:h-[20rem] h-[24rem] sm:-mt-0 -mt-16 sm:w-1/4 bg-clip-text bg-gradient-to-br from-[#5CF825] via-[#0D9A9A] to-[#FA00FF] text-5xl sm:text-6xl',
        spaceGrotesk.className
      )}
    >
      DISCOVER HOW YOU CAN USE{` `}
      <TypeAnimation
        preRenderFirstString={true}
        sequence={[' DATA TO CHANGE THE WORLD.', 2000, ' NASA EONET TO FIND NEW SOLUTIONS.', 2000]}
        speed={50}
        repeat={Infinity}
      />
    </h1>
  )
}

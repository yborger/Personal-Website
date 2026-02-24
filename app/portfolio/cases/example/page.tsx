"use client"
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import PhaseCard from 'app/components/PhaseCard'
 import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"
import { useRef } from "react"


export default function Page() {
  return (
    <section className="">
      <h1 className="title font-semibold text-2xl tracking-tighter">
        EXAMPLE
      </h1>
      <div className=" gap-6 my-8 w-3/4 mx-auto place-items-center">
        <div className=' '>
          <PhaseCard
            number={1}
            title="Phase 1: Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image="/artwork/bee_leaf.png"
            bg="from-purple-400 via-pink-500 to-red-500"
          />  
        </div>
        <div className=' '>
          <PhaseCard 
            number={2}
            title="Phase 2: Nunc scelerisque"
            description="Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Donec et odio pellentesque diam volutpat commodo sed egestas."
            image="/artwork/group_hug.png"
            bg="from-green-400 via-blue-500 to-purple-500"
          />
        </div>
        <div className=' '>
          <PhaseCard 
            number={3}
            title="Phase 3: Fusce blandit"
            description="Fusce blandit odio nec enim volutpat, a efficitur nisl efficitur. Curabitur ac odio at enim efficitur commodo."
            image="/artwork/BOOp.png"
            bg="from-yellow-400 via-red-500 to-pink-500"
          />
        </div>
      </div>
    </section>
  )
}

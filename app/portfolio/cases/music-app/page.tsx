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

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}

function ParallaxCards({
  number,
  title,
  description,
  details,
  image,
  bg
}: {
  number: number
  title: string
  description: string
  details: string
  image: string
  bg: string
}){
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)

    return (
      <section className="card-container h-screen snap-start flex items-center justify-center relative">
        <div ref={ref}
          className="card-content overflow-hidden">
          <PhaseCard
            number={number}
            title={title}
            description={description}
            details={details}
            image={image}
            bg={bg}
          />
        </div>
        <motion.h2
          initial={{visibility:"hidden"}}
          animate={{visibility:"visible"}}
          style={{ y }}
          >{`#00${number}`}
          </motion.h2>
      </section>
    )
  }

export default function Page() {
  const {scrollYProgress} = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section className="">
      <div className=" gap-2 my-8 w-3/4 mx-auto place-items-center">
         <ParallaxCards 
            number={1}
            title="Phase 1: Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            details="back of the card"
            image="/artwork/bee_leaf.png"
            bg="from-purple-400 via-pink-500 to-red-500"
          />  
          <ParallaxCards 
            number={2}
            title="Phase 2: Nunc scelerisque"
            description="Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Donec et odio pellentesque diam volutpat commodo sed egestas."
            details='back of the card 2'
            image="/artwork/group_hug.png"
            bg="from-green-400 via-blue-500 to-purple-500"
          />
          <ParallaxCards 
            number={3}
            title="Phase 3: Fusce blandit"
            description="Fusce blandit odio nec enim volutpat, a efficitur nisl efficitur. Curabitur ac odio at enim efficitur commodo." 
            details="back of the card 3"
            image="/artwork/BOOp.png"
            bg="from-yellow-400 via-red-500 to-pink-500"
          />
          <motion.div className="fixed left-0 right-0 bottom-12 h-[5px] bg-emerald-300" style={{ scaleX }} />
      </div>
    </section>
  )
}

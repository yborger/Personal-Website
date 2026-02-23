
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import {motion} from "motion/react"
import PhaseCard from 'app/components/PhaseCard'


export default function Page() {
 
  return (
    <section className="project-container">
      <h1 className="title font-semibold text-2xl tracking-tighter">
        EXAMPLE
      </h1>
      <div className=" phase-container gap-6 my-8 w-3/4 mx-auto place-items-center">
          <div className="phaseOdd">
            <PhaseCard 
            number={1}
            title="Phase 1: Design"
            description="In this phase, we focused on user experience and interface design, ensuring that the product is both functional and visually appealing."
            image="/artwork/bee_leaf.png"
            bg="from-purple-400 via-pink-500 to-red-500"
          /> 
          </div>
        <div className="phaseEven">
          <PhaseCard 
            number={2}
            title="Phase 2: Development"
            description="This phase involved coding the core functionalities, integrating APIs, and ensuring the application is robust and scalable."
            image="/artwork/group_hug.png"
            bg="from-green-400 via-blue-500 to-purple-500"
          />
        </div>
        <div className="phaseOdd">

          <PhaseCard
            number={3}
            title="Phase 3: more"
            description="In this phase, we focused on user experience and interface design, ensuring that the product is both functional and visually appealing."
            image="/artwork/bee_leaf.png"
            bg="from-purple-400 via-pink-500 to-red-500"
          /> 
        </div>
        
      </div>
    </section>
  )
}

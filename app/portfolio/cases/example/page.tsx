
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import {motion} from "motion/react"
import PhaseCard from 'app/components/PhaseCard'

export const metadata = {
  "title": "EXAMPLE Title",
  "image": "/art sign.png",
  "summary": "This is a brief summary of case study 1.",
  "slug": "portfolio/cases/example"
}

export default function Page() {
  const content = `
    ## Case Study Title: ${metadata.title}
    - Summary: ${metadata.summary}
    - Image: ${metadata.image}
    // Include additional MDX content here, or static HTML
  `

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {metadata.title}
      </h1>
      <div className="grid gap-6 my-8 w-3/4 mx-auto place-items-center [grid-template-areas:'stack']">
        <div className='[grid-area:stack] z-2 '>
          <PhaseCard
            title="Phase 1: Design"
            description="In this phase, we focused on user experience and interface design, ensuring that the product is both functional and visually appealing."
            image="/artwork/bee-leaf.png"
            bg="from-purple-400 via-pink-500 to-red-500"
          />  
        </div>
        <div className='[grid-area:stack] z-1'>
          <PhaseCard 
            title="Phase 2: Development"
            description="This phase involved coding the core functionalities, integrating APIs, and ensuring the application is robust and scalable."
            image="/artwork/group-hug.png"
            bg="from-green-400 via-blue-500 to-purple-500"
          />
        </div>
        
      </div>
    </section>
  )
}

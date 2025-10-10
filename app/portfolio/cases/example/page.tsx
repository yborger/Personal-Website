
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
      <div className="flex justify-center items-center mt-2 mb-8 text-sm">
        
    <PhaseCard
        title="Phase 1: Design"
        description="In this phase, we focused on user experience and interface design, ensuring that the product is both functional and visually appealing."
        image="/concept artwork/bee-leaf/bee-v3.jpg"
        bg="from-purple-400 via-pink-500 to-red-500"
    />  
    <PhaseCard 
        title="Phase 2: Development"
        description="This phase involved coding the core functionalities, integrating APIs, and ensuring the application is robust and scalable."
        image="/concept artwork/orange/group_hug-v1.png"
        bg="from-green-400 via-blue-500 to-purple-500"
    />
      </div>
    </section>
  )
}

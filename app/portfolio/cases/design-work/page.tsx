// /portfolio/cases/case-study-1/page.tsx

import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'

export const metadata =
  {
    "title": "Concept Designing",
    "image": "/concept artwork/plant-parenthood/plant-v3.jpg",
    "summary": "This is a brief summary of the case study.",
    "slug": "design-work"
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
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        {/* You can add other metadata like date here */}
        <p>some writing in here</p>
      </div>
      
    </section>
  )
}

// /portfolio/cases/case-study-1/page.tsx

import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'

export const metadata = {
  "title": "Ablockalypse",
  "image": "/art sign.png",
  "summary": "This is a brief summary of case study 1.",
  "slug": "ablockalypse"
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
        <p>ablockalypse breakdown</p>
      </div>
      
    </section>
  )
}

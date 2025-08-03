
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import  PhaseCard  from 'app/components/phaseCard'

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
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        {/* You can add other metadata like date here */}
        <p>Do you ever feel like a plastic bag</p>
        <PhaseCard
            title={metadata.title}
            img={metadata.image}
            descrip={"im typing in words for this example"}
          />

      </div>
    </section>
  )
}

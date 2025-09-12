
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
      <div className="flex justify-center items-center mt-2 mb-8 text-sm">

        <PhaseCard
            title="the first phase"
            img={metadata.image}
            descrip={"im typing in words for this example"}
            bg='from-blue-200 to-blue-400'
          />
        <PhaseCard
          title="the second phase"
          img={metadata.image}
          descrip={"im typing in words for this example"}
          bg='from-yellow-200 to-yellow-400'
        />

      </div>
    </section>
  )
}

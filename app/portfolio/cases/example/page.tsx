
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'

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


      </div>
    </section>
  )
}

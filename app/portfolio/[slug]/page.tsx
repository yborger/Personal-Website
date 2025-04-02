import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getAllCaseStudies, getCaseStudyBySlug } from 'app/portfolio/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let caseStudies = getAllCaseStudies()  // Fetch all case studies, assuming you have this function

  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export function generateMetadata({ params }) {
  let caseStudy = getCaseStudyBySlug(params.slug)  // Fetch the specific case study by slug
  if (!caseStudy) {
    return
  }

  let {
    title,
    image,
    summary,
  } = caseStudy

  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      url: `${baseUrl}/portfolio/${caseStudy.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  }
}

export default function Portfolio({ params }) {
  let caseStudy = getCaseStudyBySlug(params.slug)  // Fetch the case study by slug

  if (!caseStudy) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Project',
            headline: caseStudy.title,
            description: caseStudy.summary,
            image: caseStudy.image
              ? `${baseUrl}${caseStudy.image}`
              : `/og?title=${encodeURIComponent(caseStudy.title)}`,
            url: `${baseUrl}/portfolio/${caseStudy.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {caseStudy.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {/* Render the publication date if you have it in metadata */}
        </p>
      </div>
      <article className="prose">
        {/* Render the case study content */}
        <CustomMDX source={caseStudy.content} />
      </article>
    </section>
  )
}

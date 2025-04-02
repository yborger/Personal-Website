import Link from 'next/link'

export default function Page() {
  const caseStudies = [
    { slug: 'example', title: 'example' },
    // Add more case studies here
  ]

  return (
    <div>
      {caseStudies.map((caseStudy) => (
        <Link key={caseStudy.slug} href={`/portfolio/cases/${caseStudy.slug}`}>
          <div>
            <h2>{caseStudy.title}</h2>
            {/* You can render more metadata here */}
          </div>
        </Link>
      ))}
    </div>
  )
}
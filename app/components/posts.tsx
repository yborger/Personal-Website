//NOTE TO SELF: THIS IS NOT THE FINAL VERSION, 
// THIS IS JUST SO THE SITE DOESN'T CRASH

import Link from 'next/link'
import { getAllCaseStudies } from 'app/portfolio/utils'

export function CaseStudies() {
  let allCaseStudies = getAllCaseStudies()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {allCaseStudies
        .sort((a, b) => a.title.localeCompare(b.title)) // Alphabetical sorting by title
        .map((caseStudy) => (
          <Link
            key={caseStudy.slug}
            className="flex flex-col items-center space-y-2"
            href={`/portfolio/${caseStudy.slug}`}
          >
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {caseStudy.title}
            </p>
            <div className="w-full h-40 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
    </div>
  )
}

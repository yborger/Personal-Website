import { sign } from 'crypto'
import Link from 'next/link'
import CaseCard from 'app/components/caseCard'
import { casesData } from './casesData'

export default function Page() {
  return (
    <div>
      <div className="gap-4 columns-3xs">
        {casesData.map((metadata, index) => (
          <CaseCard
            key={index}
            title={metadata.title}
            image={metadata.image}
            summary={metadata.summary}
            slug={metadata.slug}
          />
        ))}
      </div>
    </div>
  )
}
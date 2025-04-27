import { sign } from 'crypto'
import Link from 'next/link'
import * as allcases from './cases'
import  CaseCard  from 'app/components/caseCard'


export default function Page() {
  /* 
    reminders for later:
    --add padding to the casecard itself so the dimensions here don't get messed with
    --consider adding a transition effect in the future to move the square nicely to the following screen?

  */
  
  return (
    <div>
      <div className="gap-4 columns-3xs">
      {Object.values(allcases).map((metadata, index) => (
        <CaseCard key={index} 
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
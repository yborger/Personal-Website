import { sign } from 'crypto'
import Link from 'next/link'
import * as allcases from './cases'
import  CaseCard  from 'app/components/caseCard'


export default function Page() {
  /* (future) PAGE LAYOUT IDEA -- perfect square dissection?
    It is late but I had an idea for the layout (for the future, not now)
    Rather than make the page have to scroll, which I don't love I can make an algorithm that creates X amount of randomly sized squares, with the X amount being the amount of projects I have to show.
    I think I could use the amount of cases I have and the size of the window, maybe I would use standard window sizes (tailwind has css breakpoints sm, md, lg, xl, 2xl, and mobile-size is good) to generate patterns of squares to take up the screen space

    To do this I need to design the algorithm that takes dimensions at the breakpoints and quantity of cases.
    This will be a whole design idea.

    -This will incentivize me to increase project amount as well :)
    
    reminders for later:
    --add padding to the casecard itself so the dimensions here don't get messed with
    --consider adding a transition effect in the future to move the square nicely to the following screen?

  */
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
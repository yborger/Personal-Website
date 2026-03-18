//This is the homepage, not the layout file!
/*

Concept, reworked
- display a series of storyboard cards connected by a line/dotted line? 
- cards will be title, body, tags
- lines between cards will be the scroll progress
    - sketching out design for this
    - the outline of the cards can get filled as the user scrolls down the page? animation may be tricky here
    - alt animation -- some kind of doodle traveling the page, the line is the "path" it leaves behind

*/

import Storyboard from "./components/storyboard"
// once the storyboard is ready I can add it here -- this is so I have it ready

const storyCards= [
  {
    label: 'text1',
    title: 'title1',
    body: 'body1',
    pills: ['pill1', 'pill2']
  }
]


export default function Page() {
  return (
    <section>
      <h1 className="pt-10 ml-4 mb-8 text-2xl font-semibold tracking-tighter">
        home
      </h1>
      <p className="ml-4 mb-4 ">
      {'home page content coming soon...'}
      </p>
    </section>
  )
}

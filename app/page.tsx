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

import Storyboard from './components/storyboard'

const storyCards = [
  {
    label: 'Greeting',
    title: "Hi, I'm Yael",
    body: 'should i put the focus here like a tagline.',
    tags: ['Front End', 'UI / UX'],
    color: '#B8A9E8',
  },
  {
    label: 'Background',
    title: 'Driven by problem-solving',
    body: 'A curiosity for how things work and why things are the way they are.',
    tags: ['JavaScript', 'Python', 'React', 'HTML/CSS'],
    color: '#8EB4E8',
  },
  {
    label: 'Focus',
    title: 'Creating experiences that feel right',
    body: 'Make interfaces feel intentional and alive.',
    tags: ['Web dev', 'Design'],
    color: '#6DCFCC',
  },
  {
    label: 'Work',
    title: 'See the portfolio',
    body: 'lorem ipsum dolor sit amet.',
    tags: ['lorem ipsum'],
    color: '#A8EDCA',
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <Storyboard cards={storyCards} />
    </section>
  )
}
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
    title: "Hi, I'm Yael Borger",
    body: 'should i put the focus here like a tagline.',
    tags: ['Front End', 'Full Stack', 'UI / UX'],
    color: '#7F77DD',
  },
  {
    label: 'Background',
    title: 'Driven by problem-solving',
    body: 'A curiosity for how things work led .',
    tags: ['JavaScript', 'Python', 'React', 'HTML/CSS'],
    color: '#D4537E',
  },
  {
    label: 'Focus',
    title: 'Crafting experiences that feel right',
    body: 'Frontend craft meets UX thinking — the details that make interfaces feel intentional and alive.',
    tags: ['Web dev', 'Design'],
    color: '#1D9E75',
  },
  {
    label: 'Work',
    title: 'See the portfolio',
    body: 'lorem ipsum dolor sit amet.',
    tags: ['lorem ipsum'],
    color: '#378ADD',
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <Storyboard cards={storyCards} />
    </section>
  )
}
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
    label: 'Hello',
    title: "Hi, I'm Yael Borger",
    body: 'Software developer from New Jersey, building things for the web.',
    pills: ['Full stack', 'UI / UX'],
    color: '#7F77DD',
  },
  {
    label: 'Background',
    title: 'Driven by problem-solving',
    body: 'A curiosity for how things work led me across the full stack — backend systems to polished interfaces.',
    pills: ['JavaScript', 'Python', 'React'],
    color: '#D4537E',
  },
  {
    label: 'Focus',
    title: 'Crafting experiences that feel right',
    body: 'Frontend craft meets UX thinking — the details that make interfaces feel intentional and alive.',
    pills: ['Web dev', 'Animation', 'Design'],
    color: '#1D9E75',
  },
  {
    label: 'Work',
    title: 'See the portfolio',
    body: 'Projects ranging from small apps to complex software — each one teaching something new.',
    pills: ['View projects'],
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
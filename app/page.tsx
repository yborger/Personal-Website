//This is the homepage, not the layout file!
/*

  Concept for part of the homepage -- animate signature
    https://examples.motion.dev/react/motion-path/tutorial
    -animate signature
    -"solidify" signature
    -minimize and move it to the logo spot

    
  Other add-ons:
    - 1 phrase describe my work 
    - a featured project on the home page
    - it's a landing page i don't know what else i may want on it
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

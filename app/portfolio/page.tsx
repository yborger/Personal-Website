import { sign } from 'crypto'
import Link from 'next/link'
import { exampleData, okrData, musicData, designData } from './cases'


export default function Page() {
  const caseStudies = [
    exampleData, okrData, musicData, designData
  ]
  /* former metadata structure
  const caseStudies = [
    { slug: 'example', title: 'example', image: 'art sign.png' },
    { slug: 'design_work', title: 'Concept Designing', image: "/concept artwork/plant-parenthood/plant-v3.jpg"},
    { slug: 'music-app', title: 'Music App', image: "/music-app/watch concept 3.jpg" },
    { slug: 'ourkidsread', title: 'Our Kids Read: Website Redesign', image: "art sign.png" },

    // Add more case studies here
  ]
  */
  return (
    <div>
      {caseStudies.map((caseStudy) => (
        <Link key={caseStudy.slug} href={`/portfolio/cases/${caseStudy.slug}`}>
          <div>
            <h2>{caseStudy.title}</h2>
            {/* You can render more metadata here */}
            <img 
              src={caseStudy.image} 
              className="w-5 h-auto rounded-sm" />
          </div>
        </Link>

      ))}
    </div>
  )
}
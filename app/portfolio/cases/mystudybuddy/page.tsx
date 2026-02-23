
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'


export default function Page() {
  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        MyStudyBuddy
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        {/* You can add other metadata like date here */}
        <p>msb write-up but in portfolio style instead of reflection</p>
      </div>
      
    </section>
  )
}

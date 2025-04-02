import { CaseStudies } from 'app/components/posts'

export const metadata = {
  title: 'Portfolio',
  description: 'Check out my Portfolio.',
}

export default function Page() {
  return (
    <section>
      <h1 className="ml-4 font-semibold text-2xl mb-8 tracking-tighter">portfolio</h1>
      <CaseStudies />
    </section>
  )
}

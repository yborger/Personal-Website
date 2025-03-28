//This is the homepage, not the layout file!

import { Posts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        HOME
      </h1>
      <p className="mb-4">
      {'TEXT TEXT'}
      </p>

      <div className="my-8">
        <Posts />
      </div>
    </section>
  )
}

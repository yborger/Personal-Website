"use client"
import { useState } from "react"
import CaseCard from 'app/components/caseCard'
import { casesData } from './casesData'

const filterOptions = ["All Projects", "Software", "UI / UX"]

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("All Projects")

  const filtered = activeFilter === "All Projects"
    ? casesData
    : casesData.filter(c => c.tags.includes(activeFilter))

  const columnClass = filtered.length >= 9 ? 'columns-3' : 'columns-2'

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="flex items-center gap-3 mb-10">
        <select
          value={activeFilter}
          onChange={e => setActiveFilter(e.target.value)}
          className="text-2xl bg-transparent focus:outline-none cursor-grab"
        >
          {filterOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className={`w-full max-w-5xl mx-auto px-4 gap-4 ${columnClass}`}>
        {filtered.map((metadata, index) => (
          <CaseCard
            key={index}
            title={metadata.title}
            image={metadata.image}
            summary={metadata.summary}
            slug={metadata.slug}
            tags={metadata.tags}
          />
        ))}
      </div>
    </div>
  )
}
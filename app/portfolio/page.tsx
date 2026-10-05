"use client"
import { useState } from "react"
import CaseBoard from 'app/components/caseboard'
import { casesData } from './casesData'

const filterOptions = ["All Projects", "Software", "UI / UX"]

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("All Projects")

  const filtered = activeFilter === "All Projects"
    ? casesData
    : casesData.filter(c => c.tags.includes(activeFilter))

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

      <CaseBoard cards={filtered} />
    </div>
  )
}
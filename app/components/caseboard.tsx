/*
  CASE BOARD -- makes the scrolling line that ties together the individual cards on the portfolio page
    appears on portfolio's page.tsx
*/

'use client'
import { useEffect, useRef } from 'react'
import CaseCard from './caseCard'

type CaseData = {
  title: string
  image?: string
  summary: string
  slug: string
  tags?: string[]
  demo?: string
}

export default function CaseBoard({ cards }: { cards: CaseData[] }) {
  const svgRef      = useRef<SVGSVGElement>(null)
  const drawnRef    = useRef<SVGPathElement>(null)
  const trackRef    = useRef<SVGPathElement>(null)
  const ghostRef    = useRef<SVGPathElement | null>(null)
  const totalLenRef = useRef<number>(0)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  function coloration(a: string, b: string, t: number) {
    const ah = parseInt(a.slice(1), 16)
    const bh = parseInt(b.slice(1), 16)
    const ar = (ah >> 16) & 255, ag = (ah >> 8) & 255, ab = ah & 255
    const br = (bh >> 16) & 255, bg = (bh >> 8) & 255, bb = bh & 255
    return '#' + [ar+(br-ar)*t, ag+(bg-ag)*t, ab+(bb-ab)*t]
      .map(v => Math.round(v).toString(16).padStart(2,'0')).join('')
  }

  const colorStops = ['#B8A9E8', '#8EB4E8', '#6DCFCC', '#7DE8C0', '#A8EDCA']

  function buildPath(): string {
    const points: string[] = []
    const refs = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (refs.length === 0) return ''

    const cols      = window.innerWidth >= 768 ? 2 : 1
    const slack     = 20
    const stringY   = 0
    const docHeight = document.body.scrollHeight

    const rows: HTMLDivElement[][] = []
    for (let i = 0; i < refs.length; i += cols) {
      rows.push(refs.slice(i, i + cols))
    }

    rows.forEach((row, rowI) => {
      const rowTop    = row[0].offsetTop + stringY
      const leftmost  = row[0].offsetLeft
      const rightmost = row[row.length - 1].offsetLeft + row[row.length - 1].offsetWidth
      const midX      = (leftmost + rightmost) / 2

      if (rowI === 0) {
        points.push(`M ${leftmost} ${rowTop}`)
      } else {
        const prevRow    = rows[rowI - 1]
        const prevRowTop = prevRow[0].offsetTop + stringY
        const prevRight  = prevRow[prevRow.length - 1].offsetLeft + prevRow[prevRow.length - 1].offsetWidth
        // wrap from end of previous row down to start of this row
        points.push(`C ${prevRight} ${prevRowTop + 40}, ${leftmost} ${rowTop - 40}, ${leftmost} ${rowTop}`)
      }

      // one gentle sag across the full row
      points.push(`Q ${midX} ${rowTop + slack}, ${rightmost} ${rowTop}`)

      if (rowI === rows.length - 1) {
        points.push(`C ${rightmost + 40} ${rowTop}, ${rightmost + 40} ${docHeight}, ${rightmost} ${docHeight}`)
      }
    })

    return points.join(' ')
  }

  function applyPath() {
    const svg   = svgRef.current
    const drawn = drawnRef.current
    const track = trackRef.current
    if (!svg || !drawn || !track) return

    const PATH = buildPath()
    if (!PATH) return

    track.setAttribute('d', PATH)
    drawn.setAttribute('d', PATH)

    const existing = ghostRef.current
    if (existing && svg.contains(existing)) svg.removeChild(existing)

    const ghost = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    ghost.setAttribute('d', PATH)
    ghost.setAttribute('fill', 'none')
    ghost.style.visibility = 'hidden'
    svg.appendChild(ghost)
    ghostRef.current = ghost

    const totalLen = ghost.getTotalLength()
    totalLenRef.current = totalLen
    drawn.style.strokeDasharray  = String(totalLen)
    drawn.style.strokeDashoffset = String(totalLen)
  }

  function onScroll() {
    const totalLen = totalLenRef.current
    const ghost    = ghostRef.current
    if (!totalLen || !ghost) return

    const scrollTop  = window.scrollY
    const viewHeight = window.innerHeight
    const docHeight  = document.body.scrollHeight - viewHeight
    const progress   = Math.min(scrollTop / docHeight, 1)

    const drawLen = totalLen * progress
    const drawn   = drawnRef.current
    if (drawn) drawn.style.strokeDashoffset = String(totalLen - drawLen)
  }

  useEffect(() => {
    const handleResize = () => { applyPath(); onScroll() }

    setTimeout(() => {
      applyPath()
      onScroll()
    }, 100)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [cards])

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
            {colorStops.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / (colorStops.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
        <path ref={trackRef} fill="none" stroke="rgba(184,169,232,0.1)" strokeWidth="2.5" />
        <path
          ref={drawnRef}
          fill="none"
          stroke="url(#cg)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
          >
            <CaseCard
              title={card.title}
              image={card.image}
              summary={card.summary}
              slug={card.slug}
              tags={card.tags}
              demo={card.demo}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
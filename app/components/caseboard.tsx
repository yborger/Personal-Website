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
  const walkerRef   = useRef<SVGCircleElement>(null)
  const outerRef    = useRef<SVGCircleElement>(null)
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

  function gradColor(t: number) {
    const segments = colorStops.length - 1
    const scaled   = t * segments
    const i        = Math.min(Math.floor(scaled), segments - 1)
    return coloration(colorStops[i], colorStops[i + 1], scaled - i)
  }

  function buildPath(): string {
    const points: string[] = []
    const refs = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (refs.length === 0) return ''

    const cols      = window.innerWidth >= 768 ? 2 : 1
    const slack     = 28
    const anchorPad = 16
    const stringY   = 150
    const docHeight = document.body.scrollHeight

    const rows: HTMLDivElement[][] = []
    for (let i = 0; i < refs.length; i += cols) {
      rows.push(refs.slice(i, i + cols))
    }

    rows.forEach((row, rowI) => {
      const rowTop    = row[0].offsetTop + stringY
      const leftmost  = row[0].offsetLeft - anchorPad
      const rightmost = row[row.length - 1].offsetLeft + row[row.length - 1].offsetWidth + anchorPad

      const anchors: number[] = [leftmost]
      row.forEach((card, ci) => {
        if (ci < row.length - 1) {
          const thisRight = card.offsetLeft + card.offsetWidth
          const nextLeft  = row[ci + 1].offsetLeft
          anchors.push((thisRight + nextLeft) / 2)
        }
      })
      anchors.push(rightmost)

      if (rowI === 0) {
        // lead-in from above like storyboard
        const midX = (leftmost + rightmost) / 2
        points.push(`M ${midX} ${-50}`)
        points.push(`C ${midX} ${rowTop * 0.4}, ${midX} ${rowTop * 0.8}, ${leftmost} ${rowTop}`)
      } else {
        const prevRow    = rows[rowI - 1]
        const prevRowTop = prevRow[0].offsetTop + stringY
        const prevRight  = prevRow[prevRow.length - 1].offsetLeft + prevRow[prevRow.length - 1].offsetWidth + anchorPad
        points.push(`C ${prevRight} ${prevRowTop + 50}, ${leftmost} ${rowTop - 50}, ${leftmost} ${rowTop}`)
      }

      for (let ai = 0; ai < anchors.length - 1; ai++) {
        const x0   = anchors[ai]
        const x1   = anchors[ai + 1]
        const midX = (x0 + x1) / 2
        points.push(`Q ${midX} ${rowTop + slack}, ${x1} ${rowTop}`)
      }

      if (rowI === rows.length - 1) {
        points.push(`C ${rightmost + 40} ${rowTop}, ${rightmost + 40} ${docHeight}, ${rightmost} ${docHeight}`)
      }
    })

    return points.join(' ')
  }

  function applyPath(
    svg:   SVGSVGElement,
    drawn: SVGPathElement,
    track: SVGPathElement,
  ) {
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

  function onScroll(
    drawn:  SVGPathElement,
    walker: SVGCircleElement,
    outer:  SVGCircleElement,
  ) {
    const totalLen = totalLenRef.current
    const ghost    = ghostRef.current
    if (!totalLen || !ghost) return

    const scrollTop  = window.scrollY
    const viewHeight = window.innerHeight
    const refs       = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    const cols       = window.innerWidth >= 768 ? 2 : 1

    const rows: HTMLDivElement[][] = []
    for (let i = 0; i < refs.length; i += cols) {
      rows.push(refs.slice(i, i + cols))
    }

    const rowCount = rows.length
    const segLen   = totalLen / rowCount
    let drawLen    = 0

    rows.forEach((row) => {
      const rowTop     = row[0].offsetTop
      const rowHeight  = Math.max(...row.map(c => c.offsetHeight))
      const rowCenter  = rowTop + rowHeight / 2
      const viewCenter = scrollTop + viewHeight / 2

      const distFromCenter = (viewCenter - rowCenter) / viewHeight
      const clamped  = Math.max(-0.5, Math.min(0.5, distFromCenter))
      const segProg  = clamped + 0.5
      drawLen += segProg * segLen
    })

    drawLen = Math.min(drawLen, totalLen)
    drawn.style.strokeDashoffset = String(totalLen - drawLen)

    const pt  = ghost.getPointAtLength(drawLen)
    const col = gradColor(drawLen / totalLen)

    walker.setAttribute('cx', String(pt.x))
    walker.setAttribute('cy', String(pt.y))
    walker.setAttribute('fill', col)
    walker.setAttribute('opacity', drawLen > 10 ? '1' : '0')
    outer.setAttribute('cx', String(pt.x))
    outer.setAttribute('cy', String(pt.y))
    outer.setAttribute('stroke', col)
    outer.setAttribute('opacity', drawLen > 10 ? '0.35' : '0')
  }

  useEffect(() => {
    const svg    = svgRef.current
    const drawn  = drawnRef.current
    const track  = trackRef.current
    const walker = walkerRef.current
    const outer  = outerRef.current
    if (!svg || !drawn || !track || !walker || !outer) return

    const handleScroll = () => onScroll(drawn, walker, outer)
    const handleResize = () => {
      applyPath(svg, drawn, track)
      onScroll(drawn, walker, outer)
    }

    applyPath(svg, drawn, track)
    onScroll(drawn, walker, outer)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [cards])

  useEffect(() => {
    const timer = setTimeout(() => {
      const first = cardRefs.current[0]
      if (!first) return

      const targetY  = first.offsetTop - window.innerHeight * 0.5 + 1000
      const startY   = window.scrollY
      const distance = targetY - startY
      const duration = 2000
      let startTime: number | null = null

      function easeInOut(t: number): number {
        return t < 0.5
          ? 2 * t * t
          : -1 + (4 - 2 * t) * t
      }

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp
        const elapsed  = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        window.scrollTo(0, startY + distance * easeInOut(progress))
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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
        <path ref={trackRef} fill="none" stroke="rgba(184,169,232,0.1)" strokeWidth="4" />
        <path
          ref={drawnRef}
          fill="none"
          stroke="url(#cg)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
        <circle ref={walkerRef} r="6" fill="#B8A9E8" opacity="0" />
        <circle ref={outerRef}  r="10" fill="none" stroke="#B8A9E8" strokeWidth="1.5" opacity="0" />
      </svg>

      {/* spacer for lead-in animation */}
      <div className="h-[120vh]" />

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
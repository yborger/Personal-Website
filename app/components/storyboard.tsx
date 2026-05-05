'use client'
import { useEffect, useRef } from 'react'
import StoryCard from './storycard'

type CardData = {
  label: string
  title: string
  body: string
  pills: string[]
  color: string
}

export default function StoryBoard({ cards }: { cards: CardData[] }) {
  const svgRef      = useRef<SVGSVGElement>(null)
  const drawnRef    = useRef<SVGPathElement>(null)
  const trackRef    = useRef<SVGPathElement>(null)
  const walkerRef   = useRef<SVGCircleElement>(null)
  const outerRef    = useRef<SVGCircleElement>(null)
  const hintRef     = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const ghostRef    = useRef<SVGPathElement | null>(null)
  const totalLenRef = useRef<number>(0)

  useEffect(() => {
    const svg    = svgRef.current
    const drawn  = drawnRef.current
    const track  = trackRef.current
    const walker = walkerRef.current
    const outer  = outerRef.current
    const hint   = hintRef.current
    if (!svg || !drawn || !track || !walker || !outer || !hint) return

    function buildPath(svg: SVGSVGElement): string {
      const svgRect  = svg.getBoundingClientRect()
      const scrollY  = window.scrollY        // current scroll offset
      const swing    = 48
      const outset   = 12
      const r        = 16
      const points: string[] = []

      // total document height so the path ends at the bottom of the page
      const docHeight = document.body.scrollHeight

      points.push(`M ${svgRect.width / 2} 0`)

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        const cardRect = card.getBoundingClientRect()

        // add scrollY to convert viewport-relative to document-relative
        const top    = (cardRect.top    + scrollY) - outset
        const bottom = (cardRect.bottom + scrollY) + outset
        const left   = (cardRect.left   - svgRect.left) - outset
        const right  = (cardRect.right  - svgRect.left) + outset

        const isRight   = i % 2 === 0
        const approachX = isRight ? left - swing : right + swing

        const prevBottom = i === 0
          ? 0
          : (() => {
              const prev = cardRefs.current[i - 1]
              if (!prev) return top
              const pr = prev.getBoundingClientRect()
              return (pr.bottom + scrollY) + outset
            })()

        const travelMid = prevBottom + (top - prevBottom) * 0.5

        points.push(`C ${approachX} ${prevBottom + 40}, ${approachX} ${travelMid - 30}, ${approachX} ${travelMid}`)
        points.push(`C ${approachX} ${travelMid + 30}, ${approachX} ${top - 20}, ${approachX} ${top - 20}`)

        if (isRight) {
          points.push(`L ${approachX} ${top + r}`)
          points.push(`Q ${approachX} ${top}, ${left + r} ${top}`)
          points.push(`L ${right - r} ${top}`)
          points.push(`Q ${right} ${top}, ${right} ${top + r}`)
          points.push(`L ${right} ${bottom - r}`)
          points.push(`Q ${right} ${bottom}, ${right - r} ${bottom}`)
          points.push(`L ${left + r} ${bottom}`)
          points.push(`Q ${left} ${bottom}, ${left} ${bottom - r}`)
          points.push(`L ${left} ${top + r}`)
          points.push(`Q ${left} ${top}, ${left + r} ${top}`)
          points.push(`L ${approachX} ${bottom + 20}`)
        } else {
          points.push(`L ${approachX} ${top + r}`)
          points.push(`Q ${approachX} ${top}, ${right - r} ${top}`)
          points.push(`L ${left + r} ${top}`)
          points.push(`Q ${left} ${top}, ${left} ${top + r}`)
          points.push(`L ${left} ${bottom - r}`)
          points.push(`Q ${left} ${bottom}, ${left + r} ${bottom}`)
          points.push(`L ${right - r} ${bottom}`)
          points.push(`Q ${right} ${bottom}, ${right} ${bottom - r}`)
          points.push(`L ${right} ${top + r}`)
          points.push(`Q ${right} ${top}, ${right - r} ${top}`)
          points.push(`L ${approachX} ${bottom + 20}`)
        }
      })

      const lastCard   = cardRefs.current[cardRefs.current.length - 1]
      const lastBottom = lastCard
        ? (lastCard.getBoundingClientRect().bottom + scrollY) + outset
        : docHeight

      points.push(`C ${svgRect.width / 2} ${lastBottom + 60}, ${svgRect.width / 2} ${lastBottom + 120}, ${svgRect.width / 2} ${docHeight}`)

      return points.join(' ')
    }

    function applyPath(
      svg:   SVGSVGElement,
      drawn: SVGPathElement,
      track: SVGPathElement,
    ) {
      const PATH = buildPath(svg)
      if (!PATH) return

      track.setAttribute('d', PATH)
      drawn.setAttribute('d', PATH)

      const existing = ghostRef.current
      if (existing && svg.contains(existing)) {
        svg.removeChild(existing)
      }

      const ghost = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      ghost.setAttribute('d', PATH)
      ghost.setAttribute('fill', 'none')
      ghost.style.visibility = 'hidden'
      svg.appendChild(ghost)
      ghostRef.current = ghost

      const totalLen       = ghost.getTotalLength()
      totalLenRef.current  = totalLen
      drawn.style.strokeDasharray  = String(totalLen)
      drawn.style.strokeDashoffset = String(totalLen)
    }

    function coloration(a: string, b: string, t: number) {
      const ah = parseInt(a.slice(1), 16)
      const bh = parseInt(b.slice(1), 16)
      const ar = (ah >> 16) & 255, ag = (ah >> 8) & 255, ab = ah & 255
      const br = (bh >> 16) & 255, bg = (bh >> 8) & 255, bb = bh & 255
      return '#' + [ar+(br-ar)*t, ag+(bg-ag)*t, ab+(bb-ab)*t]
        .map(v => Math.round(v).toString(16).padStart(2,'0')).join('')
    }
    const colorStops = cards.map(c => c.color)

    function gradColor(t: number) {
      const segments = colorStops.length - 1
      const scaled   = t * segments
      const i        = Math.min(Math.floor(scaled), segments - 1)
      return coloration(colorStops[i], colorStops[i + 1], scaled - i)
    }

    function onScroll(
      drawn:  SVGPathElement,
      walker: SVGCircleElement,
      outer:  SVGCircleElement,
      hint:   HTMLDivElement,
    ) {
      const totalLen = totalLenRef.current
      const ghost    = ghostRef.current
      if (!totalLen || !ghost) return

      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const prog      = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0
      const drawLen   = prog * totalLen

      drawn.style.strokeDashoffset = String(totalLen - drawLen)

      const pt = ghost.getPointAtLength(drawLen)
      walker.setAttribute('cx', String(pt.x))
      walker.setAttribute('cy', String(pt.y))
      outer.setAttribute('cx', String(pt.x))
      outer.setAttribute('cy', String(pt.y))

      const col = gradColor(prog)
      walker.setAttribute('fill', col)
      outer.setAttribute('stroke', col)
      walker.setAttribute('opacity', prog > 0.005 ? '1' : '0')
      outer.setAttribute('opacity',  prog > 0.005 ? '0.35' : '0')

      cardRefs.current.forEach(card => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight + 60) {
          card.classList.add('opacity-100', 'translate-y-0')
          card.classList.remove('opacity-0', 'translate-y-3')
        }
      })

      hint.style.opacity = prog > 0.04 ? '0' : '1'
    }

    // bind the guarded non-null values into the listeners at registration time
    const handleScroll = () => onScroll(drawn, walker, outer, hint)
    const handleResize = () => applyPath(svg, drawn, track)

    applyPath(svg, drawn, track)

    const first = cardRefs.current[0]
    if (first) {
      first.classList.add('opacity-100', 'translate-y-0')
      first.classList.remove('opacity-0', 'translate-y-3')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [cards])

  return (
    <div className="relative w-full" style={{ minHeight: '100%' }}>

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
        }}
      >
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            {cards.map((card, i) => (
              <stop
                key={card.label}
                offset={`${(i / (cards.length - 1)) * 100}%`}
                stopColor={card.color}
              />
            ))}
          </linearGradient>
        </defs>
        <path
          ref={trackRef}
          fill="none"
          stroke="rgba(127,119,221,0.1)"
          strokeWidth="2.5"
        />
        <path
          ref={drawnRef}
          fill="none"
          stroke="url(#lg)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
        <circle ref={walkerRef} r="10" fill="#7F77DD" opacity="0" />
        <circle ref={outerRef}  r="16" fill="none" stroke="#7F77DD" strokeWidth="1.5" opacity="0" />
      </svg>

      {cards.map((card, i) => (
        <StoryCard
          key={card.label}
          index={i}
          label={card.label}
          title={card.title}
          body={card.body}
          pills={card.pills}
          color={card.color}
          cardRef={el => { cardRefs.current[i] = el }}
        />
      ))}

      <div
        ref={hintRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-neutral-400 flex items-center gap-1.5 pointer-events-none transition-opacity duration-300"
      >
        <span className="block w-2 h-2 border-r border-b border-neutral-400 rotate-45" />
        scroll
      </div>

    </div>
  )
}
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
  const svgRef    = useRef<SVGSVGElement>(null)
  const drawnRef  = useRef<SVGPathElement>(null)
  const trackRef  = useRef<SVGPathElement>(null)
  const walkerRef = useRef<SVGCircleElement>(null)
  const outerRef  = useRef<SVGCircleElement>(null)
  const hintRef   = useRef<HTMLDivElement>(null)
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])
  const ghostRef  = useRef<SVGPathElement | null>(null)
  const totalLenRef = useRef<number>(0)

  function buildPath() {
    const svg = svgRef.current
    if (!svg) return ''

    // the SVG bounding rect -- actual pixel dimensions
    const svgRect = svg.getBoundingClientRect()

    // margin from the far edge of each card to where the line swings out to
    const swing = 32

    const points: string[] = []
    points.push(`M ${svgRect.width / 2} 0`)

    cardRefs.current.forEach((card, i) => {
      if (!card) return

      const cardRect = card.getBoundingClientRect()

      // convert card's viewport position into SVG-relative coordinates
      const top    = cardRect.top    - svgRect.top
      const bottom = cardRect.bottom - svgRect.top
      const left   = cardRect.left   - svgRect.left
      const right  = cardRect.right  - svgRect.left
      const midY   = (top + bottom) / 2

      const isRight = i % 2 === 0

      // the far edge the line swings out to — opposite side from the card
      const swingX = isRight
        ? left - swing        // card is on the right, line swings left
        : right + swing       // card is on the left, line swings right

      const prevBottom = i === 0
        ? 0
        : (() => {
            const prev = cardRefs.current[i - 1]
            if (!prev) return top
            const r = prev.getBoundingClientRect()
            return r.bottom - svgRect.top
          })()

      const travelMid = prevBottom + (top - prevBottom) * 0.5

      // curve from previous position, swing out to opposite side, approach card
      points.push(`C ${swingX} ${prevBottom + 40}, ${swingX} ${travelMid - 30}, ${swingX} ${travelMid}`)
      points.push(`C ${swingX} ${travelMid + 30}, ${swingX} ${top - 20}, ${swingX} ${top}`)

      // run down the far edge of the card
      points.push(`C ${swingX} ${top + 30}, ${swingX} ${midY - 20}, ${swingX} ${midY}`)
      points.push(`C ${swingX} ${midY + 20}, ${swingX} ${bottom - 20}, ${swingX} ${bottom}`)
    })

    const lastCard = cardRefs.current[cardRefs.current.length - 1]
    const lastBottom = lastCard
      ? lastCard.getBoundingClientRect().bottom - svgRect.top
      : svgRect.height

    points.push(`C ${svgRect.width / 2} ${lastBottom + 60}, ${svgRect.width / 2} ${lastBottom + 120}, ${svgRect.width / 2} ${svgRect.height}`)

    return points.join(' ')
  }

  function applyPath() {
    const svg    = svgRef.current
    const drawn  = drawnRef.current
    const track  = trackRef.current
    if (!svg || !drawn || !track) return

    const PATH = buildPath()
    if (!PATH) return

    track.setAttribute('d', PATH)
    drawn.setAttribute('d', PATH)

    // remove old ghost if one exists
    if (ghostRef.current) {
      svg.removeChild(ghostRef.current)
    }

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

  useEffect(() => {
    const svg    = svgRef.current
    const drawn  = drawnRef.current
    const track  = trackRef.current
    const walker = walkerRef.current
    const outer  = outerRef.current
    const hint   = hintRef.current
    if (!svg || !drawn || !track || !walker || !outer || !hint) return

    // build path once on mount after cards have rendered
    applyPath()

    function lerpColor(a: string, b: string, t: number) {
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
      return lerpColor(colorStops[i], colorStops[i + 1], scaled - i)
    }

    function onScroll() {
      const totalLen = totalLenRef.current
      if (!totalLen) return

      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const prog      = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0
      const drawLen   = prog * totalLen

      drawn.style.strokeDashoffset = String(totalLen - drawLen)

      const ghost = ghostRef.current
      if (ghost) {
        const pt = ghost.getPointAtLength(drawLen)
        const cx = String(pt.x)
        const cy = String(pt.y)
        walker.setAttribute('cx', cx)
        walker.setAttribute('cy', cy)
        outer.setAttribute('cx', cx)
        outer.setAttribute('cy', cy)
      }

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

    // rebuild path on resize so it always hugs the actual card positions
    function onResize() {
      applyPath()
    }

    const first = cardRefs.current[0]
    if (first) {
      first.classList.add('opacity-100', 'translate-y-0')
      first.classList.remove('opacity-0', 'translate-y-3')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [cards])

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        // no viewBox — coordinates are in real pixels now
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
        <circle ref={walkerRef} r="7"  fill="#7F77DD" opacity="0" />
        <circle ref={outerRef}  r="12" fill="none" stroke="#7F77DD" strokeWidth="1" opacity="0" />
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
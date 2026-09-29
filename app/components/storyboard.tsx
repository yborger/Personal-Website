/* 
  STORY BOARD -- makes the scrolling line that ties together the individual cards on the landing page
    appears on landing/home page
*/

'use client'
import { useEffect, useRef } from 'react'
import StoryCard from './storycard'

type CardData = {
  label: string
  title: string
  body: string
  tags: string[],
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
  const exitOffsetsRef = useRef<number[]>([])

  useEffect(() => {
    const svg    = svgRef.current
    const drawn  = drawnRef.current
    const track  = trackRef.current
    const walker = walkerRef.current
    const outer  = outerRef.current
    const hint   = hintRef.current
    if (exitOffsetsRef.current.length === 0){
        exitOffsetsRef.current = cards.map(() => 0.2 + Math.random() * 0.6)
    }
    if (!svg || !drawn || !track || !walker || !outer || !hint) return

  function buildPath(svg: SVGSVGElement): string {
  const outset  = 12
  const r       = 16
  const points: string[] = []

  const docHeight = document.body.scrollHeight

  cardRefs.current.forEach((card, i) => {
    if (!card) return

    const top    = card.offsetTop    - outset
    const bottom = card.offsetTop + card.offsetHeight + outset
    const offset = i % 2 === 0 ? 20: -20
    const left   = card.offsetLeft   - outset + offset
    const right  = card.offsetLeft + card.offsetWidth  + outset + offset
    const width  = right - left

    const entryFrac = exitOffsetsRef.current[i] ?? 0.5
    const entryX = left + width * entryFrac

    const exitFrac = exitOffsetsRef.current[i+1] ?? 0.5
    const exitX = left + width * exitFrac

    const clockwise = i % 2 === 0

    if (i === 0){
      points.push(`M ${entryX} ${-100}`)
      points.push(`C ${entryX} ${top * 0.4}, ${entryX} ${top * 0.8}, ${entryX} ${top + r}`)
    } else {
      const prevCard = cardRefs.current[i - 1]
      const prevBottom = prevCard ? prevCard.offsetTop + prevCard.offsetHeight + outset : top
      // control points stay between the two cards, not pushing into the next
      points.push(`C ${exitX} ${prevBottom + (top - prevBottom) * 0.3}, ${entryX} ${top - (top - prevBottom) * 0.3}, ${entryX} ${top + r}`)
    }

    if (clockwise) {
      // CLOCKWISE: entry → right along top → down right → left along bottom → up left → second pass
      points.push(`Q ${entryX} ${top}, ${entryX + r} ${top}`)
      points.push(`L ${right - r} ${top}`)
      points.push(`Q ${right} ${top}, ${right} ${top + r}`)
      points.push(`L ${right} ${bottom - r}`)
      points.push(`Q ${right} ${bottom}, ${right - r} ${bottom}`)
      points.push(`L ${left + r} ${bottom}`)
      points.push(`Q ${left} ${bottom}, ${left} ${bottom - r}`)
      points.push(`L ${left} ${top + r}`)
      points.push(`Q ${left} ${top}, ${left + r} ${top}`)
      // second pass clockwise, offset
      points.push(`L ${right - r} ${top + 8}`)
      points.push(`Q ${right} ${top + 8}, ${right} ${top + r + 8}`)
      points.push(`L ${right - 5} ${bottom - r}`)
      points.push(`Q ${right - 5} ${bottom + 2}, ${right - r - 5} ${bottom + 2}`)
      points.push(`L ${exitX} ${bottom + 2}`)
    } else {
      // COUNTERCLOCKWISE: entry → left along top → down left → right along bottom → up right → second pass
      points.push(`Q ${entryX} ${top}, ${entryX - r} ${top}`)
      points.push(`L ${left + r} ${top}`)
      points.push(`Q ${left} ${top}, ${left} ${top + r}`)
      points.push(`L ${left} ${bottom - r}`)
      points.push(`Q ${left} ${bottom}, ${left + r} ${bottom}`)
      points.push(`L ${right - r} ${bottom}`)
      points.push(`Q ${right} ${bottom}, ${right} ${bottom - r}`)
      points.push(`L ${right} ${top + r}`)
      points.push(`Q ${right} ${top}, ${right - r} ${top}`)
      // second pass counterclockwise, offset
      points.push(`L ${left + r} ${top + 8}`)
      points.push(`Q ${left} ${top + 8}, ${left} ${top + r + 8}`)
      points.push(`L ${left + 5} ${bottom - r}`)
      points.push(`Q ${left + 5} ${bottom + 2}, ${left + r + 5} ${bottom + 2}`)
      points.push(`L ${exitX} ${bottom + 2}`)
    }

    const nextCard = cardRefs.current[i + 1]
    if (!nextCard){
      points.push(`L ${exitX} ${docHeight}`)
    }
  })

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

      const scrollTop    = window.scrollY
      const viewHeight   = window.innerHeight
      const cardCount    = cardRefs.current.filter(Boolean).length

      // figure out how far through the page we are on a per-card basis
      const segmentLen = totalLen / cardCount

      let drawLen = 0

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        const cardTop    = card.offsetTop
        const cardHeight = card.offsetHeight

        // center of the card in document space
        const cardCenter = cardTop + cardHeight / 2

        // -1 = card is one viewport below, 0 = card is centered, 1 = card is one viewport above
        const viewCenter  = scrollTop + viewHeight / 2
        const distFromCenter = (viewCenter - cardCenter) / viewHeight

        // clamp to -0.5 to 0.5 -- each card owns exactly its viewport window
        const clamped = Math.max(-0.5, Math.min(0.5, distFromCenter))

        // convert to 0-1 progress for this card's segment
        // 0 when card is below center, 1 when card is above center
        const segProg = clamped + 0.5

        drawLen += segProg * segmentLen
      })

      drawLen = Math.min(drawLen, totalLen)

      drawn.style.strokeDashoffset = String(totalLen - drawLen)

      const pt = ghost.getPointAtLength(drawLen)
      walker.setAttribute('cx', String(pt.x))
      walker.setAttribute('cy', String(pt.y))
      outer.setAttribute('cx', String(pt.x))
      outer.setAttribute('cy', String(pt.y))

      const globalProg = drawLen / totalLen
      const col = gradColor(globalProg)
      walker.setAttribute('fill', col)
      outer.setAttribute('stroke', col)
      walker.setAttribute('opacity', drawLen > 10 ? '1' : '0')
      outer.setAttribute('opacity',  drawLen > 10 ? '0.35' : '0')

      cardRefs.current.forEach(card => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight + 60) {
          card.classList.add('opacity-100', 'translate-y-0')
          card.classList.remove('opacity-0', 'translate-y-3')
        }
      })

      hint.style.opacity = drawLen > 10 ? '0' : '1'
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

  //force the initial scrolling to the first element
  useEffect(() => {
  const timer = setTimeout(() => {
    const first = cardRefs.current[0]
    if (!first) return

    const targetY  = first.offsetTop - window.innerHeight * 0.5
    const startY   = window.scrollY
    const distance = targetY - startY
    const duration = 2000  // ms — increase to slow down further
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
      const eased    = easeInOut(progress)

      window.scrollTo(0, startY + distance * eased)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, 100)

  return () => clearTimeout(timer)
}, [])
  return (
    <div className="relative w-full" style={{ minHeight: '100%' }}>

      <svg
        ref={svgRef}
        style={{
          position: 'relative',
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
      <div className="h-[60vh]"/>
      {cards.map((card, i) => (
        <StoryCard
          key={card.label}
          index={i}
          label={card.label}
          title={card.title}
          body={card.body}
          tags={card.tags}
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
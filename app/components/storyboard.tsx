'use client'
import { useEffect, useRef } from 'react'
import StoryCard from './storycard'

type CardData = {
  label: string
  title: string
  body: string
  tags: string[]
  color: string
}

//To Update:
    // Buildpath --> add a randomization factor to add some hand-drawn-ness
    // Buildpath --> the transition between cards is not great, give personality
    

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


//isolating the path-building logic











/* points.push options:
      'M x y' = move pen to x,y without drawing
      'L x y' = draw straight line to x,y
      'Q cx cy, x y' = draw quadratic bezier to x,y with control point cx,cy
      'C cx1 cy1, cx2 cy2, x y' = draw cubic bezier to x,y with control points cx1,cy1 and cx2,cy2
      'A rx ry large-arc sweep x y' = draw arc to x,y with radii rx,ry and flags large-arc and sweep
  */
  function buildPath(svg: SVGSVGElement): string {
  const swing   = 48
  const outset  = 12
  const r       = 16
  const points: string[] = []

  const docHeight = document.body.scrollHeight
  const docWidth  = document.body.clientWidth

  const firstCard = cardRefs.current[0]
  const firstTop  = firstCard ? firstCard.offsetTop - outset : 0
  const firstLeft = firstCard ? (firstCard.offsetLeft - outset) - swing : 0

    points.push(`M ${docWidth / 2} ${-100}`)
    points.push(`C ${docWidth / 2} ${firstTop * 0.4}, ${docWidth / 2} ${firstTop * 0.8}, ${firstLeft} ${firstTop}`)  

  cardRefs.current.forEach((card, i) => {
    if (!card) return

    const top    = card.offsetTop    - outset
    const bottom = card.offsetTop + card.offsetHeight + outset
    const left   = card.offsetLeft   - outset
    const right  = card.offsetLeft + card.offsetWidth  + outset

    const isRight   = i % 2 === 0
    const approachX = isRight ? left - swing : right + swing

    const prevBottom = i === 0
      ? 0
      : (() => {
          const prev = cardRefs.current[i - 1]
          if (!prev) return top
          return prev.offsetTop + prev.offsetHeight + outset
        })()

    const travelMid = prevBottom + (top - prevBottom) * 0.5
    const travelHeight = top - prevBottom

    if (i === 0) {
      // already arrived at firstLeft, firstTop — just drop into the card trace
    } else // TRANSITION BETWEEN THE BOXES
      {
        const prevCard    = cardRefs.current[i - 1]
        const prevIsRight = (i - 1) % 2 === 0
        const exitX       = prevIsRight
          ? (prevCard ? prevCard.offsetLeft - outset - swing : approachX)
          : (prevCard ? prevCard.offsetLeft + prevCard.offsetWidth + outset + swing : approachX)

        const gapHeight = top - prevBottom
        const stepY1    = prevBottom + gapHeight * 0.2
        const stepY2    = prevBottom + gapHeight * 0.4
        const stepY3    = prevBottom + gapHeight * 0.6
        const stepY4    = prevBottom + gapHeight * 0.8

        // zigzag between cards
        points.push(`C ${exitX} ${prevBottom + gapHeight * 0.1}, ${exitX} ${stepY1}, ${exitX} ${stepY1}`)
        points.push(`C ${exitX} ${prevBottom + gapHeight * 0.3}, ${approachX} ${prevBottom + gapHeight * 0.3}, ${approachX} ${stepY2}`)
        points.push(`C ${approachX} ${prevBottom + gapHeight * 0.5}, ${exitX} ${prevBottom + gapHeight * 0.5}, ${exitX} ${stepY3}`)
        points.push(`C ${exitX} ${prevBottom + gapHeight * 0.7}, ${approachX} ${prevBottom + gapHeight * 0.7}, ${approachX} ${stepY4}`)
        points.push(`C ${approachX} ${prevBottom + gapHeight * 0.9}, ${approachX} ${top - 20}, ${approachX} ${top - 20}`)
    }

    if (isRight) { // right boxes
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
    } 
    else { // left boxes
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
    ? lastCard.offsetTop + lastCard.offsetHeight + outset
    : docHeight

  points.push(`C ${docWidth / 2} ${lastBottom + 60}, ${docWidth / 2} ${lastBottom + 120}, ${docWidth / 2} ${docHeight}`)

  return points.join(' ')
}

//isolating path-building logic

















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
//This is the phasecard equivalent of the landing page
// the main reason for this difference is that I want want a consistent through-line in the layout but I do not want to change the customizations in each 
// I like the parallax effect of phasecards but I don't want that in the landing page at all, for example

'use client'
import { useEffect, useRef } from 'react'
import PhaseCard from './PhaseCard'
import { motion, useScroll, useTransform } from 'motion/react'
type CardData = {
  number: number
  title: string
  description: string
  details: string
  image?: string
  embed?: string
  bg: string
  slides?: {
    description: string
    details?: string
    image?: string
    embed?: string
  }[]
}
function CardNumber({number, bg}:{number:number,bg:string}){
  const ref = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ['-40', '40'])
  return(
    <div ref={ref} className="relative">
      <motion.div
      initial={{ opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 0.6}}
      style={{y, color: `${bg}37`}}
      className="absolute -right-4 -top-10 text-[4rem] font-bold translate-x-full p-4 translate-y-1/2"
      >
      #{number}
      </motion.div>
    </div>
  )
}

export default function PhaseBoard({ cards }: { cards: CardData[] }) {
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
    if (!svg || !drawn || !track || !walker || !outer || !hint) return

    if (exitOffsetsRef.current.length === 0){
        exitOffsetsRef.current = cards.map(() => 0.2 + Math.random() * 0.6)
    }

  function buildPath(svg: SVGSVGElement): string {
  const outset  = 12
  const r       = 16
  const points: string[] = []

  const docHeight = document.body.scrollHeight
  const docWidth  = document.body.clientWidth

  const firstCard = cardRefs.current[0]
  const firstTop  = firstCard ? firstCard.offsetTop - outset : 0
  const firstLeft = firstCard ? (firstCard.offsetLeft - outset): 0

  cardRefs.current.forEach((card, i) => {
    if (!card) return

    const top    = card.offsetTop    - outset
    const bottom = card.offsetTop + card.offsetHeight + outset
    const left   = card.offsetLeft   - outset
    const right  = card.offsetLeft + card.offsetWidth  + outset
    const width = right - left

    const entryFrac = exitOffsetsRef.current[i] ?? 0.5
    const entryX = left + width * entryFrac

    const exitFrac = exitOffsetsRef.current[i+1] ?? 0.5
    const exitX = left + width * exitFrac

    if (i === 0){ //if first card
      points.push(`M ${firstTop} ${-100}`)
      points.push(`L ${firstTop} ${top + r}`)
    }
    //TRACE CARD:
    // → go R to top right
    points.push(`L ${entryX} ${top + r}`)
    points.push(`Q ${entryX} ${top}, ${entryX + r} ${top}`)
    points.push(`L ${right - r} ${top}`)
    points.push(`Q ${right} ${top}, ${right} ${top + r}`)
    // → go down to bottom right
    points.push(`L ${right} ${bottom - r}`)
    points.push(`Q ${right} ${bottom}, ${right - r} ${bottom}`)
    // → turn left in bottom right to bottom left
    points.push(`L ${left + r} ${bottom}`)
    points.push(`Q ${left} ${bottom}, ${left} ${bottom - r}`)
    // → turn left in bottom left to top left
    points.push(`L ${left} ${top + r}`)
    points.push(`Q ${left} ${top}, ${left + r} ${top}`)
    // → turn right in top left to entry point
    points.push(`L ${entryX - r} ${top}`)
    points.push(`Q ${entryX} ${top}, ${entryX} ${top + r}`)
    // retrace back down left side to bottom-left
    points.push(`L ${left} ${top + r}`)
    //points.push(`Q ${left} ${top + r}, ${left} ${top + r}`)
    points.push(`L ${left} ${bottom - r}`)
    points.push(`Q ${left} ${bottom}, ${left + r} ${bottom}`)
    // → right along bottom to exitX
    points.push(`L ${exitX} ${bottom}`)

    const nextCard = cardRefs.current[i + 1]
    if (nextCard){
        const nextTop = nextCard.offsetTop - outset
        const nextLeft = nextCard.offsetLeft - outset
        const nextRight = nextCard.offsetLeft + nextCard.offsetWidth + outset
        const nextWidth = nextRight - nextLeft

        const nextEntryX = nextLeft + nextWidth * (exitOffsetsRef.current[i+1] ?? 0.5)
        points.push(`L ${nextEntryX} ${nextTop}`)
    }
    else{ //if last
      points.push(`L ${exitX} ${docHeight}`)

    }
    }) //end the for each

    const lastCard = cardRefs.current[cardRefs.current.length - 1]
    const lastBottom = lastCard ? lastCard.offsetTop + lastCard.offsetHeight + outset : docHeight
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
      const br = (bh >> 16) & 255, bgreen = (bh >> 8) & 255, bb = bh & 255
      return '#' + [ar+(br-ar)*t, ag+(bgreen-ag)*t, ab+(bb-ab)*t]
        .map(v => Math.round(v).toString(16).padStart(2,'0')).join('')
    }
    const colorStops = cards.map(c => c.bg)

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
    const handleResize = () => {
      applyPath(svg, drawn, track)
      onScroll(drawn, walker, outer, hint)
    }
    setTimeout(() => {
      applyPath(svg, drawn, track)
      onScroll(drawn, walker, outer, hint)
    }, 100)
 
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
          zIndex: -1,
        }}
      >
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
            {cards.map((card, i) => (
              <stop
                key={card.number}
                offset={`${(i / (cards.length - 1)) * 100}%`}
                stopColor={card.bg}
              />
            ))}
          </linearGradient>
        </defs>
        <path ref={trackRef} fill="none" stroke="rgba(127,119,221,0.1)" strokeWidth="2.5" />
        <path
          ref={drawnRef}
          fill="none"
          stroke="url(#pg)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
        <circle ref={walkerRef} r="10" fill="#7F77DD" opacity="0" />
        <circle ref={outerRef}  r="16" fill="none" stroke="#7F77DD" strokeWidth="1.5" opacity="0" />
      </svg>
 
      <div className="h-[60vh]" />
 
      {cards.map((card, i) => (
        <div
          key={card.number}
          ref={el => { cardRefs.current[i] = el }}
          className={[
            'relative z-10 mb-[200px] mx-auto max-w-3xl',
            'opacity-0 translate-y-3',
            'transition-all duration-500 ease-out',
          ].join(' ')}
        >
          <CardNumber number={card.number} bg={card.bg} />
          <PhaseCard
            number={card.number}
            title={card.title}
            description={card.description}
            details={card.details}
            image={card.image}
            embed={card.embed}
            bg={card.bg}
            slides={card.slides}
          />
        </div>
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
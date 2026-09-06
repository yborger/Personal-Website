/*
  PHASE BOARD -- scrolling line that takes the PHASE CARDS into consideration and traces the scrollable path around them
    appears in individual projects
  */
 
'use client'
import { useEffect, useRef } from 'react'
import PhaseCard from './phasecard'
import { motion, useScroll, useTransform } from 'motion/react'

type CardData = {
  number: number
  title: string
  description: string
  details?: string
  image?: string
  embed?: string
  bg: string
  slides?: {
    title: string
    description: string
    details?: string
    image?: string
    embed?: string
  }[]
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
  const navRef      = useRef<HTMLDivElement>(null)
  const navBtnRefs  = useRef<(HTMLButtonElement | null)[]>([])
  const activeIdxRef = useRef<number>(-1)

  const exitOffsetsRef = useRef<number[]>([])

  // compute interpolated color at a given 0-1 progress
  function coloration(a: string, b: string, t: number) {
    const ah = parseInt(a.slice(1), 16)
    const bh = parseInt(b.slice(1), 16)
    const ar = (ah >> 16) & 255, ag = (ah >> 8) & 255, ab = ah & 255
    const br = (bh >> 16) & 255, bgreen = (bh >> 8) & 255, bb = bh & 255
    return '#' + [ar+(br-ar)*t, ag+(bgreen-ag)*t, ab+(bb-ab)*t]
      .map(v => Math.round(v).toString(16).padStart(2,'0')).join('')
  }

  // get the card's color at its position in the gradient
  function cardColor(i: number) {
    const t = i / Math.max(cards.length - 1, 1)
    const segments = cards.length - 1
    const scaled = t * segments
    const si = Math.min(Math.floor(scaled), segments - 1)
    return coloration(cards[si].bg, cards[Math.min(si + 1, cards.length - 1)].bg, scaled - si)
  }

  function scrollToCard(i: number) {
    const card = cardRefs.current[i]
    if (!card) return
    const targetY = card.offsetTop - window.innerHeight * 0.3
    const startY = window.scrollY
    const distance = targetY - startY
    const duration = 600
    let startTime: number | null = null

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, startY + distance * easeInOut(progress))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  function updateActiveNav(activeI: number) {
    if (activeI === activeIdxRef.current) return
    activeIdxRef.current = activeI
    navBtnRefs.current.forEach((btn, i) => {
      if (!btn) return
      const color = cardColor(i)
      if (i === activeI) {
        btn.style.borderColor = color
        btn.style.borderWidth = '2px'
        btn.style.color = color
        btn.style.opacity = '1'
      } else {
        btn.style.borderColor = `${cards[i].bg}59`
        btn.style.borderWidth = '1px'
        btn.style.color = cards[i].bg
        btn.style.opacity = '0.5'
        
      }
    })
  }

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

      const firstCard = cardRefs.current[0]
      const firstTop  = firstCard ? firstCard.offsetTop - outset : 0

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        const top    = card.offsetTop    - outset
        const bottom = card.offsetTop + card.offsetHeight + outset
        const left   = card.offsetLeft   - outset
        const right  = card.offsetLeft + card.offsetWidth  + outset
        const width  = right - left

        const entryFrac = exitOffsetsRef.current[i] ?? 0.5
        const entryX = left + width * entryFrac
        const exitFrac = exitOffsetsRef.current[i+1] ?? 0.5
        const exitX = left + width * exitFrac

        if (i === 0){
          points.push(`M ${entryX} ${0}`)
          points.push(`L ${entryX} ${top + r}`)
        }

        points.push(`L ${entryX} ${top + r}`)
        points.push(`Q ${entryX} ${top}, ${entryX + r} ${top}`)
        points.push(`L ${right - r} ${top}`)
        points.push(`Q ${right} ${top}, ${right} ${top + r}`)
        points.push(`L ${right} ${bottom - r}`)
        points.push(`Q ${right} ${bottom}, ${right - r} ${bottom}`)
        points.push(`L ${left + r} ${bottom}`)
        points.push(`Q ${left} ${bottom}, ${left} ${bottom - r}`)
        points.push(`L ${left} ${top + r}`)
        points.push(`Q ${left} ${top}, ${left + r} ${top}`)
        points.push(`L ${entryX - r} ${top}`)
        points.push(`Q ${entryX} ${top}, ${entryX} ${top + r}`)
        points.push(`L ${left} ${top + r}`)
        points.push(`L ${left} ${bottom - r}`)
        points.push(`Q ${left} ${bottom}, ${left + r} ${bottom}`)
        points.push(`L ${exitX} ${bottom}`)

        const nextCard = cardRefs.current[i + 1]
        if (nextCard){
          const nextTop   = nextCard.offsetTop - outset
          const nextLeft  = nextCard.offsetLeft - outset
          const nextRight = nextCard.offsetLeft + nextCard.offsetWidth + outset
          const nextWidth = nextRight - nextLeft
          const nextEntryX = nextLeft + nextWidth * (exitOffsetsRef.current[i+1] ?? 0.5)
          points.push(`L ${nextEntryX} ${nextTop}`)
        } else {
          points.push(`L ${exitX} ${docHeight}`)
        }
      })

      return points.join(' ')
    }

    function applyPath(svg: SVGSVGElement, drawn: SVGPathElement, track: SVGPathElement) {
      const PATH = buildPath(svg)
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

    function gradColor(t: number) {
      const segments = cards.length - 1
      const scaled   = t * segments
      const i        = Math.min(Math.floor(scaled), segments - 1)
      const colorStops = cards.map(c => c.bg)
      return coloration(colorStops[i], colorStops[i + 1], scaled - i)
    }

    function onScroll(drawn: SVGPathElement, walker: SVGCircleElement, outer: SVGCircleElement, hint: HTMLDivElement) {
      const totalLen = totalLenRef.current
      const ghost    = ghostRef.current
      if (!totalLen || !ghost) return

      const scrollTop  = window.scrollY
      const viewHeight = window.innerHeight
      const cardCount  = cardRefs.current.filter(Boolean).length
      const segmentLen = totalLen / cardCount

      let drawLen = 0
      let closestI = 0
      let closestDist = Infinity

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        const cardCenter = card.offsetTop + card.offsetHeight / 2
        const viewCenter = scrollTop + viewHeight / 2
        const dist = Math.abs(viewCenter - cardCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestI = i
        }

        const distFromCenter = (viewCenter - cardCenter) / viewHeight
        const clamped = Math.max(-0.5, Math.min(0.5, distFromCenter))
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

      const col = gradColor(drawLen / totalLen)
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
      updateActiveNav(closestI)
    }

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

  useEffect(() => {
    // fade nav in during initial scroll
    const nav = navRef.current
    if (nav) {
      nav.style.opacity = '0'
      setTimeout(() => {
        nav.style.transition = 'opacity 1s ease'
        nav.style.opacity = '1'
      }, 800)
    }

    const timer = setTimeout(() => {
      const first = cardRefs.current[0]
      if (!first) return

      const targetY  = first.offsetTop - window.innerHeight * 0.5
      const startY   = window.scrollY
      const distance = targetY - startY
      const duration = 2000
      let startTime: number | null = null

      function easeInOut(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
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
    <div className="relative w-full" style={{ minHeight: '100%' }}>

    {/* sticky nav */}
    <div
      ref={navRef}
      className="fixed top-32 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div className="flex gap-2 flex-wrap justify-center max-w-3xl px-4 pointer-events-auto">
        {cards.map((card, i) => {
          const color = cardColor(i)
          const hasSlides = card.slides && card.slides.length > 1
          return (
            <div key={card.number} className="relative group">
              {/* solid base + color overlay wrapper */}
              <div className="relative rounded-full bg-white dark:bg-[#131313] overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: `${card.bg}14` }}
                />
                <button
                  ref={el => { navBtnRefs.current[i] = el }}
                  onClick={() => scrollToCard(i)}
                  className="relative text-sm md:text-base px-3 py-1 rounded-full border bg-transparent transition-all duration-300 z-10"
                  style={{
                    borderColor: `${card.bg}59`,
                    borderWidth: '1px',
                    color: card.bg,
                    opacity: 0.5,
                  }}
                >
                  {card.title}
                  {hasSlides && <span className="ml-1 opacity-60 hidden md:inline">▾</span>}
                </button>
              </div>

              {/* dropdown — hidden on mobile, hover on desktop */}
              {hasSlides && (
                <div className="hidden md:block absolute top-full left-0 mt-1 z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                  <div className="relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-white dark:bg-[#131313]" />
                    <div
                      className="absolute inset-0"
                      style={{ background: `${card.bg}14` }}
                    />
                    <div
                      className="relative border rounded-lg px-3 py-2 text-sm flex flex-col gap-1 min-w-max"
                      style={{ borderColor: `${card.bg}40` }}
                    >
                      {card.slides!.map((slide, si) => (
                        <span
                          key={si}
                          className="opacity-70"
                          style={{ color }}
                        >
                          {slide.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>

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
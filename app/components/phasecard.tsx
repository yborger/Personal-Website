/*
  PHASE CARD -- individual cards for each phase of the project
    includes the title, description, details (further description), image/embed option, background, and carousel ability via slides
    appears in individual projects *through* phaseboard
*/

"use client"
import { useState } from "react"

interface Slide{
    title: string;
    description: string;
    details?: string;
    image?: string;
    embed?: string;
}

interface CardProps {
        number: number;
        title: string;
        description: string;
        details?: string;
        image?: string;
        embed?: string;
        bg: string;
        slides?: Slide[];
}

const peekRotations = [2, -3, 1.5]

export default function PhaseCard({number, title, description, details, image, embed, bg, slides}: CardProps){
    const [expanded, setExpanded] = useState(false)
    const [currSlide, setCurrSlide] = useState(0)

    const allSlides: Slide[] = slides ?? [{title, description, details, image, embed}]
    const hasMultipleSlides = allSlides.length > 1
    const activeContent = allSlides[currSlide]

    const peekCount = Math.min(3, allSlides.length - 1)
    const peekSlides = Array.from({ length: peekCount }, (_, i) =>
        allSlides[(currSlide + i + 1) % allSlides.length]
    )

    function goToSlide(index: number) {
        setCurrSlide(index)
        setExpanded(false)
        setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }

    return (
    <section className="h-3/4 flex mx-2 md:ml-[50px] md:mr-[50px] items-center justify-center relative">
      <div className="relative w-full max-w-4xl mx-1 md:mx-4">

        {/* peek cards behind, rendered back to front */}
        {hasMultipleSlides && [...peekSlides].reverse().map((_, rawI) => {
            const i = peekCount - 1 - rawI
            return (
                <div
                    key={i}
                    className="absolute inset-0 rounded-md border bg-white dark:bg-[#131313]"
                    style={{
                        borderColor: `${bg}59`,
                        transform: `rotate(${peekRotations[i]}deg) translateY(${(i + 1) * 6}px)`,
                        zIndex: peekCount - i,
                        opacity: 1 - (i + 1) * 0.12,
                    }}
                >
                    <div
                        className="absolute inset-0 rounded-md"
                        style={{ background: `${bg}14` }}
                    />
                </div>
            )
        })}

        {/* active card */}
        <div
            className="relative rounded-md p-3 md:p-6 shadow-lg border px-3 md:px-6 py-3 md:py-5 bg-white dark:bg-[#131313]"
            style={{
                borderColor: `${bg}59`,
                zIndex: peekCount + 1,
            }}
        >
            {/* color overlay */}
            <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{ background: `${bg}14` }}
            />

            {hasMultipleSlides && (
                <button
                    onClick={() => goToSlide(currSlide === 0 ? allSlides.length - 1 : currSlide - 1)}
                    className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 text-4xl md:text-7xl font-bold transition-opacity opacity-20 hover:opacity-60 z-10"
                    style={{ color: bg }}
                >
                    ‹
                </button>
            )}

            {hasMultipleSlides && (
                <button
                    onClick={() => goToSlide(currSlide === allSlides.length - 1 ? 0 : currSlide + 1)}
                    className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 text-4xl md:text-7xl font-bold transition-opacity opacity-20 hover:opacity-60 z-10"
                    style={{ color: bg }}
                >
                    ›
                </button>
            )}

            <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-6 text-left">{activeContent.title}</h2>

            <div className={`m-2 md:m-4 items-start gap-2 md:gap-4 ${activeContent.embed || activeContent.image ? 'grid md:grid-cols-[3fr_2fr]' : ''}`}>
                {activeContent.embed ? (
                    <div className="w-full rounded-xl overflow-hidden justify-self-center" style={{ aspectRatio: '4/3' }}>
                        <iframe src={activeContent.embed} allowFullScreen className="w-full h-full" />
                    </div>
                ) : activeContent.image ? (
                    <img
                        src={activeContent.image}
                        alt={title}
                        className="w-auto h-auto rounded-xl max-h-40 md:max-h-64 object-cover justify-self-center"
                    />
                ) : null}

                <div className="text-sm md:text-lg text-left">
                    <p>{activeContent.description}</p>

                    {activeContent.details && (
                        <button
                            onClick={() => {
                                setExpanded(!expanded)
                                setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
                            }}
                            className="mt-2 md:mt-4 text-xs md:text-sm font-medium underline"
                        >
                            {expanded ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>
            </div>

            {expanded && activeContent.details && (
                <p className="mt-2 md:mt-4 text-xs md:text-sm">{activeContent.details}</p>
            )}

            {hasMultipleSlides && (
                <div className="flex justify-center items-center gap-3 mt-3 md:mt-4">
                    {allSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all"
                            style={{
                                background: i === currSlide ? bg : `${bg}40`,
                                transform: i === currSlide ? 'scale(1.3)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
      </div>
    </section>
  )
}
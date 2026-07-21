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
        details: string;
        image?: string;
        embed?: string;
        bg: string;
        slides?: Slide[];
}

 export default function PhaseCard({number, title, description, details, image, embed, bg, slides}: CardProps){
    //some descriptions are too long, so we can add a "read more" button that expands the description
    const [expanded, setExpanded] = useState(false)
    const [currSlide, setCurrSlide] = useState(0)

    const activeContent: Slide = slides ? slides[currSlide] : {title, description, details, image, embed}

    const hasMultipleSlides = slides && slides.length > 1

    //reset fn
    function goToSlide(index: number) {
        setCurrSlide(index)
        setExpanded(false)
        setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }

    return (
    <section className="h-3/4 flex ml-[50px] mr-[50px] items-center justify-center relative">
      <div
        className="rounded-md p-6 m-4 shadow-lg max-w-4xl border px-6 py-5"
        style={{
          borderColor: `${bg}59`,
          background: `${bg}14`,
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-left">{activeContent.title}</h2>
 
        <div className="m-4 grid grid-cols md:grid-cols-[3fr_2fr] items-start gap-4">
          {activeContent.embed ? (
            <div className="w-full rounded-xl overflow-hidden justify-self-center" style={{ aspectRatio: '4/3' }}>
              <iframe src={activeContent.embed} allowFullScreen className="w-full h-full" />
            </div>
          ) : activeContent.image ? (
            <img
              src={activeContent.image}
              alt={title}
              className="w-auto h-auto rounded-xl max-h-64 object-cover justify-self-center"
            />
          ) : null}
 
          <div className="text-lg text-left">
            <p>{activeContent.description}</p>
 
            {activeContent.details && (
              <button
                onClick={() => {
                  setExpanded(!expanded)
                  setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
                }}
                className="mt-4 text-m font-medium underline"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
 
        {expanded && activeContent.details && (
          <p className="mt-4 text-sm">{activeContent.details}</p>
        )}
        {hasMultipleSlides && (
  <div className="flex justify-center items-center gap-3 mt-4">
    <button
      onClick={() => goToSlide(currSlide === 0 ? slides.length - 1 : currSlide - 1)}
      className="text-2xl font-bold transition-opacity opacity-20 hover:opacity-60"
      style={{ color: bg }}
    >
      ‹
    </button>
    {slides.map((_, i) => (
      <button
        key={i}
        onClick={() => goToSlide(i)}
        className="w-2 h-2 rounded-full transition-all"
        style={{
          background: i === currSlide ? bg : `${bg}40`,
          transform: i === currSlide ? 'scale(1.3)' : 'scale(1)',
        }}
      />
    ))}
    <button
      onClick={() => goToSlide(currSlide === slides.length - 1 ? 0 : currSlide + 1)}
      className="text-2xl font-bold transition-opacity opacity-20 hover:opacity-60"
      style={{ color: bg }}
    >
      ›
    </button>
  </div>
)}
      </div>
    </section>
  )
}
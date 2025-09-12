"use client";
//this is the separate slide deck component intended for states and animations

import { useState } from "react";
import PhaseCard from "./PhaseCard";

const slides = [
  { title: "Slide 1", description: "This is the first", bg: "from-green-200 to-blue-200" },
  { title: "Slide 2", description: "This is the second", bg: "from-indigo-800 to-purple-800" },
  { title: "Slide 3", description: "This is the third", bg: "from-purple-800 to-pink-800" },
  { title: "Slide 4", description: "This is the fourth", bg: "from-blue-200 to-indigo-100" },
];

export default function SlideDeck() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative grid h-screen place-items-center">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out
            ${i === index
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-90 translate-y-10 z-0"}
          `}
        >
          <PhaseCard {...slide} />
        </div>
      ))}

      <button
        onClick={nextSlide}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg z-20"
      >
        Next
      </button>
    </div>
  );
}

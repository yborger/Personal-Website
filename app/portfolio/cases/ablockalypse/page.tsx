"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "Intro",
    description: "This is “Ablockalypse,” a block-based platforming game set in a post-apocalyptic world. The player is a cat running through blocks, with levels alternating between a traditional platformer and a tetris-inspired platform-builder.",
    details: "For a final project in the Game Systems course at Swarthmore College, my project partner and I created a platformer game from scratch.",
    image: "/artwork/bee_leaf.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "Create a game with a unique concept behind it. My partner and I were drawn to the idea of bringing a classic into a more modern context.",
    details: "The final project requirements were to use something learned in the course, and we chose the “create your own assignment” as our final project.",
    image: "/artwork/bee_leaf.png",
    bg: "#A066D3",
  },
  {
    number: 3,
    title: "What I Did",
    description: "",
    details: "",
    image: "/artwork/bee_leaf.png",
    bg: "#D4537E",
    slides: [
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        details: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/artwork/bee_leaf.png",
      },
      {
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        details: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/artwork/bee_leaf.png",
      },
      {
        description: "Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue.",
        details: "Donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus.",
        image: "/artwork/bee_leaf.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "Fusce blandit odio nec enim volutpat, a efficitur nisl efficitur. Curabitur ac odio at enim efficitur commodo.",
    details: "Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Donec et odio pellentesque diam volutpat commodo sed egestas.",
    image: "/artwork/bee_leaf.png",
    bg: "#1D9E75",
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <PhaseBoard cards={phases} />
    </section>
  )
}
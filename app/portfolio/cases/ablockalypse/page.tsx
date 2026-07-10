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
        //conceptualizing + drawing inspo
        title: "Conceptualizing",
        description: "We learned many different types of games and the history of video games. We chose a platformer kind of game on the Tic80 engine.",
        details: "After learning the mechanics behind the original tetris game development, we decided to have the tetris-type logic to build the platforms as part of the level.",
        image: "/artwork/bee_leaf.png",
      },
      { //explaining
        title: "The Set-up",
        description: "Levels that have an odd number are basic platforms that are pre-designed, with the cat player character jumping onto each platform on the map to get across the screen.",
        details: "Even numbered levels were the tetris-style builder, where the first X amount of seconds were meant for the player to stack-up a series of blocks to create a path for the cat to cross. Once time was over, the level transitioned back into basic-platformer logic and the player can jump across the path. The time decreases as levels continue.",
        image: "/artwork/bee_leaf.png",
      },
      { //making
        title: "Making the Game",
        description: "The basic platformer was designed on the Map section of Tic80, since we assigned a specific “Sprite” as solid blocks in the code itself.",
        details: "The solid block sprite was necessary to create the four-block shapes and efficiently rotate them using matrix operations. Tic80 works off of counting “tics” as a looping time function, and these tics were counted as part of the timed tetris-styled levels so there was a clear “finished” point.",
        image: "/artwork/bee_leaf.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "",
    details: "",
    image: "/artwork/bee_leaf.png",
    bg: "#1D9E75",
    slides: [
      {
        title: "Remote Work?",
        description: "Remote work is absolutely possible and can be done efficiently.",
        details: "I unfortunately wound up getting COVID right before this project was due. My partner and I were in constant communication to make sure we stayed on pace (after the worst of my sickness had passed) and completed the project on time, and we managed to set up a fully remote workspace in less than a day’s time.", 
        image: "/artwork/bee_leaf.png",
      },
      {
        title: "Pixel-Style Animation",
        description: "Pixel-style animation looks... off... but once it becomes a loop, it all makes sense.",
        details: "Depending on the speed and the desired frames, the sprite looked really strange but because of the phase in the movement it actually smoothed out the animation. If I plan to continue working with pixel-style animation I need to make sure to have enough frames to make smooth movement.", 
        image: "/artwork/bee_leaf.png",
      }
    ]
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <PhaseBoard cards={phases} />
    </section>
  )
}
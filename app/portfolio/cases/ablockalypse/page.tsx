"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "Ablockalypse!",
    description: "This is “Ablockalypse,” a block-based platforming game set in a post-apocalyptic world. The player is a cat running through blocks, with levels alternating between a traditional platformer and a tetris-inspired platform-builder.",
    details: "For a final project in the Game Systems course at Swarthmore College, my project partner and I created a platformer game from scratch.",
    image: "/ablock_imgs/ablockalypse.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "Create a game with a unique concept behind it. My partner and I were drawn to the idea of bringing a classic into a more modern context.",
    details: "We made custom sprites and tiles, fully diving into the mechanics of the game and how they work within the storyline. Our final write up includes background lore for the game, a gameplay guide, and explanation of the controls ",
    image: "/ablock_imgs/writeup_pg.png",
    bg: "#A066D3",
  },
  {
    number: 3,
    title: "Method",
    description: "", //doesn't show
    details: "", //doesn't show
    image: "", //doesn't show
    bg: "#D4537E",
    slides: [
      {
        //conceptualizing + drawing inspo
        title: "Conceptualizing",
        description: "We learned many different types of games and the history of video games. We chose to make a platformer on the Tic80 engine, and incorporate certain tetris-style logic.",
        details: "After learning the mechanics behind the original tetris game development, we decided to have the tetris-type logic to build the platforms as part of the level.",
        image: "/ablock_imgs/empty_lvl.png",
      },
      { //explaining
        title: "The Set-up",
        description: "Levels that have an odd number are basic platforms that are pre-designed, with the cat player character jumping onto each platform on the map to get across the screen. Even numbered levels were the tetris-style builder, where the first X amount of seconds were meant for the player to stack-up a series of blocks to create a path for the cat to cross.",
        details: "Once time was over, the level transitioned back into basic-platformer logic and the player can jump across the path. The time decreases as levels continue.",
        image: "/ablock_imgs/platformer_lvl.png",
      },
      { //making
        title: "Making the Game",
        description: "The basic platformer was designed on the Map section of Tic80, since we assigned a specific “Sprite” as solid blocks in the code itself. The solid block sprite was necessary to create the four-block shapes and efficiently rotate them using matrix operations.",
        details: "Tic80 works off of counting “tics” as a looping time function, and these tics were counted as part of the timed tetris-styled levels so there was a clear “finished” point.",
        image: "/ablock_imgs/built_lvl.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "",
    details: "",
    image: "",
    bg: "#1D9E75",
    slides: [
      {
        title: "Remote Work?",
        description: "Remote work is absolutely possible and can be done efficiently.",
        details: "I unfortunately wound up getting COVID right before this project was due. My partner and I were in constant communication to make sure we stayed on pace (after the worst of my sickness had passed) and completed the project on time, and we managed to set up a fully remote workspace in less than a day’s time.", 
        image: "/ablock_imgs/stuck_lvl.png",
      },
      {
        title: "Pixel-Style Animation",
        description: "Pixel-style animation looks... off... but once it becomes a loop, it all makes sense.",
        details: "Depending on the speed and the desired frames, the sprite looked really strange but because of the phase in the movement it actually smoothed out the animation. If I plan to continue working with pixel-style animation I need to make sure to have enough frames to make smooth movement.", 
        image: "/ablock_imgs/sprite_creator.png",
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
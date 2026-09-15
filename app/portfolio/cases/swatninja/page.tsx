"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "Intro",
    description: "As a final project for the Computational Images course taught at Swarthmore College, I decided to think about how I would adapt things that already exist into augmented reality, as it was something I had learned so much about during this course.",
    image: "/swat_imgs/fly.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "To create a game with augmented reality, specifically trying to incorporate concepts from both courses I had taken with this professor (Game Systems and Computational Images).",
    image: "/swat_imgs/moth.png",
    bg: "#A066D3",
  },
  {
    number: 3,
    title: "Process",
    description: "",
    bg: "#D4537E",
    slides: [
      {
        title: "Making a Plotline",
        description: "The main concept was originally a recreation of Fruit Ninja that I would be able to play. After spending plenty of time designing the main functionality, my friend noted that the pathing function made the fruit object seem to fly around the screen like a bug, and I actually liked the premise of swatting a bug more than slicing fruit, in order to add a “Swat” twist into the game.",
        details: "The “problem” I intended to solve was that Fruit Ninja became a pay-to-play kind of game, but I was nostalgic and decided to make my own.",
        image: "/swat_imgs/mosquito.png",
      },
      {
        title: "The Set-up",
        description: "The camera faces the player, and using hand-recognition software, they bring a hand up into the camera’s view. As an augmented reality overlay, the drawn bugs float around back and forth on the screen, and the person’s hand can interact with them. When the hand and bug overlap, the player is “swatting” the bug.",
        image: "/swat_imgs/dragonfly.png",
      },
      {
        title: "The Implementation",
        description: "In my write up, I decided to go file by file and explain the logic for each function. I did this mostly because I had encountered a game-crashing bug and could not figure out where it came from, so I had been going through each file and function individually anyway.",
        details: "Also, I was already over the word limit and made this a bit easier through the organization of the write-up.",
        embed: "/swat_imgs/implementation.pdf",
      },
      {
        title: "Considerations for Future",
        description: "While I achieved all the main tasks of the assignment, I really let myself down on the final gameplay. I had started implementing a scoring feature and I really would have loved to add that in, as it would really complete the main concept.",
        image: "/swat_imgs/bugeye.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "I specifically struggled at asking my professor for assistance on this project. I was very stubborn in the idea that I could do this entire project with no additional help, and I think that was a personal failure as I could not add all of the elements I wanted to in the end.",
    image: "/swat_imgs/bonus_fly.png",
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
"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "Find My Restroom: Intro",
    description: "Walking around New York City one random day, I suddenly had to use the restroom. I turned into the first cafe I could find (naturally, a Starbucks), and had to buy a drink so I could use the restroom. And this gave the idea for a “Find my Restroom” application.",
    details: "The main purpose of this is to make the restroom-finding process more convenient for users. After considering the different possible users, I realized there were significantly more details to take into account and therefore actual potential in something like this.",
    image: "/findmyrestroom.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goals",
    description: "Originally, it was just to create a web application that would find a restroom near me and tell me if I had to buy something ahead of time. As I thought more, I came up with more criteria like accessibility of the restroom, whether it was a clean restroom, among others.",
    details: "This was never meant to be an application to show my software development skill, but rather an experimental use of AI as a programming tool",
    bg: "#A066D3",
  },
  {
    number: 3,
    title: "What I Did",
    description: "",
    details: "",
    image: "",
    bg: "#D4537E",
    slides: [
      {
        title: "Experimenting with AI",
        description: "With the rise of AI, I decided to try and develop this with AI, as a low stakes demo project where I can trial the strengths and weaknesses of allowing AI to fully work out the project from just the concept.",
        details: "In reality, I noticed many moments that I had to fill in the gaps in understanding or knowledge of the program, that I definitely would not have been able to know without my computer science background.",
      },
      {
        title: "Claude Instructions",
        description: "I explained the concept to Claude in a very conversational tone, and asked for what I had to set up before starting the programming. After setting up the open source dataset of public restrooms in Supabase, I instructed Claude to give detailed instructions that would get passed on to Cursor to build.",
        details: "It felt very tedious as I had to prompt to get every detail of the set-up process. I asked what to set up, and rather than actually tell me, Claude would often respond with incomplete information. I had to fully set up a dataset in Supabase and none of that was mentioned as something to do until I prompted again.",
      },
      {
        title: "Cursor",
        description: "Cursor took in all of the instructions and created all of the files necessary, connected pieces with minimal interference on my part (I had to copy and paste links to certain information, for example).",
        details: "There were many files and multiple phases of instructions that Cursor took in. It made an application and I was able to see the final demo",
      },
      {
        title: "The Demo",
        description: "The demo includes the features I asked for and runs on Vercel. It depicts a map of the specified area, it allows the user to set up certain options, and it operates exactly as this demo should.",
        details: "It has all of the individual aspects requested and works pretty decently as a demo of this concept, done within a day.",
        image: "/artwork/bee_leaf.png",
      }
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
        title: "Strengths",
        description: "I found there to be a few strengths to this AI-driven approach. The speed, the breadth of knowledge, the quick fixes, and the clear decision assistance, were all very useful for getting the demo up and running.",
        details: "For speed, the whole app took about 2.5 hours start to finish. In knowledge, the AI knew every layer of the stack simultaneously and just used it correctly immediately. The quick fixing relates to the speed and knowledge, where anything that was wrong could be fixed and tested instantly. Any and all decisions I had to make, the AI could list the trade-offs clearly and could make a recommendation based on the set-up.", 
      },
      {
        title: "Weaknesses",
        description: "This entire demo looks like it was made with AI. There is no way around that, there is no customization, only a flat interface. To the coding aspect, the AI would consistently brute-force through any bugs it encountered, often forgot what it had and had not already handled, and it could not actually see the final implementation to identify things that had not worked as intended. ",
        details: "The AI cannot understand the user experience and cannot design with it in mind. The visual itself has emojis randomly throughout, with no reason why that emoji had been used, and everything design-wise is structurally clean but boring (all identical formatting throughout). This was definitely a learning moment.", 
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
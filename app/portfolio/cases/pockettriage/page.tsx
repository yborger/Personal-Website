"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "What is Pocket Triage?",
    description: "Pocket Triage is an in-development application intended to store first aid information for both physical and mental health, in a simple, accessible format.",
    details: "I was invited to collaborate on this project as a UI/UX designer. I was given a brief overview of what had been decided prior to my arrival: the color scheme, font, and main branding details were given.",
    image: "/pocket_triage/main_screen.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "Design a user friendly mobile interface for the mental health section of a first aid application. I was given a lot of creative control over this section, including the styling and user flow.",
    image: "/pocket_triage/goal nav options.png",
    bg: "#A066D3",
  },
  {
    number: 3,
    title: "Process",
    description: "",
    bg: "#D4537E",
    slides: [
      {
        title: "User Research",
        description: "I conducted research to determine our user base and what our users would be needing this for, like someone experiencing a panic attack or high levels of anxiety.",
        details: "The further research included articles about how individuals having these kinds of crises may experience dizziness and varying degrees of difficulty in comprehension. So, I knew it would be beneficial to keep the design of things, especially in this section, straightforward and simple.",
        image: "/pocket_triage/user research.png",
      },
      {
        title: "Matching the Energy",
        description: "By looking at the various states the user may be in, I came up with a very simple design using minimal flashing colors and the softer colors in the palette.",
        details: "Since the user will likely be overwhelmed, it would be best to maintain a calm interface, with big text and uncomplicated design choices.",
        image: "/pocket_triage/energy match.png",
      },
      {
        title: "User Flow",
        description: "For each exercise offered (ex. box breathing), I was given the instructions for how to do it (ex. inhale 4s, hold 4s, exhale 4s, hold 4s).",
        details: "I created the user flows based on the instructions needed for the user to do each exercise, and added additional screens for future features that are in development.",
        image: "/pocket_triage/user flow.png",
      },
      {
        title: "Designing",
        description: "After determining what was necessary in the design, like the complexity of the language and instruction, I put a pen to paper and started designing.",
        details: "My first sketches are done in my design notebook, then I made a clearer virtual sketch, and then I put it into Figma.",
        image: "/pocket_triage/designing.png",
      },
      {
        title: "Feedback and Reiterating",
        description: "Naturally the first design was not the final one. I received feedback from the head of the project requesting the design to lean towards a minimalist aesthetic.",
        image: "/pocket_triage/feedback minimalist vibe.png",
      },
      {
        title: "Bonus Addition!",
        description: "I share my concern  about how to make sure everything was clear for the user, that the options were distinct and clear, so I created an extra screen to adjust settings that had been discussed in research but not implemented, and included sizing in those.",
        image: "/pocket_triage/settings.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "",
    bg: "#1D9E75",
    slides: [
      {
        title: "Take Up Space",
        description: "For some reason I had massive hesitation towards adding more screens in the Figma file. Once I started adding more screens, though, I realized how much I could play with the prototype settings to make the visual cues clearer to the developers.",
        details: "I made a note at the top of the document recommending the developers use the prototype to navigate in order to understand how it should act so they do not have to guess at what different buttons are meant to do.",
        image: "/pocket_triage/take up space prototyping.png",
      },
      {
        title: "Reiteration",
        description: "This is one of the first times that I created the full wireframe and was told to basically redesign it. I was much more okay with it than expected.",
        details: "I had spent actual time on those original designs, but I was not upset about having to re-do them. Why? Because now, I had a very clear sense of what they wanted.",
        image: "/pocket_triage/reiteration.png",
      },
    ]
  },
  {
    number: 5,
    title: "Demo",
    description: "This is a demo of the pages I specifically created for Pocket Triage.",
    embed: "https://embed.figma.com/proto/rijIcQxNm2704hV0qV8pQy/Mental-Health-Hub---Pocket-Triage?node-id=2098-38376&scaling=scale-down&content-scaling=fixed&page-id=2003%3A1270&starting-point-node-id=2098%3A38376&embed-host=share",
    bg: "#1D9E75"
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <PhaseBoard cards={phases} />
    </section>
  )
}
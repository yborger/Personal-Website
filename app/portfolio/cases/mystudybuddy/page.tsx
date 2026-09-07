"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "MyStudyBuddy",
    description: "As part of the Swarthmore College’s Software Engineering course, we were tasked with developing a project in a group. The group decided on a virtual study companion.",
    details: "My Study Buddy is a Google Chrome extension designed to assist the busy student with the reminders that are often forgotten, without acting as a distraction.",
    image: "/msb_imgs/phrog.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "The assignment goal was to create a project that we fully developed from scratch. The group's goal on the project was to create a buddy that would improve focus and productivity while also giving self-care reminders, as we were college students and that was a definite issue we faced.",
    image: "/artwork/bee_leaf.png",
    bg: "#B065AD",
  },
  {
    number: 3,
    title: "What I Did",
    description: "",
    details: "",
    image: "/artwork/bee_leaf.png",
    bg: "#1DC49E",
    slides: [
      {
        title: "Slide 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        details: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/artwork/bee_leaf.png",
      },
      {
        title: "Slide 2",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        details: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/artwork/bee_leaf.png",
      },
      {
        title: "Slide 3",
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
    bg: "#2E9EC4",
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <PhaseBoard cards={phases} />
    </section>
  )
}
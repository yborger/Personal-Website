"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "MyStudyBuddy",
    description: "As part of the Swarthmore College’s Software Engineering course, we were tasked with developing a project in a group. The group decided on a virtual study companion.",
    details: "My Study Buddy is a Google Chrome extension designed to assist the busy student with the reminders that are often forgotten, without acting as a distraction.",
    image: "/msb_imgs/select buddy.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "The group's goal on the project was to create a buddy that would improve focus and productivity while also giving self-care reminders, as we were college students and that was a definite issue we faced.",
    image: "/msb_imgs/select reminders.png",
    bg: "#B065AD",
  },
  {
    number: 3,
    title: "Process",
    description: "",
    bg: "#1DC49E",
    slides: [
      {
        title: "Agile Sprints",
        description: "As part of the software engineering course, we learned about different methods of project development and decided to incorporate the agile methodology. We divided certain parts of the project to focus on in our agile sprints.",
        details: "Our first week was planning our second week was designing how each feature was going to come together and our third week was when we started implementing separate features in our collaborative collaborative design each week. We had multiple days in class to work on this and that’s when we got together and did check-ins regarding our features and put them together.",
      },
      {
        title: "Research",
        description: "As college students, we had some insight on what would be useful, but we also reached out to others to gather some unbiased ideas of what was needed.",
        details: "We each reached out to 5-10 people around us, from various majors with different priorities, and asked them each what tends to be the biggest issue they face when trying to study. The majority responded with “social media” or the even simpler “my phone.” A pretty big quantity responded with “life” and, when asked to go into detail, would mention that they would get very hungry (sometimes out of nowhere). From there we had a more solid idea for the buddy.",
        image: "/msb_imgs/select blocked.png",
      },
      {
        title: "Design",
        description: "One group member focused on the Figma mock-ups and one group member focused on the HTML/CSS implementation of them, after we had agreed on the original hand-drawn sketches.",
        details: "The biggest thing we had agreed on was that the color scheme had to be a very contrasting palette because we really wanted to make sure accessibility was on the forefront of our minds.",
        image: "/msb_imgs/mock-ups.png",
      },
      {
        title: "Development",
        description: "We determined it should be a Google Chrome extension, that it had to have the ability to remind the student to take certain breaks, and it should block distractions.",
        details: "A study buddy that would functionally limit distractions like social media, and could give reminders to eat and drink, and even stretch, so the student is not shocked by their hunger or too sore to do anything afterwards. We also knew from the beginning that we did not want this to be a new distraction, so it could not be a whole application.",
        image: "/msb_imgs/console.png",
      },
      {
        title: "Test & Release",
        description: "The pop-up looked adorable, and I was really proud that it was fully functional! Alerts and reminders appeared on the screen without having to remember to re-open the pop-up.",
        image: "/msb_imgs/phrog.png",
      },
      {
        title: "Revamp",
        description: "A few years and a few UI/UX courses later, as I wrote out this reflection, I went to gather some images of the work and realized that I could clean up the design just a bit.",
        details: "I know how to modify what currently exists to make sure nothing in the code broke with my changes, and I cleaned up the design based on how I knew it was being used.",
        image: "/msb_imgs/mini update.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "",
    bg: "#2E9EC4",
    slides: [
      {
        title: "Collaboration & Communication",
        description: "At one point, the project had been moving forward in all aspects except for one feature. After a few weeks with no real progress done for this feature, we got together and tried to figure out what was going wrong. We were able to work through it very quickly, but it would have been even better to have talked about it from the beginning since it was the variety of ideas thrown around that got us to a viable solution.",
        details: "The specific feature was the reminders section, and the person working on it was trying to implement everything as separate threads but kept getting runtime errors that he could not resolve. Once this was brought to a group discussion, we were all able to suggest ways to resolve it, including making all the reminders into one thread. The solution wound up being 3 hard-coded threads for the hard-coded reminders, and the ability to add more individual threads for user-given reminders."
      },
      {
        title: "First Full Project",
        description: "This was the first time that I had created a full project and went through the full software development cycle to do so!",
        details: "In other courses all the way back to high school, I had projects and assignments. But they were just that: assignments. There was minimal creativity or problem-solving involved, and the prompts were very straightforward, saying “make a program that will do exactly this task.” This was the first time that I actually had a problem to solve and got to think critically about how to do so."
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
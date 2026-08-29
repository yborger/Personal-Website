"use client"
import PhaseBoard from 'app/components/phaseboard'
import { describe } from 'node:test'
import { MdDescription } from 'react-icons/md'

const phases = [
  {
    number: 1,
    title: "Introduction and Context",
    description: "Our Kids Read is a non-profit organization based in Maryland, dedicated to children's literacy programs. Their two main programs include book donations, and a reading buddy program.",
    details: "There were lots of additional pages that were piled into the navigation that, as Jahmal himself noted, was overwhelming to even look at.",
    image: "/okr_imgs/okr_logo.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goals",
    description: "Overall, the project is redesigning and “re-vamping” the website to appeal more towards his current audience, and to modernize the pages. The website was created years ago, and the design was not updated to reflect the new content.",
    image: "/okr_imgs/preferred.png",
    bg: "#A066D3",
  },
  {
    number: 3,
    title: "Empathize",
    description: "Jahmal needed a website that looks modern, but is still interesting. Based on his inspiration websites, he likes animated and clean design. The users need something simple and easy to follow, since the target audience is volunteers and company partnership.",
    details: "",
    bg: "#D4537E",
  },
  {
    number: 4,
    title: "Define",
    description: "",
    bg: "#C4895A",
    slides: [
      {
        title: "Define the Problem: Messy Navigation",
        description: "The navigation is unclear and confusing for even the founder himself. He commented that it was “a big mess” and wanted it to make more sense to someone outside of the organization. The navigation was two lines of different colors and fonts with no clear reason to their order.",
        image: "/okr_imgs/original_structure.png"
      },
      {
        title: "Define the Problem: Can't Grow",
        description: "The biggest issue I saw was that the website was not designed for the growth of the organization.",
        details: "The website was originally designed with fewer web pages than it currently has, meaning more pages were added in later on. The additional pages were not planned for and therefore do not fit the original concept.",
        image: "/okr_imgs/restructure.png"
      },
      {
        title: "Modernization",
        description: "The greatest wish for the project is for it to feel fresh and modern, but also established. He does not want it to look like a brand new organization, he wants it to look like a modernized organization."
      }      
    ]
  },

  {
    number: 5,
    title: "Ideate and Prototyping",
    description: "",
    bg: "#1D9E75",
    slides: [
      {
        title: "Ideate & Prototyping: Navigation",
        description: "There needed to be a hierarchy for this website that was easier to navigate and work through, that would be simple to build from. The restructured navigation included sections for About, Programs, Community, eStore, Get Involved, and the Reading Portal, with the Contact information in the footer.",
        details:"Over 100 pages were reorganized. Since this original restructuring, it has been edited to separate the Community into Volunteers and Sponsors, among other more minor changes.",
        image: "/okr_imgs/nav_options.png"
      },
      {
        title: "Ideate & Prototyping: Logo",
        description: "As an idea, we offered a few options to revamp the logo and color scheme to fit into the more modern scope and audience he was aiming for.",
        details: "While he did not add these to the website, he has been looking into hiring someone for a full rebrand and mentioned bringing these as references to his goal.",
        image: "/okr_imgs/logo_redesign.png"
      }
    ]
  },
  {
    number: 6,
    title: "Testing",
    description: "Since our audience covered such a great scope, I turned to individuals in a variety of careers as an informal test group, making sure to include a few teachers specifically for the more education-leaning aspect of the design.",
    bg: "#378ADD",
  },
  {
    number: 7,
    title: "Takeaways",
    description: "",
    bg: "#2E9EC4",
    slides: [
      {
        title: "Takeaway: Team Coordination",
        description: "Making sure the team was on the same page at all times when everyone had different levels of experience and time was fairly difficult. I was quite used to working with others that were specifically at my level in school, so this was a whole new system. Also, the volunteers were operating on a completely different schedule.",
      },
      {
        title: "Takeaway: Everything is New!",
        description: "In regards to experience, this was the first actual redesign project I have been involved in, and I was quickly put in charge of the team. Without any previous experience, I was both learning the ropes and immediately employing the process, so the learning curve was quite steep. I realized I enjoy design work and the details that go into the whole design process, so a really big win for me."
      },
      {
        title: "Takeaway: Feedback",
        description: "As someone who was fairly new, I didn't know just how much I could and should ask for feedback on the designs. A lot of the feedback we received came informally or with a lot of notes, eventually resulting in the understanding of what he actually wanted in the final product. The greatest fault was not asking more questions throughout the design process, as our initial description was not perfect.",
        details: "We spent a good amount of time operating off of information that grew outdated as the head of the organization would find something he wanted but hadn't known was an option."
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
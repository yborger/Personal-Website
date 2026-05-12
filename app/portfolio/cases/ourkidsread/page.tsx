"use client"
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import PhaseCard from 'app/components/PhaseCard'
import {
  color,
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"
import { useRef } from "react"

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}

function ParallaxCards({
  number,
  title,
  description,
  details,
  image,
  bg
}: {
  number: number
  title: string
  description: string
  details: string
  image: string
  bg: string
}){
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)

    return (
      <section className="card-container relative h-screen snap-start flex items-center justify-center ">
        <div ref={ref}
          className="card-content relative overflow-hidden">
          <PhaseCard
            number={number}
            title={title}
            description={description}
            details={details}
            image={image}
            bg={bg}
          />
        </div>
        <motion.h2
          initial={{visibility:"hidden"}}
          animate={{visibility:"visible"}}
          style={{ y , fontSize: "4rem", fontWeight: "bold", color: `${bg}37`, zIndex: -1}}
          >{`#${number}`}
          </motion.h2>
      </section>
    )
  }

export default function Page() {
  const {scrollYProgress} = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section className="relative">
      <div className=" gap-2 my-8 w-3/4 mx-auto place-items-center">
        <ParallaxCards 
          number={1}
          title="Understanding the Problem"
          description="The existing website had grown without a clear structure, creating navigation issues and inconsistent user flows."
          details="When I first reviewed the website, I realized the problem went beyond visual design. The organization had expanded over time, but the site structure had not evolved alongside it. New pages had been added without a scalable organizational system, resulting in fragmented navigation, duplicated layouts, and inconsistent user experiences. I approached the redesign as a systems problem focused on scalability, clarity, and maintainability rather than simply a visual refresh."
          image="/artwork/bee_leaf.png"
          bg="#7F77DD"
          />  
        <ParallaxCards 
          number={2}
          title="Auditing the System"
          description="Before redesigning the site, I worked with the team to fully map and evaluate the existing content structure."
          details='To understand the scope of the problem, I collaborated with volunteers and the organization’s founder to conduct a full content audit of the website. We documented existing pages, identified overlapping structures, and analyzed how the site had evolved over time. This process helped reveal where navigation inconsistencies and structural issues were creating confusion for users.'
          image="/artwork/group_hug.png"
          bg="#A066D3"
          />
        <ParallaxCards 
          number={3}
          title="Rebuilding the Information Architecture"
          description="I reorganized the site structure around how users actually interact with the organization." 
          details="Using the results of the content audit, I helped develop a new sitemap that grouped pages based on user intent rather than historical placement. Programs, community involvement, and participation pathways were consolidated into clearer categories, making the organization easier to understand and navigate. The goal was to create a structure that could continue scaling as the organization expanded."
          image="/artwork/BOOp.png"
          bg="#C45AA8"
          />
        <ParallaxCards 
              number={4}
              title="Designing for Scalability"
              description="I introduced navigation constraints designed to prevent the site from becoming overly complex as it grows." 
              details="One of the biggest structural goals of the redesign was maintaining long-term scalability. To avoid deeply nested navigation systems, I proposed limiting the site architecture to a top-level navigation bar with a single dropdown layer. This ensured that pages would remain accessible within two clicks while preventing navigation complexity from growing exponentially over time."
              image="/artwork/BOOp.png"
              bg="#D4537E"
          />
        <ParallaxCards 
              number={5}
              title="Component Thinking"
              description="I approached the redesign using reusable interface patterns instead of isolated page layouts." 
              details="While developing wireframes, I encouraged the team to think about the interface as a collection of reusable components rather than individual static pages. Shared elements like navigation, contributor cards, and footer sections were separated into repeatable patterns that could scale as content expanded. This structure also aligned naturally with modern frontend development practices and component-based frameworks."
              image="/artwork/BOOp.png"
              bg="#D46B5A"
          />
        <ParallaxCards 
              number={6}
              title="Accessibility in Design"
              description="Accessibility considerations shaped both the visual and structural design decisions." 
              details="Throughout the redesign process, I referenced WCAG accessibility guidelines when evaluating color contrast, readability, and interface clarity. We also explored mobile-friendly navigation concepts using icons and progressive disclosure patterns to balance usability with visual simplicity. Accessibility was treated as part of the core design process rather than an afterthought."
              image="/artwork/BOOp.png"
              bg="#C4895A"
          />
        <ParallaxCards 
              number={7}
              title="Iterating Based on Feedback"
              description="Stakeholder feedback shifted the project from an informational website toward a participation-focused experience." 
              details="After presenting our initial wireframes, the organization's founder explained that the website needed to focus less on showcasing the organization itself and more on guiding people toward getting involved. Based on this feedback, we restructured the homepage to emphasize storytelling, community impact, and clearer calls-to-action that encouraged participation and volunteer engagement."
              image="/artwork/BOOp.png"
              bg="#378ADD"
          />
        <ParallaxCards 
              number={8}
              title="Leading the Volunteers"
              description="I adapted the team workflow to better support volunteers with different experience levels and schedules." 
              details="As project lead, I coordinated collaboration between volunteers with varying availability and technical backgrounds. Over time, I realized that progress improved significantly when meetings shifted from status updates into collaborative working sessions. I also introduced volunteers to foundational UX and systems-thinking concepts, helping create a more structured and consistent design process."
              image="/artwork/BOOp.png"
              bg="#2E9EC4"
          />
        <ParallaxCards 
              number={9}
              title="Project Pause"
              description="The redesign ultimately paused when the organization decided to pursue a full rebrand." 
              details="During our final presentations, I shared exploratory updates to the organization’s logo and color palette to better align the visual identity with the redesign direction. This led to a larger conversation about branding, and the founder decided that a full rebrand with a professional brand designer would be necessary before implementation. Although development paused, the structural redesign work established a strong foundation for future implementation."
              image="/artwork/BOOp.png"
              bg="#1D9E75"
          />
        <ParallaxCards 
              number={10}
              title="Reflections and Takeaways"
              description="This project taught me how frontend structure, UX systems, and scalability decisions all influence one another." 
              details="This project reinforced the importance of treating UX and frontend architecture as interconnected systems rather than separate disciplines. Working through navigation scalability, reusable component thinking, accessibility, and stakeholder iteration gave me a much stronger understanding of how technical structure shapes user experience. It also strengthened how I approach frontend problems from both a product and systems perspective."
              image="/artwork/BOOp.png"
              bg="#3BAD8A"
          />
        <motion.div className="fixed left-0 right-0 bottom-12 h-[5px] bg-emerald-300" style={{ scaleX }} />
      </div>
    </section>
  )
}

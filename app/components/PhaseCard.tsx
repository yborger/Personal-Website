"use client"

interface CardProps {
        number: number;
        title: string;
        description: string;
        image: string;
        bg: string;
}


export default function PhaseCard({number, title, description, image, bg}: CardProps){
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ 
        target: ref,
        offset: ["start end", "end start"],
 })
    const y = useTransform(scrollYProgress, [0,1], [100, -100])

    return(
        <section 
                ref={ref}
                className="h-3/4 flex items center justify-center relative">
        {/* PHASE NUMBER - PARALLAX SETUP */}
        <motion.div 
                style={{y}}
                className="absolute right-16 text-7xl font-bold opacity-20">
                {number}
        </motion.div>

        {/* CONTENT */}
        <motion.div
                initial={{opacity:0,y:60}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:0.6, ease:"easeInOut"}}
                viewport={{once:true}}
                className={'rounded-md p-6 m-4 shadow-lg max-w-4xl bg-gradient-to-b ' + bg}>

                <h2 className="text-2xl font-bold mb-6 text-left">{title}</h2>
                <div className="m-4 flex flex-row items-start justify-center gap-4">
                        <img 
                                src={image} 
                                alt={title} 
                                className= "w-3/5 h-auto rounded-xl" />
                
                        <p className="w-auto text-lg text-left">{description}</p>
                </div>
        </motion.div>
        </section>
    )
}
"use client"
import { useState } from "react"

interface CardProps {
        number: number;
        title: string;
        description: string;
        details: string;
        image: string;
        bg: string;
}

//not yet checked: how to make sure show more is only when there are details

 export default function PhaseCard({number, title, description, details, image, bg}: CardProps){
    //some descriptions are too long, so we can add a "read more" button that expands the description
    const [expanded, setExpanded] = useState(false)

    return(
        <section className="h-3/4 flex items-center justify-center relative">
            <div className="rounded-md p-6 m-4 shadow-lg max-w-4xl border px-6 py-5" style={{
                    borderColor: `${bg}59`,
                    background: `${bg}14`,
                }}>
                <h2 className="text-2xl font-bold mb-6 text-left">{title}</h2>
                <div className="m-4 grid grid-cols md:grid-cols-[3fr_2fr] items-start gap-4">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-3/5 h-auto rounded-xl justify-self-center"
                    />

                    <div className="text-lg text-left">
                        <p>{description}</p>

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-4 text-sm font-medium underline"
                        >
                            {expanded ? "Show less" : "Show more"}
                        </button>
                    </div>
                    
                </div>
                {expanded && (
                    <p className="mt-4 text-sm">
                        {details}
                    </p>
                )}
            </div>
        </section>
    )
}
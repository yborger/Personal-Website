
/*

    Notes/checklist:

    This is specifically for the "scroll and it will appear" section of the projects
    So these are the cards that fan out/in as you scroll

    -title: at the top, say the PHASE TITLE (design phase, planning, etc.)
    -img: image with image carousel option?
            -can i make the img parameter be like a folder route and have it display all images in the folder in a carousel?
    -descrip: the writing that goes along with this card
            -expect it to be between 2-5 sentences
    
    Animation into global.css, left appear is written so now we need the full card

 */
interface CardProps {
        title: string;
        description: string;
        image: string;
        bg: string;
}


export default function PhaseCard({title, description, image, bg}: CardProps){
    return(
        <div className={`border-4 border-black rounded-md gap-4 m-8 shadow-lg p-8 w-3/4 max-w-4xl bg-gradient-to-b ${bg}`}>
                <h2 className="text-2xl font-bold mb-6 text-left">{title}</h2>
                <div className="flex-1 flex justify-center">
                        <img 
                                src={image} 
                                alt={title} 
                                className= "w-1/2 h-auto object-contain rounded-xl m-4" />
                </div>
                <div className= "w=1/2 m-8">
                <p className="flex-1 text-gray-700 text-lg text-left">{description}</p>
                </div>
        </div>
    )
}
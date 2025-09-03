
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
        img: string;
        descrip: string;
}


export default function PhaseCard({title, img, descrip}: CardProps){
    return(
        <div className="border-4 border-black rounded-md gap-4 m-8 flex items-center justify-center">
                <img src={img} alt={title} className= "w-1/2 h-auto rounded-xl m-8" />
                <div className= "w=1/2 m-8">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="text-m">{descrip}</p>
                </div>
        </div>
    )
}
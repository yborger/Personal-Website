
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

export default function phaseCard(title, img, descrip){
    return(
        <div className="py-4 group relative overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                <img src={img} alt={title} className= "w-full h-auto rounded-xl" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white bg-black/30 backdrop-blur-lg opacity-0 group-hover:opacity-95 transition-opacity ">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-m">{descrip}</p>
                </div>
            </div>
    )
}
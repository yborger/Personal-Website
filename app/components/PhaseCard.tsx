
interface CardProps {
        title: string;
        description: string;
        image: string;
        bg: string;
}

//not the final look, just a placeholder for now

export default function PhaseCard({title, description, image, bg}: CardProps){
    return(
        <div className={`rounded-md p-6 m-4 shadow-lg w-auto max-w-4xl bg-gradient-to-b ${bg}`}>
                <h2 className="text-2xl font-bold mb-6 text-left">{title}</h2>
                <div className="m-4 flex flex-col items-start justify-center gap-4">
                        <img 
                                src={image} 
                                alt={title} 
                                className= "w-auto h-auto rounded-xl" />
                
                        <p className="w-auto text-lg text-left">{description}</p>
                </div>
        </div>
    )
}
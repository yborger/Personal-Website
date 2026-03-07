
interface CardProps {
        number: number;
        title: string;
        description: string;
        image: string;
        bg: string;
}

 export default function PhaseCard({number, title, description, image, bg}: CardProps){
    return(
        <section className="h-3/4 flex items-center justify-center relative">
            <div className={"rounded-md p-6 m-4 shadow-lg max-w-4xl bg-gradient-to-b " + bg}>
                <h2 className="text-2xl font-bold mb-6 text-left">{title}</h2>

                <div className="m-4 grid grid-cols md:grid-cols-[3fr_2fr] items-start gap-4">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-3/5 h-auto rounded-xl justify-self-center"
                    />

                    <p className="text-lg text-left">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    )
}
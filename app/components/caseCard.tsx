
import Link from 'next/link'

type CaseMetadata = {
    title: string
    image: string
    summary: string
    slug: string
    tags?: string[]
}

/* 
    Notes:
    CHECK --add in a hover-over for the title
    CHECK --upon click, open the case's page 
    --for now, quick summaries are not needed
    CHECK --add padding and rounded corners for the illusion of non-perfect squares
*/

export default function CaseCard ({title, image, summary, slug, tags = []}: CaseMetadata) {
    return(
        <Link href={slug}>
            <div className="py-4 group relative overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                <img src={image} alt={title} className= "w-full h-auto rounded-xl" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white bg-black/30 backdrop-blur-lg opacity-0 group-hover:opacity-95 transition-opacity ">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-m">{summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-white/30 border backdrop-blur-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
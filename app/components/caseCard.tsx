
import Link from 'next/link'

type CaseMetadata = {
    title: string
    image: string
    summary: string
    slug: string
}

/* 
    Notes:
    CHECK --add in a hover-over for the title
    CHECK --upon click, open the case's page 
    --for now, quick summaries are not needed
    CHECK --add padding and rounded corners for the illusion of non-perfect squares
*/

export default function CaseCard ({title, image, summary, slug}: CaseMetadata) {
    return(
        <Link href={slug}>
            <div className="py-4 group relative overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                <img src={image} alt={title} className= "w-full h-auto rounded-xl" />

                <div className="absolute inset-0 bg-indigo-800 bg-opacity-50 opacity-0 group-hover:opacity-95 transition-opacity p-4 flex flex-col justify-center items-center text-center text-white">
            
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-m">{summary}</p>
                </div>
            </div>
        </Link>
    )
}
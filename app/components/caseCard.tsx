import { exampleData, okrData, musicData, designData } from "app/portfolio/cases"

/* NOT CURRENTLY MADE */

type CaseMetadata = {
    title: string
    image: string
    summary: string
    slug: string
}

/* 
    Notes:
    --add in a hover-over for the title
    --upon click, open the case's page
    --for now, quick summaries are not needed
    --add padding and rounded corners for the illusion of non-perfect squares
*/

export default function CaseCard ({title, image, summary, slug}: CaseMetadata) {
    return(
        <img src={image} alt={title} className="w-1/3 h-auto rounded-xl" />

    )
}
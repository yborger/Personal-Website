import Link from 'next/link'

type CaseMetadata = {
    title: string
    image?: string
    summary: string
    slug: string
    tags?: string[]
    demo?: string
}

export default function CaseCard ({title, image, summary, slug, tags = [], demo}: CaseMetadata) {
    const isGithub = demo?.includes('github.com')
    const demoLabel = isGithub ? 'github ↗' : 'demo ↗'

    return(
        <Link href={slug}>
            <div className="flex flex-row gap-3 py-4 transition-transform hover:-translate-y-1 cursor-pointer">
                
                {/* polaroid frame */}
                {image && (
                    <div className="flex-shrink-0 bg-stone-50 dark:bg-neutral-800 p-2 pb-8 shadow-lg rounded-sm w-40 border border-neutral-200 dark:border-neutral-700 relative">
                        <img 
                            src={image} 
                            alt={title} 
                            className="w-full h-32 object-cover rounded-sm"
                        />
                        {demo ? (
                            <a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="absolute bottom-1.5 left-0 right-0 text-center text-[10px] text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
                            >
                                {demoLabel}
                            </a>
                        ) : (
                            <span className="absolute bottom-1.5 left-0 right-0 text-center text-[10px] text-neutral-300 dark:text-neutral-600 select-none">
                                ◦
                            </span>
                        )}
                    </div>
                )}

                {/* info box */}
                <div className="flex flex-col justify-center gap-2 bg-stone-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm px-4 py-3 shadow-lg flex-1">
                    <h2 className="text-base font-semibold leading-snug">{title}</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{summary}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400"
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
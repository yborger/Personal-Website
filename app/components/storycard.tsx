//This file will be to make the line in home alt 3, since the scroll data is client-side and i can't have that directly on the home page


type CardData = {
    label: string
    title: string
    body: string
    pills: string[]
    index: number
    color: string
    cardRef: (el: HTMLDivElement | null) => void

}


export default function StoryCard({ label,
  title,
  body,
  pills,
  index,
  color,
  cardRef,
}: CardData){
    return (
        <div
      ref={cardRef}
      style={{
        borderColor: `${color}59`,
        background: `${color}14`,
      }}
      className={[
        'relative z-10 mb-[280px]',
        index % 2 === 0
          ? 'ml-[100px] mr-8'
          : 'ml-8 mr-[100px]','opacity-0 translate-y-3','transition-all duration-500 ease-out','border rounded-xl px-6 py-5',].join(' ')}
    ><p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-1">
        {label}
      </p>
      <p className="text-[17px] font-medium leading-snug mb-2 text-neutral-800 dark:text-neutral-100">
        {title}
      </p>
      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-0">
        {body}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {pills.map(pill => (
          <span
            key={pill}
            style={{
              borderColor: `${color}66`,
              background: `${color}1a`,
              color: color,
            }}
            className="text-[11px] px-2.5 py-0.5 rounded-full border"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}

import { TeamPortrait } from "@/components/team-portrait"

type ProgramExpertCardProps = {
  expert: {
    experience?: Array<string>
    experienceTitle?: string
    highlights: Array<string>
    image: string
    imageScale?: number
    name: string
    profileParagraphs?: Array<string>
    title: string
  }
}

export function ProgramExpertCard({ expert }: ProgramExpertCardProps) {
  const hasProfileText = Boolean(expert.profileParagraphs?.length)

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#cbdff1] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
      <TeamPortrait src={expert.image} alt={expert.name} imageScale={expert.imageScale} />
      <div className="p-5">
        <h3 className="font-heading text-[1.05rem] leading-[1.1] tracking-[-0.025em] text-slate-950">{expert.name}</h3>
        <p className="mt-2 text-sm font-semibold leading-5 text-[#978360]">{expert.title}</p>
        {hasProfileText ? (
          <div className="mt-4 space-y-3 text-[0.82rem] leading-5 text-slate-600">
            {expert.profileParagraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {expert.experienceTitle ? (
              <p className="pt-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#978360]">
                {expert.experienceTitle}
              </p>
            ) : null}
            {expert.experience?.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        ) : expert.highlights.length > 0 ? (
          <ul className="mt-4 grid gap-2">
            {expert.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2 text-[0.82rem] leading-5 text-slate-600">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

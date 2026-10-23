import Image from 'next/image'
import Section from './Section'
import Reveal from './Reveal'
import { about } from '@/content/site'

export default function About() {
  return (
    <Section id="about" title="About">
      <Reveal className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative aspect-[4/5] border border-ink/15 bg-ink/[0.04] md:col-span-5">
          {about.photo
            ? <Image src="/images/band-about.jpg" alt="Red Door" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            : <span className="eyebrow absolute inset-0 grid place-items-center text-ink/50">Band photo placeholder</span>}
        </div>
        <div className="md:col-span-7">
          <div className="max-w-xl space-y-5 text-lg leading-relaxed md:text-xl">
            {about.bio.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="mt-12 border-t border-ink">
            {about.members.map((m) => (
              <li key={m.name} className="flex items-baseline justify-between gap-4 border-b border-ink py-4">
                <span className="font-display text-3xl font-black uppercase tracking-tighter md:text-4xl">{m.name}</span>
                <span className="eyebrow text-right">{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

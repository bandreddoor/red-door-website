
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
            ? <Image
                src={about.photo}
                alt="Red Door"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            : <span className="eyebrow absolute inset-0 grid place-items-center text-ink/50">
                Band photo placeholder
              </span>}
        </div>

        <div className="md:col-span-7">
          <div className="max-w-xl space-y-5 text-lg leading-relaxed md:text-xl">
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Band members */}
          <div className="mt-12">
            <p className="eyebrow mb-5 text-red">The Band</p>

            <ul>
              {about.members.map((m) => (
                <li
                  key={m.name}
                  className="border-b border-ink/25 py-5 first:border-t"
                >
                  <p className="font-display text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
                    {m.name}
                  </p>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
                    {m.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

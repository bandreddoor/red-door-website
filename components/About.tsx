
'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import { about } from '@/content/site'

function Member({ name, role, index }: {
  name: string
  role: string
  index: number
}) {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('member-in')
          observer.unobserve(element)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      className="member-scroll border-b border-ink/25 py-5 first:border-t"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="font-display text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
        {name}
      </p>

      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
        {role}
      </p>
    </li>
  )
}

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

          <div className="mt-12">
            <p className="eyebrow mb-5 text-red">The Band</p>

            <ul>
              {about.members.map((m, index) => (
                <Member
                  key={m.name}
                  name={m.name}
                  role={m.role}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

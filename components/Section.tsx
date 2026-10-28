
import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function Section({ id, title, children, className = '' }: { id: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`px-5 py-16 md:px-10 md:py-24 ${className}`}>
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 id={`${id}-h`} className="h-section">{title}</h2>
        </Reveal>
        <div className="mt-8 md:mt-12">{children}</div>
      </div>
    </section>
  )
}

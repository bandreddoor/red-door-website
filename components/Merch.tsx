import Image from 'next/image'
import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { merch } from '@/content/site'

export default function Merch() {
  return null
  return (
    <Section id="merch" title="Merch">
      <Reveal>
        <p className="eyebrow mb-12 text-red">{merch.note}</p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
          {merch.products.map((p) => (
            <li key={p.name}>
              <div className="relative aspect-[4/5] border border-ink/15 bg-ink/[0.04]">
                {p.image
                  ? <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
                  : <span className="eyebrow absolute inset-0 grid place-items-center text-ink/50">{p.category}</span>}
                {p.placeholder && <span className="eyebrow absolute left-3 top-3 text-red">Placeholder</span>}
              </div>
              <h3 className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">{p.name}</h3>
              <p className="eyebrow mt-1 text-ink/60">{p.price || 'Price TBA'}{p.sizes.length > 0 && ` · ${p.sizes.join(' / ')}`}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">{p.description}</p>
              <ExtLink href={p.url} className="btn mt-5">{p.url ? 'Shop Now' : 'Coming Soon'}</ExtLink>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

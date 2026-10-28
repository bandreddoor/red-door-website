import Image from 'next/image'
import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { music } from '@/content/site'

export default function Music() {
  return null
  const { featured: f, links } = music
  const rows = [['Spotify', links.spotify], ['Apple Music', links.appleMusic], ['YouTube', links.youtube]] as const
  return (
    <Section id="music" title="Music">
      <Reveal className="grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="relative aspect-square border border-ink/15 bg-ink/[0.04] md:col-span-5">
          {f.artwork
            ? <Image src={f.artwork} alt={`${f.title} artwork`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            : <span className="eyebrow absolute inset-0 grid place-items-center text-ink/50">Artwork placeholder</span>}
        </div>
        <div className="md:col-span-7">
          <p className="eyebrow text-red">Latest release</p>
          <h3 className="mt-3 font-display text-4xl font-black uppercase tracking-tighter md:text-6xl">{f.title || 'New music coming soon'}</h3>
          <div className="mt-8">
            {f.spotifyEmbedUrl
              ? <iframe src={f.spotifyEmbedUrl} title="Spotify player" width="100%" height="352" loading="lazy" allow="encrypted-media" className="border-0" />
              : <div className="grid h-40 place-items-center border border-dashed border-ink/30 px-4 text-center"><span className="eyebrow text-ink/50">Spotify player — add embed link in content/site.ts</span></div>}
          </div>
          <ul className="mt-10 divide-y divide-ink border-y border-ink">
            {rows.map(([name, href]) => (
              <li key={name}>
                <ExtLink href={href} className="flex items-center justify-between py-4 font-display text-2xl font-extrabold uppercase tracking-tight transition-colors hover:text-red">
                  <span>{name}</span><span aria-hidden className="eyebrow">{href ? '↗' : 'Soon'}</span>
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

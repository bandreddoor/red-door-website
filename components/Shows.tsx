import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { shows } from '@/content/site'

const parse = (d: string) => { const [y, m, day] = d.split('-').map(Number); return new Date(y, m - 1, day) }

export default function Shows() {
  const n = new Date()
  const today = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime()
  const list = shows.filter((s) => s.placeholder || parse(s.date).getTime() >= today)
    .sort((a, b) => parse(a.date).getTime() - parse(b.date).getTime())
  return (
    <Section id="shows" title="Shows">
      {list.length === 0 ? (
        <p className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">New dates coming soon.</p>
      ) : (
        <Reveal>
          {list.some((s) => s.placeholder) && <p className="eyebrow mb-6 text-red">Sample dates — replace in content/site.ts</p>}
          <ol className="border-t border-ink">
            {list.map((s) => {
              const d = parse(s.date)
              return (
                <li key={s.date + s.venue} className="flex flex-col gap-1 border-b border-ink py-6 transition-colors hover:text-red sm:grid sm:grid-cols-[9rem_1fr_1.4fr_9rem] sm:items-center sm:gap-8 md:py-8">
                  <time dateTime={s.date} className="font-display text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
                    {d.toLocaleDateString('en-US', { month: 'short' })} {String(d.getDate()).padStart(2, '0')}
                  </time>
                  <span className="text-2xl font-bold uppercase tracking-wide">{s.city}, {s.state}</span>
                  <span className="text-2xl font-medium uppercase tracking-wide">
                    {s.venue}
                    {s.placeholder && <span className="eyebrow ml-3 border border-red px-2 py-0.5 text-red">Sample</span>}
                  </span>
                  <span className="mt-3 sm:mt-0 sm:justify-self-end">
                    {s.soldOut ? <span className="eyebrow line-through">Sold out</span>
                      : s.ticketUrl ? <ExtLink href={s.ticketUrl} className="btn text-ink">Tickets</ExtLink>
                      : <span className="eyebrow text-ink/60"></span>}
                  </span>
                </li>
              )
            })}
          </ol>
        </Reveal>
      )}
    </Section>
  )
}

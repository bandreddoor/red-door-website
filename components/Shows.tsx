
import ExtLink from './ExtLink'
import Reveal from './Reveal'
import { shows } from '@/content/site'

const parse = (d: string) => {
  const [y, m, day] = d.split('-').map(Number)
  return new Date(y, m - 1, day)
}

export default function Shows() {
  const n = new Date()
  const today = new Date(
    n.getFullYear(),
    n.getMonth(),
    n.getDate()
  ).getTime()

  const list = shows
    .filter(
      (s) => s.placeholder || parse(s.date).getTime() >= today
    )
    .sort(
      (a, b) =>
        parse(a.date).getTime() - parse(b.date).getTime()
    )

  return (
    <section
      id="shows"
      aria-labelledby="shows-h"
      className="px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-[0.85fr_2fr] md:gap-12 lg:gap-20">

        {/* Sticky Shows Heading */}
        <div className="md:sticky md:top-24 md:self-start">
          <h2 id="shows-h" className="h-section">
            Shows
          </h2>
        </div>

        {/* Show List */}
        <div>
          {list.length === 0 ? (
            <Reveal>
              <p className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
                New dates coming soon.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <ol className="space-y-10 md:space-y-12">
                {list.map((s, index) => {
                  const d = parse(s.date)

                  return (
                    <li
                      key={`${s.date}-${s.venue}-${index}`}
                      className="grid grid-cols-[5.5rem_1fr] items-center gap-x-5 gap-y-3 sm:grid-cols-[6.5rem_1fr_auto] sm:gap-x-8"
                    >
                      {/* Date */}
                      <time
                        dateTime={s.date}
                        className="row-span-2 font-display text-4xl font-black uppercase leading-none tracking-tighter text-red md:text-5xl"
                      >
                        <span className="block">
                          {d.toLocaleDateString('en-US', {
                            month: 'short',
                          })}
                        </span>
                        <span className="block">
                          {String(d.getDate()).padStart(2, '0')}
                        </span>
                      </time>

                      {/* Show Details */}
                      <div>
                        <p className="text-xl font-bold uppercase tracking-wide md:text-2xl">
                          {s.city}, {s.state}
                        </p>

                        <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-ink/55">
                          {s.venue}
                        </p>

                        <p className="eyebrow mt-2 text-ink/40">
                          {s.eventType === 'private'
                            ? 'Private Event'
                            : 'Public Show'}
                          {s.soldOut && ' · Sold Out'}
                        </p>

                        {s.placeholder && (
                          <span className="eyebrow mt-2 inline-block text-red">
                            Sample
                          </span>
                        )}
                      </div>

                      {/* Tickets */}
                      <div className="col-start-2 sm:col-start-3 sm:row-start-1">
                        {s.soldOut ? (
                          <span className="eyebrow text-ink/50">
                            Sold Out
                          </span>
                        ) : s.eventType === 'public' && s.ticketUrl ? (
                          <ExtLink
                            href={s.ticketUrl}
                            className="eyebrow font-bold text-red transition-opacity hover:opacity-60"
                          >
                            Tickets ↗
                          </ExtLink>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

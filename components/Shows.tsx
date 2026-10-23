
import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { shows, contact } from '@/content/site'

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
    <Section id="shows" title="Shows">
      {list.length === 0 ? (
        <Reveal>
          <p className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            New dates coming soon.
          </p>
        </Reveal>
      ) : (
        <Reveal>
          <ol className="border-t border-ink">
            {list.map((s) => {
              const d = parse(s.date)

              return (
                <li
                  key={s.date + s.venue}
                  className="flex flex-col gap-3 border-b border-ink py-8 transition-colors hover:text-red sm:grid sm:grid-cols-[9rem_1fr_1.4fr_9rem] sm:items-center sm:gap-8 md:py-10"
                >
                  {/* Date */}
                  <time
                    dateTime={s.date}
                    className="font-display text-5xl font-black uppercase leading-none tracking-tighter md:text-6xl"
                  >
                    {d.toLocaleDateString('en-US', {
                      month: 'short',
                    })}{' '}
                    {String(d.getDate()).padStart(2, '0')}
                  </time>

                  {/* Location */}
                  <span className="text-2xl font-bold uppercase tracking-wide">
                    {s.city}, {s.state}
                  </span>

                  {/* Venue and event type */}
                  <div>
                    <p className="text-2xl font-medium uppercase tracking-wide">
                      {s.venue}
                    </p>

                    <p className="eyebrow mt-2 text-ink/50">
                      {s.eventType === 'private'
                        ? 'Private Event'
                        : 'Public Show'}
                    </p>

                    {s.placeholder && (
                      <span className="eyebrow mt-2 inline-block border border-red px-2 py-0.5 text-red">
                        Sample
                      </span>
                    )}
                  </div>

                  {/* Tickets / Status */}
                  <div className="mt-2 sm:mt-0 sm:justify-self-end">
                    {s.soldOut ? (
                      <span className="eyebrow text-ink/50">
                        Sold Out
                      </span>
                   ) : s.eventType === 'private' ? null : s.ticketUrl ? (
                      <ExtLink
                        href={s.ticketUrl}
                        className="btn text-ink"
                      >
                        Tickets ↗
                      </ExtLink>
                    ) : (
                      <span className="eyebrow text-ink/50">
                        Details Soon
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </Reveal>
      )}

      {/* Booking inquiry */}
      <Reveal>
        <div className="mt-20 flex flex-col gap-6 md:mt-28 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-red">
              Bring Red Door to your event
            </p>

            <h3 className="font-display text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
              Want to book
              <br />
              Red Door?
            </h3>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 md:text-lg">
              College events, private parties, venues, and
              festivals. Get in touch about bringing us to your
              next event.
            </p>
          </div>

          <a
            href={`mailto:${contact.booking}?subject=${encodeURIComponent(
              contact.bookingSubject
            )}`}
            className="btn w-fit shrink-0 text-ink"
          >
            Booking Inquiries ↗
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

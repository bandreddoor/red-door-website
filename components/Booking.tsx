import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { contact } from '@/content/site'

const eventTypes = ['College events & Greek Life', 'Private Parties', 'Bars & Live Music Venues']

export default function Booking() {
  const href = contact.booking
    ? `mailto:${contact.booking}?subject=${encodeURIComponent(contact.bookingSubject)}`
    : ''

  return (
    <Section id="booking" title="Booking" className="bg-red text-cream on-red">
      <Reveal className="grid gap-12 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5 text-cream/70">Booking Red Door</p>
          <h3 className="max-w-3xl font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
            Have a show in mind?
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
            For booking inquiries, availability, and event details, get in touch with our booking team.
          </p>
          <ExtLink href={href} className="btn mt-8 border-cream text-cream hover:border-cream hover:bg-cream hover:text-red">
            Contact Booking ↗
          </ExtLink>
        </div>

        <div className="border-t border-cream/40 pt-5 md:col-span-5 md:border-t-0 md:border-l md:pl-10">
          <p className="eyebrow mb-5 text-cream/70">Available for</p>
          <ul className="space-y-3">
            {eventTypes.map((type) => (
              <li key={type} className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                {type}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-cream/40 pt-5 text-sm text-cream/75">
            Booking handled by Beatline Production
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

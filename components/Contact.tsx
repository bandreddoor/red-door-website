import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { contact, social } from '@/content/site'

const mail = (e: string) => (e ? `mailto:${e}` : '')

export default function Contact() {
  const rows = [
    ['Booking', contact.booking, mail(contact.booking), 'HUNTER@BEATLINEPD.COM'],
    ['General', contact.general, mail(contact.general), 'BANDREDDOOR@GMAIL.COM'],
    ...(contact.management ? [['Management', contact.management, mail(contact.management), '']] : []),
    ['Instagram', social.instagram && '@REDDOORBAND', social.instagram, '@REDDOORBAND'],
  ]
  const bookingHref = contact.booking ? `mailto:${contact.booking}?subject=${encodeURIComponent(contact.bookingSubject)}` : ''
  return (
    <Section id="contact" title="Contact" className="on-red bg-red text-cream">
      <Reveal className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="max-w-sm text-lg leading-relaxed">Booking inquiries from venues, college organizations, promoters, and event planners.</p>
          <ExtLink href={bookingHref} className="btn mt-8">Booking inquiry</ExtLink>
        </div>
        <dl className="border-t border-cream/60 md:col-span-7">
          {rows.map(([label, text, href, fallback]) => (
            <div key={label} className="flex flex-col gap-1 border-b border-cream/60 py-5 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="eyebrow">{label}</dt>
              <dd className="font-display text-xl font-extrabold tracking-tight md:text-3xl">
                <ExtLink href={href} className="underline-offset-4 hover:underline">{text || fallback}</ExtLink>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}

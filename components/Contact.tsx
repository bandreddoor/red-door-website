
import Section from './Section'
import Reveal from './Reveal'
import ExtLink from './ExtLink'
import { contact, social } from '@/content/site'

export default function Contact() {
  const rows = [
    ['Booking', 'HUNTER@BEATLINEPD.COM', 'mailto:hunter@beatlinepd.com'],
    ['General', contact.general, contact.general ? `mailto:${contact.general}` : ''],
    ['Instagram', '@REDDOORBAND', social.instagram],
    ['TikTok', '@REDDOORBAND', social.tiktok],
  ]

  return (
    <Section id="contact" title="Contact" className="on-red bg-red text-cream">
      <Reveal className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="max-w-sm text-lg leading-relaxed">
            For booking inquiries, general questions, and everything else, reach out or find us on social.
          </p>
        </div>
        <dl className="border-t border-cream/60 md:col-span-7">
          {rows.map(([label, value, href]) => (
            <div key={label} className="flex flex-col gap-1 border-b border-cream/60 py-5 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="eyebrow">{label}</dt>
              <dd className="font-display text-xl font-extrabold tracking-tight md:text-3xl">
                <ExtLink href={href} className="underline-offset-4 hover:underline">{value}</ExtLink>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}

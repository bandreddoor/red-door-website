import Image from 'next/image'
import ExtLink from './ExtLink'
import { contact, social, logos } from '@/content/site'

export default function Footer() {
  const links = [['Instagram', social.instagram], ['TikTok', social.tiktok]] as const
  return (
    <footer className="bg-ink px-5 py-14 text-cream md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <Image src={logos.cream} alt="Red Door" width={160} height={160} className="-ml-4 h-40 w-40" />
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map(([name, href]) => <li key={name}><ExtLink href={href} className="eyebrow transition-colors hover:text-red">{name}</ExtLink></li>)}
        </ul>
      </div>
      <div className="eyebrow mx-auto mt-12 flex max-w-[1600px] flex-col gap-2 border-t border-cream/25 pt-6 text-cream/70 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Red Door Band LLC. All rights reserved.</p>
        <p>Booking: <ExtLink href={contact.booking && `mailto:${contact.booking}`}>{contact.booking || 'HUNTER@BEATLINEPD.COM'}</ExtLink></p>
      </div>
    </footer>
  )
}

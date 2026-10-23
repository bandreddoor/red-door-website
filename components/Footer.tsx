import Image from 'next/image'
import ExtLink from './ExtLink'
import { contact, social, logos } from '@/content/site'

export default function Footer() {
  return (
    <footer className="bg-ink px-5 py-14 text-cream md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#home" aria-label="Red Door, back to top">
            <Image src={logos.cream} alt="Red Door" width={160} height={160} className="-ml-4 h-36 w-36 object-contain" />
          </a>
          <p className="eyebrow mt-2 text-cream/60">Starkville, Mississippi</p>
        </div>

        <div className="flex flex-col gap-8 md:items-end">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li><ExtLink href={social.instagram} className="eyebrow transition-colors hover:text-red">Instagram ↗</ExtLink></li>
            <li><ExtLink href={social.tiktok} className="eyebrow transition-colors hover:text-red">TikTok ↗</ExtLink></li>
            <li><a href="#booking" className="eyebrow transition-colors hover:text-red">Booking</a></li>
            <li><a href="#home" className="eyebrow transition-colors hover:text-red">Back to top ↑</a></li>
          </ul>
          <a href={`mailto:${contact.booking}?subject=${encodeURIComponent(contact.bookingSubject)}`} className="eyebrow text-cream/75 transition-colors hover:text-cream">
            {contact.booking}
          </a>
        </div>
      </div>

      <div className="eyebrow mx-auto mt-12 flex max-w-[1600px] flex-col gap-2 border-t border-cream/25 pt-6 text-cream/70 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Red Door. All rights reserved.</p>
        <p>Starkville, Mississippi</p>
      </div>
    </footer>
  )
}

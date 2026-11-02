
import type { Metadata } from 'next'
import Link from 'next/link'
import BookingForm from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Submit a booking inquiry for Red Door.',
}

export default function BookingPage() {
  return (
    <main id="main" className="min-h-screen bg-[#fcf1e5] text-black">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
        >
          <span className="mr-2">←</span> Red Door
        </Link>

        <section className="grid gap-12 pb-20 pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pt-24">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#b22222]">
              Booking inquiries
            </p>

            <h1 className="max-w-lg font-display text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              LET&apos;S MAKE
              <br />
              SOMETHING
              <br />
              HAPPEN.
            </h1>

            <p className="mt-8 max-w-md text-base leading-7 text-black/65">
              Interested in having Red Door play your event? Send us the
              details below and our booking team will be in touch.
            </p>

            <div className="mt-12 border-t border-black/15 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">
                Booking handled by
              </p>
              <p className="mt-2 text-xl font-bold">Beatline Production</p>
            </div>
          </div>

          <div className="border-t border-black/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <BookingForm />
          </div>
        </section>
      </div>
    </main>
  )
}

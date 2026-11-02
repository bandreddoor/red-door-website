
import Link from 'next/link'

export default function MerchPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-20 text-ink">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between border-b border-ink/20 pb-6">
          <p className="eyebrow text-red">Red Door — Official Store</p>

          <Link
            href="/"
            className="eyebrow text-ink/60 transition-colors hover:text-red"
          >
            Back to Home ↗
          </Link>
        </div>

        <section className="py-28 text-center md:py-40">
          <p className="eyebrow mb-6 text-red">
            The official Red Door collection
          </p>

          <h1 className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-9xl">
            Coming
            <br />
            Soon.
          </h1>

          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
            We're working on something good. Official Red Door merchandise
            is on the way.
          </p>

          <Link
            href="/"
            className="btn mt-10 inline-flex"
          >
            Back to Red Door
          </Link>
        </section>

        <div className="border-t border-ink/20 pt-5">
          <p className="eyebrow text-center text-ink/40">
            Red Door · Starkville, Mississippi
          </p>
        </div>
      </div>
    </main>
  )
}

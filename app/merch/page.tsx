
import Image from 'next/image'
import Link from 'next/link'

function ExternalArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M5 15 15 5" />
      <path d="M6 5h9v9" />
    </svg>
  )
}

export default function MerchPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-cream text-ink">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link href="/" aria-label="Back to Red Door home">
          <Image
            src="/assets/logos/logo-primary-red.png"
            alt="Red Door"
            width={140}
            height={140}
            priority
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
        </Link>

        <Link
          href="/"
          className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-red"
        >
          Back to Home <ExternalArrow />
        </Link>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center md:px-10">
        <p className="eyebrow mb-6 text-red">
          Red Door — Official Merchandise
        </p>

        <Image
          src="/assets/logos/logo-sticker.png"
          alt="Red Door"
          width={220}
          height={220}
          className="mb-10 h-36 w-36 object-contain md:h-48 md:w-48"
          priority
        />

        <h1 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-8xl lg:text-9xl">
          Coming
          <br />
          Soon<span className="text-red">.</span>
        </h1>

        <p className="mt-7 max-w-sm text-sm leading-6 text-ink/60 md:text-base">
          We’re working on something. The first Red Door collection is on its
          way.
        </p>

        <Link
          href="/"
          className="eyebrow mt-10 border-b border-ink/30 pb-1 transition-colors hover:border-red hover:text-red"
        >
          Return to Red Door
        </Link>
      </section>

      <footer className="border-t border-ink/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-8 text-center md:px-10">
          <p className="eyebrow text-ink/45">
            Starkville, Mississippi
          </p>

          <div className="mt-4 flex gap-8">
            <a
              href="https://www.instagram.com/reddoorband/"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-red"
            >
              Instagram <ExternalArrow />
            </a>

            <a
              href="https://www.tiktok.com/@reddoorband"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-red"
            >
              TikTok <ExternalArrow />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

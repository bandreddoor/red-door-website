
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fcf1e5] px-6 text-center text-black">
      <div className="flex w-full max-w-xl flex-col items-center">
        <Image
          src="/assets/logos/logo-primary-red.png"
          alt="Red Door"
          width={220}
          height={220}
          priority
          className="mb-12 h-auto w-40 md:w-48"
        />

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#b22222]">
          Red Door
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Something’s coming.
        </h1>

        <p className="mt-6 max-w-md text-base leading-7 text-black/65 md:text-lg">
          We’re putting the finishing touches on our new website.
          Check back soon.
        </p>

        <div className="mt-10 flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.15em]">
          <a
            href="https://www.instagram.com/reddoorband/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#b22222]"
          >
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@reddoorband"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#b22222]"
          >
            TikTok
          </a>
        </div>

        <p className="mt-20 text-[10px] uppercase tracking-[0.3em] text-black/35">
          Starkville, Mississippi
        </p>
      </div>
    </main>
  )
}

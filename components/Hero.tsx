
import Image from 'next/image'
import { site } from '@/content/site'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden"
    >
      {/* Full-screen band photograph */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center md:bg-cover"
        style={{
          backgroundImage: "url('/images/band-photo.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {/* Centered Red Door logo */}
      <div className="absolute left-1/2 top-[5%] z-10 -translate-x-1/2 md:top-[0%]">
        <Image
          src="/assets/logos/logo-sticker.png"
          alt="Red Door"
          width={280}
          height={280}
          className="logo-reveal h-auto w-[75vw] max-w-[420px] object-contain md:w-[34vw] md:max-w-[500px]"
          priority
        />
      </div>

      {/* Tagline */}
      <div className="relative z-10 mb-16 px-6 text-center">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-white">
          {site.tagline}
        </p>
      </div>

      {/* Scroll cue */}
      <a
        href="#shows"
        aria-label="Scroll to shows"
        className="relative z-10 mb-8 flex flex-col items-center gap-2 text-white/90 transition-opacity hover:opacity-60"
      >
        <span className="text-xs tracking-[0.2em] uppercase">
          Explore
        </span>
        <span className="h-8 w-px bg-white/80" />
      </a>
    </section>
  )
}


import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate h-screen min-h-screen w-full shrink-0 overflow-hidden"
      style={{
        height: '100dvh',
        minHeight: '100dvh',
      }}
    >
      {/* Desktop background video */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/videos/RDHoriz.mp4" type="video/mp4" />
      </video>

      {/* Mobile background video */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      >
        <source src="/videos/RDVert.mp4" type="video/mp4" />
      </video>

      {/* Subtle bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Bottom branding row */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-6 pb-8 md:px-14 md:pb-10 lg:px-16">
        {/* Location */}
        <p className="translate-y-3 text-sm font-black tracking-[0.22em] uppercase text-white md:translate-y-8 md:text-xl md:font-extrabold md:tracking-[0.24em] lg:text-2xl">
          STARKVILLE, MS
        </p>

        {/* Sticker logo */}
        <a
          href="#home"
          aria-label="Red Door, back to top"
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src="/assets/logos/logo-sticker.png"
            alt="Red Door"
            width={300}
            height={300}
            priority
            className="h-auto w-36 object-contain md:w-48 lg:w-52"
          />
        </a>
      </div>
    </section>
  )
}


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
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/band-photo.jpg')",
          backgroundSize: '110%',
          backgroundPosition: '65% 45%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

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

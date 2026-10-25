
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'

const originalPhotos = Array.from({ length: 15 }, (_, index) => ({
  src: `/images/live/livephoto${index + 1}.jpg`,
  alt: `Red Door live performance photograph ${index + 1}`,
}))

const photoStyles = [
  { size: 'h-[260px] w-[190px] md:h-[310px] md:w-[230px]', offset: '-25px', rotation: '-2deg' },
  { size: 'h-[210px] w-[240px] md:h-[250px] md:w-[290px]', offset: '35px', rotation: '1.5deg' },
  { size: 'h-[280px] w-[180px] md:h-[340px] md:w-[220px]', offset: '-15px', rotation: '2deg' },
  { size: 'h-[200px] w-[250px] md:h-[230px] md:w-[300px]', offset: '45px', rotation: '-1.5deg' },
  { size: 'h-[250px] w-[200px] md:h-[300px] md:w-[240px]', offset: '-35px', rotation: '1deg' },
  { size: 'h-[220px] w-[230px] md:h-[260px] md:w-[280px]', offset: '25px', rotation: '-2deg' },
]

export default function LiveGallery() {
  const [photos, setPhotos] = useState(originalPhotos)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  useEffect(() => {
    const shuffled = [...originalPhotos]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setPhotos(shuffled)
  }, [])

  useEffect(() => {
    if (selectedPhoto === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null)
      if (event.key === 'ArrowRight') {
        setSelectedPhoto((current) =>
          current === null ? null : (current + 1) % photos.length
        )
      }
      if (event.key === 'ArrowLeft') {
        setSelectedPhoto((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto, photos.length])

  const nextPhoto = () => {
    setActiveIndex((current) => (current + 1) % photos.length)
  }

  const previousPhoto = () => {
    setActiveIndex(
      (current) => (current - 1 + photos.length) % photos.length
    )
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return

    const difference = touchStart - e.changedTouches[0].clientX

    if (difference > 50) nextPhoto()
    if (difference < -50) previousPhoto()

    setTouchStart(null)
  }

  return (
    <>
      <Section id="live" title="Live" className="pb-10 md:pb-14">
        <Reveal>
          {/* Mobile slideshow */}
          <div className="md:hidden">
            <div
              className="relative aspect-[4/5] max-h-[65svh] overflow-hidden bg-ink/5"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setSelectedPhoto(index)}
                  aria-label={`Enlarge photograph ${index + 1}`}
                  className={`absolute inset-0 block h-full w-full transition-opacity duration-700 ${
                    index === activeIndex
                      ? 'opacity-100'
                      : 'pointer-events-none opacity-0'
                  }`}
                  aria-hidden={index !== activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="eyebrow shrink-0 tabular-nums text-ink/50">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(photos.length).padStart(2, '0')}
              </p>

              <div className="ml-auto flex shrink-0 items-center gap-3">
                <button
                  onClick={previousPhoto}
                  aria-label="Previous photograph"
                  className="flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors hover:border-red hover:text-red"
                >
                  <span className="text-xl" aria-hidden="true">←</span>
                </button>

                <button
                  onClick={nextPhoto}
                  aria-label="Next photograph"
                  className="flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors hover:border-red hover:text-red"
                >
                  <span className="text-xl" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop scrolling collage */}
          <div className="live-collage relative hidden h-[360px] overflow-hidden md:block lg:h-[410px]">
            <div className="live-collage-track flex h-full w-max">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex h-full shrink-0 items-center gap-5 pr-5"
                  aria-hidden={copy === 1}
                >
                  {photos.map((photo, index) => {
                    const style = photoStyles[index % photoStyles.length]

                    return (
                      <button
                        type="button"
                        key={`${copy}-${photo.src}`}
                        onClick={() => setSelectedPhoto(index)}
                        aria-label={`Enlarge photograph ${index + 1}`}
                        tabIndex={copy === 0 ? 0 : -1}
                        className={`live-photo-reveal relative block shrink-0 cursor-zoom-in overflow-hidden bg-transparent shadow-none ${style.size}`}
                        style={{
                          marginTop: style.offset,
                          transform: `rotate(${style.rotation})`,
                          animationDelay: `${(index % photos.length) * 90}ms`,
                        }}
                      >
                        <Image
                          src={photo.src}
                          alt={copy === 0 ? photo.alt : ''}
                          fill
                          sizes="300px"
                          className="object-contain"
                        />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* View all photos */}
          <div className="mt-8 flex justify-center md:mt-10">
            <Link
              href="/live"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:text-red"
            >
              View all photos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* Full-screen photo viewer */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length)
            }}
            aria-label="Previous photograph"
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center text-white/80 transition-colors hover:text-white md:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative h-full w-full max-w-[1400px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedPhoto((selectedPhoto + 1) % photos.length)
            }}
            aria-label="Next photograph"
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center text-white/80 transition-colors hover:text-white md:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.2em] text-white/60">
            {String(selectedPhoto + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>
        </div>
      )}

      <style jsx global>{`
        .live-collage {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }

        .live-collage-track {
          animation: liveCollageMove 75s linear infinite;
          will-change: transform;
        }

        .live-photo-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: livePhotoReveal 1s ease-out forwards;
        }

        @keyframes livePhotoReveal {
          from {
            opacity: 0;
            filter: blur(8px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes liveCollageMove {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .live-collage-track {
            animation: none;
          }

          .live-photo-reveal {
            animation: none;
            opacity: 1;
            filter: none;
          }
        }
      `}</style>
    </>
  )
}

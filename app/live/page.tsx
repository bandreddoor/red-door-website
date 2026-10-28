
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const photos = Array.from({ length: 15 }, (_, index) => ({
  src: `/images/live/livephoto${index + 1}.jpg`,
  alt: `Red Door live performance photograph ${index + 1}`,
}))

export default function LivePhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

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
  }, [selectedPhoto])

  return (
    <main className="min-h-screen bg-cream px-5 py-10 md:px-10 md:py-14">
      <style>{`
        @keyframes photoEnter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes viewerEnter {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes backdropEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .photo-enter {
          animation: photoEnter 650ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .viewer-enter {
          animation: viewerEnter 300ms ease-out both;
        }

        .backdrop-enter {
          animation: backdropEnter 250ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .photo-enter,
          .viewer-enter,
          .backdrop-enter {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:text-red"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <span className="eyebrow text-ink/50">Red Door</span>
        </div>

        <div className="mb-12 md:mb-16">
          <h1 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-8xl lg:text-9xl">
            Live Photos
          </h1>
          <p className="eyebrow mt-6 text-ink/50">
            Red Door — On stage and everywhere in between
          </p>
        </div>

        <div className="columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedPhoto(index)}
              aria-label={`Enlarge photograph ${index + 1}`}
              className="photo-enter mb-4 block w-full break-inside-avoid cursor-zoom-in overflow-hidden text-left md:mb-6"
              style={{ animationDelay: `${Math.min(index * 65, 700)}ms` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="block h-auto w-full transition-transform duration-500 ease-out hover:scale-[1.035]"
                priority={index < 4}
              />
            </button>
          ))}
        </div>

        <div className="mt-16 border-t border-ink/15 pt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:text-red"
          >
            Back to Red Door
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
      </div>

      {selectedPhoto !== null && (
        <div
          className="backdrop-enter fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:rotate-90 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
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
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center text-white/80 transition-all hover:-translate-x-1 hover:text-white md:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            key={selectedPhoto}
            className="viewer-enter relative h-full w-full max-w-[1400px]"
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
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center text-white/80 transition-all hover:translate-x-1 hover:text-white md:right-6"
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
    </main>
  )
}


'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { nav } from '@/content/site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const navigation = (nav ?? []).filter(
    (item): item is NonNullable<typeof item> => item != null
  )

  useEffect(() => {
    const hero = document.getElementById('home')

    if (!hero) {
      setHasScrolled(window.scrollY > 0)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolled(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', esc)

    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    setVisible(false)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-500 ease-out ${
          hasScrolled
            ? 'border-ink/10 bg-cream/90 text-ink'
            : 'border-white/15 bg-black/20 text-cream'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10"
        >
          {/* RD stamp logo */}
          <a
            href="#home"
            aria-label="Red Door, back to top"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/assets/logos/RDMainSticker.png"
              alt="Red Door"
              width={1080}
              height={1350}
              priority
              className="h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex gap-9">
              {navigation.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`eyebrow transition-colors duration-300 ${
                      hasScrolled
                        ? 'hover:text-red'
                        : 'text-cream hover:text-cream/65'
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              className={`eyebrow py-3 transition-colors duration-300 ${
                hasScrolled
                  ? 'text-ink hover:text-red'
                  : 'text-cream hover:text-cream/65'
              }`}
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen(!open)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-cream px-5 pb-8 pt-28 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          visible ? 'translate-x-0' : 'translate-x-full'
        } ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <ul>
          {navigation.map((n, index) => (
            <li
              key={n.href}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: visible ? `${index * 100 + 150}ms` : '0ms',
              }}
            >
              <a
                href={n.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block py-1 font-display text-6xl font-black uppercase leading-none tracking-tighter transition-colors hover:text-red"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom branding */}
        <div
          className="mt-auto flex flex-col items-center text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: visible ? '550ms' : '0ms',
          }}
        >
          <Image
            src="/assets/logos/logo-sticker.png"
            alt="Red Door"
            width={280}
            height={280}
            className="h-auto w-32 object-contain"
          />

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-red">
            STARKVILLE, MS
          </p>

          <div className="mt-6 flex items-center gap-8">
            <a
              href="https://www.instagram.com/reddoorband/"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-red"
            >
              Instagram
            </a>

            <a
              href="https://www.tiktok.com/@reddoorband"
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-red"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

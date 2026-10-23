
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { nav, logos } from '@/content/site'

export default function Nav() {
  const [open, setOpen] = useState(false)

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10"
        >
          {/* Red Door logo - always visible */}
          <a
            href="#home"
            aria-label="Red Door, back to top"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/assets/logos/logo-primary-red.png"
              alt="Red Door"
              width={72}
              height={72}
              priority
              className="h-14 w-14 object-contain"
            />
          </a>

          {/* Desktop navigation */}
          <ul className="hidden gap-9 md:flex">
            {(nav ?? []).map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="eyebrow transition-colors hover:text-red"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="eyebrow py-3 md:hidden"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          id="menu"
          className="fixed inset-0 z-40 bg-cream px-5 pt-28 md:hidden"
        >
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 font-display text-6xl font-black uppercase leading-none tracking-tighter hover:text-red"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

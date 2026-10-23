import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'
import { site, social, about } from '@/content/site'
import { Analytics } from '@vercel/analytics/next'

const display = Archivo({ subsets: ['latin'], weight: ['800', '900'], variable: '--font-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title, description: site.description, url: '/', siteName: site.name, type: 'website', locale: 'en_US',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Red Door' }],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/og-image.jpg'] },
}
export const viewport: Viewport = { themeColor: '#fcf1e5' }

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'MusicGroup', name: site.name, url: site.url,
  genre: ['Indie rock', 'Alternative rock'], sameAs: Object.values(social).filter(Boolean),
  member: about.members.map((m) => ({ '@type': 'Person', name: m.name })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
        {children}
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}


import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'
import { site, social, about } from '@/content/site'
import { CartProvider } from '@/components/CartProvider'

const display = Archivo({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Official Website`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL('https://reddoorband.com'),
  openGraph: {
    title: `${site.name} | Official Website`,
    description: site.description,
    url: 'https://reddoorband.com',
    siteName: site.name,
    images: [
      {
        url: '/images/band-photo.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} band photo`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Official Website`,
    description: site.description,
    images: ['/images/band-photo.jpg'],
  },
  icons: {
    icon: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fcf1e5',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: site.name,
  description: site.description,
  url: 'https://reddoorband.com',
  image: 'https://reddoorband.com/images/band-photo.jpg',
  genre: ['Rock', 'Indie Rock'],
  sameAs: [social.instagram, social.tiktok],
  member: about.members.map((member) => ({
    '@type': 'Person',
    name: member.name,
  })),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>

        <CartProvider>{children}</CartProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}

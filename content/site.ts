/**
 * RED DOOR — central content file. Edit here; no component changes needed.
 * Empty string ('') = "not supplied yet": the UI shows a "coming soon" state and never links anywhere.
 */
export const site = {
  name: 'Red Door',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000', // set to the real domain on Vercel
  title: 'Red Door | Official Website',
  description:
    'Official website of Red Door, an indie and alternative rock band from Mississippi. Music, tour dates, merch, and booking.',
  tagline: 'Indie / Alternative Rock — Mississippi',
}

export const nav = [
  { label: 'Home', href: '#home' }, , { label: 'Shows', href: '#shows' },
  , { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' },
]

/** Swap a variation site-wide by changing one path here. All originals are also in /assets-source. */
export const logos = {
  primary: '/assets/logos/logo-sticker.png', // red, transparent — cream backgrounds
  sticker: '/assets/logos/logo-sticker.png', // red with cream outline — dark / photo backgrounds
  black: '/assets/logos/logo-black.png',
  cream: '/assets/logos/logo-cream.png', // dark / red backgrounds
}

export const social = { instagram: 'https://www.instagram.com/reddoorband/', tiktok: 'https://www.tiktok.com/@reddoorband' }

export const music = {
  featured: {
    title: '', // e.g. 'Song Title'. Empty = "coming soon"
    artwork: '', // e.g. '/assets/music/cover.jpg'
    // Spotify → Share → Embed → copy the src, e.g. 'https://open.spotify.com/embed/track/XXXX'
    spotifyEmbedUrl: '',
  },
  links: { spotify: '', appleMusic: '', youtube: '' },
}

export type Show = {
  date: string // YYYY-MM-DD
  city: string; state: string; venue: string
  ticketUrl: string; soldOut?: boolean
  placeholder?: boolean // true = sample row, tagged "Sample" on the page, never auto-hidden
}
// Real shows hide themselves automatically once the date has passed.
export const shows: Show[] = [
  { date: '2027-01-16', city: 'Aubrun', state: 'AL', venue: 'Auburn Delta Chi', ticketUrl: '', placeholder: false
   },
]

export type Product = {
  name: string; category: string; price: string; sizes: string[]
  description: string; image: string
  url: string // checkout/product URL from Shopify, Printful, Printify, etc. Empty = "Coming Soon"
  placeholder?: boolean
}
const ph = (name: string, category: string): Product => ({
  name, category, price: '', sizes: [], image: '', url: '', placeholder: true,
  description: 'Placeholder product. Details coming soon.',
})
export const merch = {
  note: 'Official merch is on the way. Products below are placeholders.',
  products: [
    ph('T-Shirt', 'T-Shirts'), ph('Hoodie', 'Hoodies'), ph('Hat', 'Hats'),
    ph('Beanie', 'Beanies'), ph('Stickers', 'Stickers'), ph('Accessory', 'Accessories'),
  ],
}

export const about = {
  // DRAFT built only from facts in the brief. Replace with a band-approved bio.
  bio: [
    'Red Door is an indie rock band based in Mississippi, blending alternative rock influences with a set built around guitar driven songs and energetic live performances.',
    'The band plays venues, college events, and private shows throughout the Southeast, bringing a mix of original music and familiar favorites to every stage.',
  ],
  photo: '/images/band-about.JPG',
  members: [
    { name: 'Michael', role: 'Lead Vocals & Guitar' }, { name: 'Patrick', role: 'Guitar' },
    { name: 'Nick', role: 'Bass' }, { name: 'Keygan', role: 'Drums' },
  ],
}

export const contact = {
  booking: 'HUNTER@BEATLINEPD.COM', general: 'BANDREDDOOR@GMAIL.COM', management: '', // management row only appears when filled in
  bookingSubject: 'Booking Inquiry — Red Door',
}

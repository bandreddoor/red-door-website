
/**
 * RED DOOR — central content file.
 * Edit here; no component changes needed.
 * Empty string ('') = "not supplied yet".
 */

export const site = {
  name: 'Red Door',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  title: 'Red Door | Official Website',
  description:
    'Official website of Red Door, an indie and alternative rock band from Mississippi. Music, tour dates, merch, and booking.',
  tagline: 'Indie Rock — Mississippi',
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Shows', href: '#shows' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const logos = {
  primary: '/assets/logos/logo-sticker.png',
  sticker: '/assets/logos/logo-sticker.png',
  black: '/assets/logos/logo-black.png',
  cream: '/assets/logos/logo-cream.png',
}

export const social = {
  instagram: 'https://www.instagram.com/reddoorband/',
  tiktok: 'https://www.tiktok.com/@reddoorband',
}

export const music = {
  featured: {
    title: '',
    artwork: '',
    spotifyEmbedUrl: '',
  },
  links: {
    spotify: '',
    appleMusic: '',
    youtube: '',
  },
}

export type Show = {
  date: string
  city: string
  state: string
  venue: string
  ticketUrl: string
  eventType: 'public' | 'private'
  soldOut?: boolean
  placeholder?: boolean
}

export const shows: Show[] = [
  {
    date: '2027-01-16',
    city: 'Auburn',
    state: 'AL',
    venue: 'Auburn Delta Chi',
    ticketUrl: '',
    eventType: 'private',
    placeholder: false,
  },
  
]

export type Product = {
  name: string
  category: string
  price: string
  sizes: string[]
  description: string
  image: string
  url: string
  placeholder?: boolean
}

const ph = (name: string, category: string): Product => ({
  name,
  category,
  price: '',
  sizes: [],
  image: '',
  url: '',
  placeholder: true,
  description: 'Placeholder product. Details coming soon.',
})

export const merch = {
  note: 'Official merch is on the way. Products below are placeholders.',
  products: [
    ph('T-Shirt', 'T-Shirts'),
    ph('Hoodie', 'Hoodies'),
    ph('Hat', 'Hats'),
    ph('Beanie', 'Beanies'),
    ph('Stickers', 'Stickers'),
    ph('Accessory', 'Accessories'),
  ],
}

export const about = {
  bio: [
    'Red Door is an indie rock band based in Mississippi, blending alternative rock influences with a set built around guitar driven songs and energetic live performances.',
    'The band plays venues, college events, and private shows throughout the Southeast, bringing a mix of original music and familiar favorites to every stage.',
  ],
  photo: '/images/band-about.JPG',
  members: [
    { name: 'Michael', role: 'Lead Vocals & Guitar' },
    { name: 'Patrick', role: 'Guitar' },
    { name: 'Nick', role: 'Bass' },
    { name: 'Keygan', role: 'Drums' },
  ],
}

export const contact = {
  booking: 'HUNTER@BEATLINEPD.COM',
  general: 'BANDREDDOOR@GMAIL.COM',
  management: '',
  bookingSubject: 'Booking Inquiry — Red Door',
}

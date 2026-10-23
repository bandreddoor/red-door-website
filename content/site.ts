
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
    'Official website of Red Door, a four-piece rock band from Starkville, Mississippi.',
  tagline: 'Starkville, Mississippi',
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

export const shows: Show[] = []

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

export const merch = {
  note: 'Official Red Door merchandise.',
  href: '/merch',
  products: [
    {
      name: 'Red Door Hoodie',
      category: 'Hoodies',
      price: '',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Black hoodie with cream Red Door logo detailing.',
      image: '/images/merch/red-door-hoodie-front.png',
      url: '/merch',
      placeholder: false,
    },
    {
      name: 'Red Door T-Shirt',
      category: 'T-Shirts',
      price: '',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Official Red Door T-Shirt.',
      image: '',
      url: '/merch',
      placeholder: true,
    },
    {
      name: 'Red Door Crewneck',
      category: 'Crewnecks',
      price: '',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Official Red Door Crewneck.',
      image: '',
      url: '/merch',
      placeholder: true,
    },
    {
      name: 'Red Door Sticker Pack',
      category: 'Stickers',
      price: '',
      sizes: [],
      description: 'Official Red Door stickers.',
      image: '',
      url: '/merch',
      placeholder: true,
    },
  ] satisfies Product[],
}

export const about = {
  bio: [
    'Red Door is a four piece rock band from Starkville, Mississippi, made up of Michael, Patrick, Nick, and Keygan. Their set draws from the rock music they grew up listening to, built around guitar driven songs and familiar favorites.',
    'The band performs at venues, college events, and private shows throughout the Southeast.',
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

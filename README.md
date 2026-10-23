# Red Door — Official Website

Next.js (App Router) + TypeScript + Tailwind CSS. Single-page scroll site. Status: source written, **not yet run or tested** (see bottom).

## Run locally
    npm install
    npm run dev        # http://localhost:3000
    npm run typecheck && npm run build

## Where things live
- `content/site.ts` — ALL editable content: socials, music links, shows, merch, bio, members, contact, logo paths.
  An empty string means "not supplied yet"; the UI shows a coming-soon state and never links anywhere.
- `components/` — one file per section (Hero, Music, Shows, Merch, About, Contact, Footer) plus Nav, Section, Reveal, ExtLink.
- `app/layout.tsx` — metadata, Open Graph/Twitter, fonts (Archivo + Inter), JSON-LD. `app/icon.png` / `apple-icon.png` = favicon (cropped from the official red logo, unaltered artwork).
- `public/assets/logos/` — descriptive copies of the logos. `assets-source/` — your original files, untouched.
- `public/og-image.jpg` — 1200x630 crop of your sticker poster graphic.

## Logo map
| Original | Copy | Use |
|---|---|---|
| RDRed.png | logo-primary-red.png | Hero, nav, favicon (cream backgrounds) |
| RDMain.png | logo-sticker.png | Dark / photographic backgrounds (not used yet) |
| RDBlack.png | logo-black.png | One-colour uses (not used yet) |
| RDCream.png | logo-cream.png | Footer (black background) |
| RDBackground.png | art/art-sticker-poster-1920x1080.png | Source for OG image |
| Red_Door_LED___Indie_Film_Grain(_1).png | assets-source only | 5435x3057 texture, 13.7 MB — compress before using on the web |

## Updating
- **Shows:** add/remove objects in `shows`. Real shows hide after their date. Delete the `placeholder: true` rows.
- **Music:** fill `music.featured` and `music.links`. Spotify: Share → Embed → copy the `src` URL.
- **Merch:** replace placeholder products; put the Shopify/Printful/Printify product URL in `url` to turn "Coming Soon" into "Shop Now". No checkout is built.
- **Photos:** drop files in `public/assets/band/` etc. and set the path in `content/site.ts`.

## Deploy (GitHub + Vercel)
1. `git init && git add . && git commit -m "Red Door site"`; push to a new GitHub repo.
2. vercel.com → Add New Project → import the repo → Deploy (defaults work).
3. Buy a domain yourself, then Vercel → Project → Settings → Domains → Add, and set the DNS records Vercel shows.
4. Set env var `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` so share links/metadata use the real domain.
Domain ideas (availability NOT checked): reddoormusic.com, reddoorband.com, reddoorms.com, listentoreddoor.com, reddoorofficial.com.

## Needs from you
Streaming/social URLs, booking + general emails (and management only if it exists), real show details, band photos, merch products and a storefront choice, approved bio. A booking *form* needs a service (e.g. Formspree); the button currently opens a pre-addressed email.

## Not yet verified
Not installed, built, viewed in a browser, or link-checked; no Lighthouse/accessibility run. Do those first (`npm run typecheck`, `npm run build`, then check 375/768/1440px widths).


import Image from 'next/image'
import Link from 'next/link'
import { merch } from '@/content/site'

// Change this to true when you're ready to bring merch back.
const SHOW_MERCH = false

const productTilts = [-9, 7, -6, 10, -8, 6]

function ExternalArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M5 15 15 5" />
      <path d="M6 5h9v9" />
    </svg>
  )
}

const productBackImages: Record<string, string> = {
  'Red Door Hoodie': '/images/merch/red-door-hoodie-back.png',
  'Red Door Crewneck': '/images/merch/red-door-crew-back.png',
}

export default function Merch() {
  if (!SHOW_MERCH) return null

  const products = merch.products
  const repeatedProducts = Array.from({ length: 4 }, () => products).flat()

  return (
    <section
      id="merch"
      className="overflow-hidden border-y border-ink/20 bg-cream py-12 md:py-10"
    >
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 md:grid-cols-[0.7fr_2.3fr] md:items-center md:gap-10 md:px-10">
        <Link href="/merch" className="group block">
          <p className="eyebrow mb-3 text-red">
            Official Red Door Store
          </p>

          <h2 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tight md:text-8xl lg:text-9xl">
            Merch
          </h2>

          <p className="eyebrow mt-5 inline-flex items-center gap-1.5 text-ink/50 transition-colors group-hover:text-red">
            Explore the collection <ExternalArrow />
          </p>
        </Link>

        <div className="merch-marquee min-w-0">
          <div
            className="merch-marquee-track"
            style={{ animationDuration: '23s' }}
          >
            {repeatedProducts.map((p, index) => {
              const productIndex = index % Math.max(products.length, 1)
              const tilt = productTilts[index % productTilts.length]
              const revealDelay = Math.min(productIndex * 65, 700)
              const backImage = productBackImages[p.name]

              return (
                <Link
                  href={p.url}
                  key={`${p.name}-${index}`}
                  className="merch-product-reveal group w-[270px] shrink-0 text-center md:w-[360px] lg:w-[390px]"
                  style={{
                    '--product-tilt': `${tilt}deg`,
                    animationDelay: `${revealDelay}ms`,
                  } as React.CSSProperties}
                  aria-hidden={index >= products.length}
                  tabIndex={index >= products.length ? -1 : 0}
                >
                  <div className="relative aspect-[4/5] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(var(--product-tilt))] group-hover:!rotate-0 group-hover:scale-[1.08]">
                    {p.image ? (
                      <>
                        <Image
                          src={p.image}
                          alt={`${p.name} front`}
                          fill
                          sizes="390px"
                          className={`object-contain transition-opacity duration-500 ${
                            backImage
                              ? 'opacity-100 group-hover:opacity-0'
                              : 'transition-transform duration-700 group-hover:scale-[1.04]'
                          }`}
                        />

                        {backImage && (
                          <Image
                            src={backImage}
                            alt={`${p.name} back`}
                            fill
                            sizes="390px"
                            className="object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-display text-3xl font-black uppercase tracking-tight text-ink/20 transition-colors group-hover:text-red/60">
                          {p.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="mt-3 text-center font-display text-lg font-extrabold uppercase tracking-tight">
                    {p.name}
                  </h3>

                  <p className="eyebrow mt-1 text-center text-ink/50">
                    {p.placeholder ? 'Coming Soon' : p.price || 'Coming Soon'}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

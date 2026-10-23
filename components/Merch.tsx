
import Image from 'next/image'
import Link from 'next/link'
import { merch } from '@/content/site'

export default function Merch() {
  const products = merch.products

  return (
    <section
      id="merch"
      className="overflow-hidden border-y border-ink/20 bg-cream py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.8fr_2fr] md:items-center md:px-10">
        <Link href="/merch" className="group block">
          <p className="eyebrow mb-4 text-red">Official Red Door Store</p>
          <h2 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tight md:text-8xl lg:text-9xl">
            Merch
          </h2>
          <p className="eyebrow mt-6 text-ink/50 transition-colors group-hover:text-red">
            Explore the collection ↗
          </p>
        </Link>

        <div className="merch-marquee min-w-0">
          <div className="merch-marquee-track">
            {[...products, ...products].map((p, index) => (
              <Link
                href="/merch"
                key={`${p.name}-${index}`}
                className="group w-[230px] shrink-0 [perspective:1000px] md:w-[270px]"
                aria-hidden={index >= products.length}
                tabIndex={index >= products.length ? -1 : 0}
              >
                <div className="relative aspect-[4/5] overflow-hidden transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-[1.04]">
                  {p.image ? (
                    <>
                      <Image
                        src={p.image}
                        alt={`${p.name} front`}
                        fill
                        sizes="270px"
                        className={`object-contain transition-opacity duration-500 ${
                          p.name === 'Red Door Hoodie'
                            ? 'opacity-100 group-hover:opacity-0'
                            : 'transition-transform duration-700 group-hover:scale-[1.04]'
                        }`}
                      />

                      {p.name === 'Red Door Hoodie' && (
                        <Image
                          src="/images/merch/red-door-hoodie-back.png"
                          alt={`${p.name} back`}
                          fill
                          sizes="270px"
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

                <h3 className="mt-3 font-display text-lg font-extrabold uppercase tracking-tight">
                  {p.name}
                </h3>
                <p className="eyebrow mt-1 text-ink/50">
                  {p.placeholder ? 'Coming Soon' : p.price || 'Coming Soon'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

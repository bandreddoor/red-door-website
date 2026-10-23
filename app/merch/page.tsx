
import Image from 'next/image'
import Link from 'next/link'
import { merch } from '@/content/site'

export default function MerchPage() {
  const products = merch.products

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-20">
        <div className="mb-12 flex items-end justify-between border-b border-ink/20 pb-6">
          <div>
            <p className="eyebrow mb-3 text-red">Red Door — Official Store</p>
            <h1 className="font-display text-6xl font-black uppercase tracking-tight md:text-8xl">
              Merch
            </h1>
          </div>

          <Link
            href="/"
            className="eyebrow mb-2 text-ink/60 transition-colors hover:text-red"
          >
            Back to Home ↗
          </Link>
        </div>

        <p className="mb-12 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
          Official Red Door merchandise. The first collection is coming soon.
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
          {products.map((product) => (
            <div key={product.name}>
              <div className="group relative aspect-[4/5] overflow-hidden transition-transform duration-500 ease-out hover:-rotate-2 hover:scale-[1.04]">
                {product.image ? (
                  <>
                    <Image
                      src={product.image}
                      alt={`${product.name} front`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className={`object-contain transition-opacity duration-500 ${
                        product.name === 'Red Door Hoodie'
                          ? 'opacity-100 group-hover:opacity-0'
                          : ''
                      }`}
                    />

                    {product.name === 'Red Door Hoodie' && (
                      <Image
                        src="/images/merch/red-door-hoodie-back.png"
                        alt={`${product.name} back`}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="font-display text-2xl font-black uppercase tracking-tight text-ink/30">
                      Red Door
                    </span>
                    <span className="eyebrow text-ink/40">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">
                {product.name}
              </h2>

              <p className="eyebrow mt-1 text-ink/50">
                Coming Soon
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

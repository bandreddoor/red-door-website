
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { merch } from '@/content/site'

const sizeChart = [
  { size: 'S', length: '26.38', shoulder: '23.03', chest: '23.23', sleeve: '21.65' },
  { size: 'M', length: '27.17', shoulder: '23.82', chest: '24.02', sleeve: '22.24' },
  { size: 'L', length: '27.95', shoulder: '24.61', chest: '24.80', sleeve: '22.83' },
  { size: 'XL', length: '28.74', shoulder: '25.39', chest: '25.59', sleeve: '23.43' },
  { size: '2XL', length: '29.53', shoulder: '26.18', chest: '26.77', sleeve: '24.02' },
  { size: '3XL', length: '30.31', shoulder: '26.97', chest: '27.17', sleeve: '24.61' },
]

export default function HoodiePage() {
  const product = merch.products.find(
    (item) => item.name === 'Red Door Hoodie'
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  if (!product) {
    return <main className="min-h-screen bg-cream p-10">Product not found.</main>
  }

  const images = [
    { src: product.image, label: 'Front', alt: 'Red Door Hoodie front' },
    {
      src: '/images/merch/red-door-hoodie-back.png',
      label: 'Back',
      alt: 'Red Door Hoodie back',
    },
  ]

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">
        <div className="mb-8 flex items-center justify-between border-b border-ink/20 pb-5">
          <Link href="/merch" className="eyebrow text-ink/60 hover:text-red">
            ← Back to Merch
          </Link>
          <Link href="/" className="eyebrow text-ink/60 hover:text-red">
            Red Door
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="relative aspect-[4/5]">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <button
                  key={image.label}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[4/5] border ${
                    selectedImage === index ? 'border-red' : 'border-ink/20'
                  }`}
                  aria-label={`View hoodie ${image.label.toLowerCase()}`}
                  aria-pressed={selectedImage === index}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="25vw"
                    className="object-contain"
                  />
                  <span className="absolute bottom-2 left-2 bg-cream/90 px-2 py-1 text-xs uppercase tracking-wider">
                    {image.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 md:pt-8">
            <p className="eyebrow mb-4 text-red">Official Red Door Merch</p>

            <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
              Red Door
              <br />
              Hoodie
            </h1>

            <p className="mt-5 text-lg text-ink/60">
              {product.price || 'Price coming soon'}
            </p>

            <div className="my-8 border-t border-ink/20" />

            <p className="max-w-lg text-sm leading-relaxed text-ink/70 md:text-base">
              {product.description}
            </p>

            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <label className="eyebrow">Select Size</label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs font-semibold underline underline-offset-4 hover:text-red"
                  aria-expanded={showSizeGuide}
                >
                  {showSizeGuide ? 'Close Size Guide' : 'Size Guide'}
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-sm font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-red bg-red text-cream'
                        : 'border-ink/20 hover:border-ink'
                    }`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {showSizeGuide && (
                <div className="mt-6 border border-ink/20 p-4 md:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-black uppercase">
                      Size Guide
                    </h2>
                    <span className="eyebrow text-ink/50">Inches</span>
                  </div>

                  <p className="mb-4 text-xs leading-relaxed text-ink/60">
                    Measurements are garment measurements. Allow for
                    approximately 1–3 cm variation.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-y border-ink/20">
                          <th className="px-2 py-3">Size</th>
                          <th className="px-2 py-3">Length</th>
                          <th className="px-2 py-3">Shoulder</th>
                          <th className="px-2 py-3">Chest</th>
                          <th className="px-2 py-3">Sleeve</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChart.map((row) => (
                          <tr key={row.size} className="border-b border-ink/10">
                            <td className="px-2 py-3 font-bold">{row.size}</td>
                            <td className="px-2 py-3">{row.length}"</td>
                            <td className="px-2 py-3">{row.shoulder}"</td>
                            <td className="px-2 py-3">{row.chest}"</td>
                            <td className="px-2 py-3">{row.sleeve}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h3 className="eyebrow mb-4">How to Measure</h3>

                    <div className="space-y-4 text-xs leading-relaxed text-ink/70">
                      <p>
                        <strong>Length:</strong> From where the shoulder seam
                        meets the collar to the bottom hem.
                      </p>
                      <p>
                        <strong>Shoulder:</strong> From one shoulder seam to
                        the other.
                      </p>
                      <p>
                        <strong>Chest:</strong> Across the garment just below
                        the armpits, from one side to the other.
                      </p>
                      <p>
                        <strong>Sleeve:</strong> From the shoulder seam to the
                        cuff.
                      </p>
                    </div>

                    <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/50">
                      For the best fit, measure a hoodie you already own and
                      compare its measurements with this chart.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <label className="eyebrow mb-3 block">Quantity</label>
              <div className="flex w-36 items-center border border-ink/20">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex-1 py-3 hover:bg-ink/5"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="flex-1 py-3 hover:bg-ink/5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-10 w-full border border-ink/20 bg-ink/10 px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/40"
            >
              Ordering Opens Soon
            </button>

            <p className="mt-4 text-center text-xs text-ink/50">
              Orders will be handled directly by Red Door.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

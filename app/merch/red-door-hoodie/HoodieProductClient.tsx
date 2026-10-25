
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { merch } from '@/content/site'
import { useCart } from '@/components/CartProvider'

type ShopifyProduct = {
  title: string
  description: string
  availableForSale: boolean
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    nodes: {
      id: string
      title: string
      availableForSale: boolean
      selectedOptions: {
        name: string
        value: string
      }[]
    }[]
  }
}

type Props = {
  shopifyProduct: ShopifyProduct | null
}

const sizeChart = [
  { size: 'S', length: '26.38', shoulder: '23.03', chest: '23.23', sleeve: '21.65' },
  { size: 'M', length: '27.17', shoulder: '23.82', chest: '24.02', sleeve: '22.24' },
  { size: 'L', length: '27.95', shoulder: '24.61', chest: '24.80', sleeve: '22.83' },
  { size: 'XL', length: '28.74', shoulder: '25.39', chest: '25.59', sleeve: '23.43' },
  { size: '2XL', length: '29.53', shoulder: '26.18', chest: '26.77', sleeve: '24.02' },
  { size: '3XL', length: '30.31', shoulder: '26.97', chest: '27.17', sleeve: '24.61' },
]

const normalizeSize = (size: string) =>
  size.toUpperCase().replace('XXL', '2XL')

export default function HoodieProductClient({ shopifyProduct }: Props) {
  const product = merch.products.find(
    (item) => item.name === 'Red Door Hoodie'
  )

  const { addItem } = useCart()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [cartError, setCartError] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)

  const touchStartX = useRef<number | null>(null)

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

  const livePrice = shopifyProduct
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
      }).format(Number(shopifyProduct.priceRange.minVariantPrice.amount))
    : ''

  const displayedPrice = livePrice || product.price || 'Price coming soon'

  const findVariantBySize = (size: string) =>
    shopifyProduct?.variants.nodes.find((variant) => {
      const sizeOption = variant.selectedOptions.find(
        (option) => option.name.toLowerCase() === 'size'
      )

      return (
        sizeOption &&
        normalizeSize(sizeOption.value) === normalizeSize(size)
      )
    })

  const selectedVariant = findVariantBySize(selectedSize)

  const canOrder =
    Boolean(shopifyProduct?.availableForSale) &&
    Boolean(selectedVariant?.availableForSale)

  const changeImage = (direction: number) => {
    setSelectedImage((current) =>
      (current + direction + images.length) % images.length
    )
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return

    const touchEndX = event.changedTouches[0].clientX
    const difference = touchStartX.current - touchEndX

    if (Math.abs(difference) > 50) {
      changeImage(difference > 0 ? 1 : -1)
    }

    touchStartX.current = null
  }

  async function handleCartAction() {
    if (!shopifyProduct || !selectedVariant) {
      setCartError('Please select an available size.')
      return
    }

    if (!selectedVariant.availableForSale) {
      setCartError('This size is currently unavailable.')
      return
    }

    setAddingToCart(true)
    setCartError('')
    setAddedToCart(false)

    try {
      await addItem(selectedVariant.id, quantity)
      setAddedToCart(true)
    } catch (error) {
      setCartError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setAddingToCart(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <style jsx>{`
        @keyframes hoodieImageEnter {
          from {
            opacity: 0;
            transform: translateX(14px) scale(0.985);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        .hoodie-image-enter {
          animation: hoodieImageEnter 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hoodie-image-enter {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-6 md:px-10 md:pb-28 md:pt-10">

        {/* Top Navigation */}
        <div className="mb-8 grid grid-cols-2 items-start border-b border-ink/20 pb-5 md:mb-12">
          <Link
            href="/merch"
            className="eyebrow justify-self-start text-ink/60 transition-colors hover:text-red"
          >
            ← Back to Merch
          </Link>

          <span className="eyebrow justify-self-end text-right text-ink/50">
            Red Door / Official Merchandise
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

          {/* Product Images */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div
              className="relative mx-auto flex min-h-[360px] max-w-[560px] items-center justify-center overflow-hidden bg-ink/[0.025] touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                key={selectedImage}
                className="hoodie-image-enter relative aspect-[4/5] w-full max-w-[480px]"
              >
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-6 md:p-10"
                  draggable={false}
                />
              </div>

              <button
                type="button"
                onClick={() => changeImage(-1)}
                aria-label="View previous product image"
                className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-cream/90 text-ink transition-colors hover:border-red hover:bg-red hover:text-cream md:left-5 md:h-12 md:w-12"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M15 18 9 12l6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => changeImage(1)}
                aria-label="View next product image"
                className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-cream/90 text-ink transition-colors hover:border-red hover:bg-red hover:text-cream md:right-5 md:h-12 md:w-12"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <span className="eyebrow absolute bottom-5 left-5 text-ink/40">
                Red Door / 001
              </span>

              <span className="eyebrow absolute bottom-5 right-5 text-ink/40">
                {images[selectedImage].label} View
              </span>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              {images.map((image, index) => (
                <button
                  key={image.label}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View ${image.label.toLowerCase()} image`}
                  aria-pressed={selectedImage === index}
                  className={`h-1 transition-all duration-300 ${
                    selectedImage === index
                      ? 'w-10 bg-red'
                      : 'w-5 bg-ink/20 hover:bg-ink/50'
                  }`}
                />
              ))}

              <span className="eyebrow ml-2 text-ink/40">
                0{selectedImage + 1} / 0{images.length}
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:pt-8">
            <p className="eyebrow mb-5 text-red">
              Official Red Door Merchandise
            </p>

            <h1 className="font-display text-6xl font-black uppercase leading-[0.86] tracking-tight md:text-7xl lg:text-[6.5rem]">
              Red Door
              <br />
              Hoodie
            </h1>

            <div className="mt-7 flex items-center justify-between border-b border-ink/20 pb-7">
              <p className="text-xl font-medium md:text-2xl">
                {displayedPrice}
              </p>

              <span className="eyebrow text-ink/40">
                Black / Relaxed Fit
              </span>
            </div>

            {/* Short Description */}
            <p className="max-w-lg py-7 text-base leading-relaxed text-ink/65 md:text-lg">
              A relaxed-fit black hoodie featuring Red Door graphics on the
              front and back. Made for wherever the music takes you.
            </p>

            {/* Size Selection */}
            <div className="border-t border-ink/20 pt-7">
              <div className="mb-4 flex items-center justify-between">
                <label className="eyebrow">Select Size</label>

                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs font-semibold underline underline-offset-4 transition-colors hover:text-red"
                  aria-expanded={showSizeGuide}
                >
                  {showSizeGuide ? 'Close Size Guide' : 'Size Guide'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {product.sizes.map((size) => {
                  const variant = findVariantBySize(size)
                  const unavailable =
                    Boolean(shopifyProduct) && !variant?.availableForSale

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size)
                        setCartError('')
                        setAddedToCart(false)
                      }}
                      disabled={unavailable}
                      className={`relative border py-4 text-sm font-bold transition-colors ${
                        selectedSize === size
                          ? 'border-red bg-red text-cream'
                          : 'border-ink/20 hover:border-ink'
                      } ${unavailable ? 'cursor-not-allowed opacity-35' : ''}`}
                      aria-pressed={selectedSize === size}
                      title={unavailable ? 'Currently unavailable' : size}
                    >
                      {size}
                    </button>
                  )
                })}
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
                      <p><strong>Length:</strong> From where the shoulder seam meets the collar to the bottom hem.</p>
                      <p><strong>Shoulder:</strong> From one shoulder seam to the other.</p>
                      <p><strong>Chest:</strong> Across the garment just below the armpits, from one side to the other.</p>
                      <p><strong>Sleeve:</strong> From the shoulder seam to the cuff.</p>
                    </div>

                    <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/50">
                      For the best fit, measure a hoodie you already own and
                      compare its measurements with this chart.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <label className="eyebrow mb-3 block">Quantity</label>

              <div className="flex w-36 items-center border border-ink/20">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex-1 py-3 transition-colors hover:bg-ink/5"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="w-12 text-center text-sm">{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(10, current + 1))}
                  className="flex-1 py-3 transition-colors hover:bg-ink/5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleCartAction}
              disabled={!canOrder || addingToCart}
              className="mt-8 w-full bg-red px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/40"
            >
              {addingToCart
                ? 'Adding to Cart...'
                : shopifyProduct
                  ? selectedSize
                    ? 'Add to Cart'
                    : 'Select a Size'
                  : 'Ordering Opens Soon'}
            </button>

            {addedToCart && (
              <div className="mt-4 text-center text-sm">
                <p className="text-green-700">Added to your cart.</p>
                <Link
                  href="/cart"
                  className="mt-2 inline-block text-xs font-bold uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-red"
                >
                  View Cart
                </Link>
              </div>
            )}

            {cartError && (
              <p className="mt-3 text-center text-xs text-red">{cartError}</p>
            )}

            <p className="mt-4 text-center text-xs leading-relaxed text-ink/45">
              Orders are fulfilled by Red Door through our merchandise partner.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

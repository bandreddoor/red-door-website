
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

const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL']

const normalizeSize = (size: string) =>
  size.toUpperCase().replace('XXL', '2XL')

export default function CrewneckProductClient({ shopifyProduct }: Props) {
  const product = merch.products.find(
    (item) => item.name === 'Red Door Crewneck'
  )

  const { addItem } = useCart()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [cartError, setCartError] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)

  const touchStartX = useRef<number | null>(null)

  if (!product) {
    return <main className="min-h-screen bg-cream p-10">Product not found.</main>
  }

  const images = [
    {
      src: '/images/merch/red-door-crew-front.png',
      label: 'Front',
      alt: 'Red Door Crewneck front',
    },
    {
      src: '/images/merch/red-door-crew-back.png',
      label: 'Back',
      alt: 'Red Door Crewneck back',
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
        @keyframes crewneckImageEnter {
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

        .crewneck-image-enter {
          animation: crewneckImageEnter 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .crewneck-image-enter {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-6 md:px-10 md:pb-28 md:pt-10">
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
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div
              className="relative mx-auto flex min-h-[360px] max-w-[560px] items-center justify-center overflow-hidden bg-ink/[0.025] touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                key={selectedImage}
                className="crewneck-image-enter relative aspect-[4/5] w-full max-w-[480px]"
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
                Red Door / 002
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

          <div className="lg:pt-8">
            <p className="eyebrow mb-5 text-red">
              Official Red Door Merchandise
            </p>

            <h1 className="font-display text-6xl font-black uppercase leading-[0.86] tracking-tight md:text-7xl lg:text-[6.5rem]">
              Red Door
              <br />
              Crewneck
            </h1>

            <div className="mt-7 flex items-center justify-between border-b border-ink/20 pb-7">
              <p className="text-xl font-medium md:text-2xl">
                {displayedPrice}
              </p>

              <span className="eyebrow text-ink/40">
                Black / White Embroidery
              </span>
            </div>

            <p className="max-w-lg py-7 text-base leading-relaxed text-ink/65 md:text-lg">
              A classic heavyweight black crewneck featuring embroidered
              white Red Door branding on the front. Designed with a relaxed,
              drop-shoulder fit and a clean, minimal look. An everyday staple
              made for wherever the music takes you.
            </p>

            <div className="border-t border-ink/20 pt-7">
              <div className="mb-4">
                <label className="eyebrow">Select Size</label>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {sizes.map((size) => {
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

              <p className="mt-3 text-xs leading-relaxed text-ink/45">
                Relaxed, drop-shoulder fit. Check the garment measurements
                before ordering if you are between sizes.
              </p>
            </div>

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

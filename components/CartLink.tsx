
'use client'

import Link from 'next/link'
import { useCart } from '@/components/CartProvider'

type CartLinkProps = {
  className?: string
}

export default function CartLink({ className = '' }: CartLinkProps) {
  const { itemCount } = useCart()

  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart, ${itemCount} items`}
      className={`relative inline-flex h-10 w-10 items-center justify-center transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[21px] w-[21px]"
        aria-hidden="true"
      >
        <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
      </svg>

      {itemCount > 0 && (
        <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red px-1 text-[10px] font-bold leading-none text-cream">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}

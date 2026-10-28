
import { notFound } from 'next/navigation'

// Change to true when the merch store is ready to launch.
const MERCH_ENABLED = false

export default function CartPage() {
  if (!MERCH_ENABLED) {
    notFound()
  }

  return null
}

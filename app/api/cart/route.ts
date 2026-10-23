
import { NextResponse } from 'next/server'
import {
  createShopifyCart,
  addToShopifyCart,
} from '@/lib/shopify-cart'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { variantId, quantity, cartId } = body

    if (
      typeof variantId !== 'string' ||
      !variantId.startsWith('gid://shopify/ProductVariant/') ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return NextResponse.json(
        { error: 'Invalid product or quantity.' },
        { status: 400 }
      )
    }

    const cart = cartId
      ? await addToShopifyCart(cartId, variantId, quantity)
      : await createShopifyCart(variantId, quantity)

    return NextResponse.json({
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
    })
  } catch (error) {
    console.error('Shopify cart error:', error)

    return NextResponse.json(
      { error: 'Unable to add this item to your cart.' },
      { status: 500 }
    )
  }
}

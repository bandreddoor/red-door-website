
import { NextResponse } from 'next/server'
import {
  createShopifyCart,
  addToShopifyCart,
  getShopifyCart,
  updateShopifyCartLine,
  removeShopifyCartLine,
} from '@/lib/shopify-cart'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { action, variantId, quantity, cartId, lineId } = body

    // Retrieve the current cart
    if (action === 'get') {
      if (
        typeof cartId !== 'string' ||
        !cartId.startsWith('gid://shopify/Cart/')
      ) {
        return NextResponse.json(
          { error: 'Invalid cart ID.' },
          { status: 400 }
        )
      }

      const cart = await getShopifyCart(cartId)

      return NextResponse.json({ cart })
    }

    // Validate cart ID for all remaining actions
    if (
      typeof cartId !== 'string' ||
      !cartId.startsWith('gid://shopify/Cart/')
    ) {
      return NextResponse.json(
        { error: 'Invalid cart ID.' },
        { status: 400 }
      )
    }

    // Update an existing cart line
    if (action === 'update') {
      if (
        typeof lineId !== 'string' ||
        !lineId.startsWith('gid://shopify/CartLine/') ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
      ) {
        return NextResponse.json(
          { error: 'Invalid cart item or quantity.' },
          { status: 400 }
        )
      }

      const cart = await updateShopifyCartLine(
        cartId,
        lineId,
        quantity
      )

      return NextResponse.json({ cart })
    }

    // Remove an item from the cart
    if (action === 'remove') {
      if (
        typeof lineId !== 'string' ||
        !lineId.startsWith('gid://shopify/CartLine/')
      ) {
        return NextResponse.json(
          { error: 'Invalid cart item.' },
          { status: 400 }
        )
      }

      const cart = await removeShopifyCartLine(cartId, lineId)

      return NextResponse.json({ cart })
    }

    // Add a product to an existing cart
    if (action === 'add') {
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

      const cart = await addToShopifyCart(
        cartId,
        variantId,
        quantity
      )

      return NextResponse.json({ cart })
    }

    return NextResponse.json(
      { error: 'Invalid cart action.' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Shopify cart error:', error)

    return NextResponse.json(
      { error: 'Unable to process your cart request.' },
      { status: 500 }
    )
  }
}

// Create a new cart
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { variantId, quantity } = body

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

    const cart = await createShopifyCart(variantId, quantity)

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Shopify cart creation error:', error)

    return NextResponse.json(
      { error: 'Unable to create your cart.' },
      { status: 500 }
    )
  }
}

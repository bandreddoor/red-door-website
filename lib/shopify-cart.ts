
import { shopifyFetch } from './shopify'

type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
}

type CartResponse = {
  cartCreate?: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[] | null
      message: string
    }[]
  }
  cartLinesAdd?: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[] | null
      message: string
    }[]
  }
}

const CART_CREATE_MUTATION = `
  mutation CreateCart($merchandiseId: ID!, $quantity: Int!) {
    cartCreate(
      input: {
        lines: [
          {
            merchandiseId: $merchandiseId
            quantity: $quantity
          }
        ]
      }
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_LINES_ADD_MUTATION = `
  mutation AddCartLines($cartId: ID!, $merchandiseId: ID!, $quantity: Int!) {
    cartLinesAdd(
      cartId: $cartId
      lines: [
        {
          merchandiseId: $merchandiseId
          quantity: $quantity
        }
      ]
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function createShopifyCart(
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartResponse>(
    CART_CREATE_MUTATION,
    { merchandiseId, quantity }
  )

  const result = data.cartCreate

  if (!result) {
    throw new Error('Shopify did not return a cart creation result.')
  }

  if (result.userErrors.length || !result.cart) {
    throw new Error(
      result.userErrors.map((error) => error.message).join(', ') ||
        'Unable to create cart.'
    )
  }

  return result.cart
}

export async function addToShopifyCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartResponse>(
    CART_LINES_ADD_MUTATION,
    { cartId, merchandiseId, quantity }
  )

  const result = data.cartLinesAdd

  if (!result) {
    throw new Error('Shopify did not return a cart update result.')
  }

  if (result.userErrors.length || !result.cart) {
    throw new Error(
      result.userErrors.map((error) => error.message).join(', ') ||
        'Unable to add item to cart.'
    )
  }

  return result.cart
}


import { shopifyFetch } from './shopify'

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: {
      name: string
      value: string
    }[]
    product: {
      title: string
      handle: string
    }
    image: {
      url: string
      altText: string | null
    } | null
    price: {
      amount: string
      currencyCode: string
    }
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  lines: {
    nodes: ShopifyCartLine[]
  }
}

type ShopifyResponse = {
  cartCreate?: MutationResult
  cartLinesAdd?: MutationResult
  cartLinesUpdate?: MutationResult
  cartLinesRemove?: MutationResult
  cart?: ShopifyCart | null
}

type MutationResult = {
  cart: ShopifyCart | null
  userErrors: {
    field: string[] | null
    message: string
  }[]
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          selectedOptions {
            name
            value
          }
          product {
            title
            handle
          }
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

function handleMutationResult(
  result: MutationResult | undefined,
  fallbackMessage: string
): ShopifyCart {
  if (!result) {
    throw new Error(fallbackMessage)
  }

  if (result.userErrors.length || !result.cart) {
    throw new Error(
      result.userErrors.map((error) => error.message).join(', ') ||
        fallbackMessage
    )
  }

  return result.cart
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
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_LINES_ADD_MUTATION = `
  mutation AddCartLines(
    $cartId: ID!
    $merchandiseId: ID!
    $quantity: Int!
  ) {
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
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`

const CART_LINES_UPDATE_MUTATION = `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CART_LINES_REMOVE_MUTATION = `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FIELDS}
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
  const data = await shopifyFetch<ShopifyResponse>(
    CART_CREATE_MUTATION,
    { merchandiseId, quantity }
  )

  return handleMutationResult(
    data.cartCreate,
    'Unable to create cart.'
  )
}

export async function addToShopifyCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyResponse>(
    CART_LINES_ADD_MUTATION,
    { cartId, merchandiseId, quantity }
  )

  return handleMutationResult(
    data.cartLinesAdd,
    'Unable to add item to cart.'
  )
}

export async function getShopifyCart(
  cartId: string
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<ShopifyResponse>(
    CART_QUERY,
    { cartId }
  )

  return data.cart ?? null
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyResponse>(
    CART_LINES_UPDATE_MUTATION,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  )

  return handleMutationResult(
    data.cartLinesUpdate,
    'Unable to update cart quantity.'
  )
}

export async function removeShopifyCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyResponse>(
    CART_LINES_REMOVE_MUTATION,
    {
      cartId,
      lineIds: [lineId],
    }
  )

  return handleMutationResult(
    data.cartLinesRemove,
    'Unable to remove item from cart.'
  )
}

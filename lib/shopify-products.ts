
import { shopifyFetch } from './shopify'

type ShopifyProductResponse = {
  product: {
    id: string
    title: string
    handle: string
    description: string
    availableForSale: boolean
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    images: {
      nodes: {
        url: string
        altText: string | null
      }[]
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
  } | null
}

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      variants(first: 50) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`

export async function getShopifyProduct(handle: string) {
  const data = await shopifyFetch<ShopifyProductResponse>(
    PRODUCT_QUERY,
    { handle }
  )

  return data.product
}

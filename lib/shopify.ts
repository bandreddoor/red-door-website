
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

const SHOPIFY_API_VERSION = '2026-10'

type ShopifyResponse<T> = {
  data?: T
  errors?: { message: string }[]
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Shopify environment variables are missing.')
  }

  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    }
  )

  const result = (await response.json()) as ShopifyResponse<T>

  if (!response.ok || result.errors?.length || !result.data) {
    throw new Error(
      result.errors?.map((error) => error.message).join(', ') ||
        `Shopify request failed (${response.status}).`
    )
  }

  return result.data
}

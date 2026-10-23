
import { getShopifyProduct } from '@/lib/shopify-products'
import HoodieProductClient from './HoodieProductClient'

export const dynamic = 'force-dynamic'

export default async function HoodiePage() {
  let shopifyProduct = null

  try {
    shopifyProduct = await getShopifyProduct('red-door-hoodie')
  } catch (error) {
    console.error('Unable to load Red Door Hoodie from Shopify:', error)
  }

  return <HoodieProductClient shopifyProduct={shopifyProduct} />
}

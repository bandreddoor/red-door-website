
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type CartLine = {
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

export type Cart = {
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
    nodes: CartLine[]
  }
}

type CartContextType = {
  cart: Cart | null
  itemCount: number
  loading: boolean
  error: string
  addItem: (variantId: string, quantity: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'red-door-cart-id'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const saveCart = useCallback((nextCart: Cart | null) => {
    setCart(nextCart)

    if (nextCart) {
      localStorage.setItem(CART_STORAGE_KEY, nextCart.id)
    } else {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  const sendCartRequest = useCallback(
    async (body: Record<string, unknown>, method = 'POST') => {
      const response = await fetch('/api/cart', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to update your cart.')
      }

      return result
    },
    []
  )

  const refreshCart = useCallback(async () => {
    const cartId = localStorage.getItem(CART_STORAGE_KEY)

    if (!cartId) {
      setCart(null)
      setLoading(false)
      return
    }

    try {
      const result = await sendCartRequest({
        action: 'get',
        cartId,
      })

      if (result.cart) {
        saveCart(result.cart)
      } else {
        saveCart(null)
      }

      setError('')
    } catch (err) {
      saveCart(null)
      setError(
        err instanceof Error ? err.message : 'Unable to load your cart.'
      )
    } finally {
      setLoading(false)
    }
  }, [saveCart, sendCartRequest])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setError('')

      const existingCartId = localStorage.getItem(CART_STORAGE_KEY)

      try {
        const result = existingCartId
          ? await sendCartRequest({
              action: 'add',
              cartId: existingCartId,
              variantId,
              quantity,
            })
          : await sendCartRequest(
              {
                variantId,
                quantity,
              },
              'PUT'
            )

        saveCart(result.cart)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unable to add item to cart.'

        setError(message)
        throw new Error(message)
      }
    },
    [saveCart, sendCartRequest]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return

      setError('')

      try {
        const result = await sendCartRequest({
          action: 'update',
          cartId: cart.id,
          lineId,
          quantity,
        })

        saveCart(result.cart)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unable to update quantity.'

        setError(message)
        throw new Error(message)
      }
    },
    [cart, saveCart, sendCartRequest]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return

      setError('')

      try {
        const result = await sendCartRequest({
          action: 'remove',
          cartId: cart.id,
          lineId,
        })

        saveCart(result.cart)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unable to remove item.'

        setError(message)
        throw new Error(message)
      }
    },
    [cart, saveCart, sendCartRequest]
  )

  const value: CartContextType = {
    cart,
    itemCount: cart?.totalQuantity ?? 0,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    refreshCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider.')
  }

  return context
}

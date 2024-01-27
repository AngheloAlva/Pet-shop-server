import type { ProductCart } from './product-cart.types'

interface Cart {
  id: number
  userId: number
  products: ProductCart[]
  createdAt: Date
}

export {
  type Cart
}

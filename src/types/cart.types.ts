import type { ProductCart } from './product-cart.types'

interface Cart {
  id: number
  userId: number
  products: ProductCart[]
  createdAt: Date
}

interface AddProductToCart {
  authId: string
  productId: number
  quantity: number
  optionSelectedIndex: number
}

export {
  type Cart,
  type AddProductToCart
}

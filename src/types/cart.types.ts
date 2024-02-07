import type { ProductCart } from './product-cart.types'
import type { Product } from './products.types'

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

interface ProductCartResponse {
  id: number
  cartId: number
  quantity: number
  product: Product
  productId: number
  optionSelectedIndex: number
}

export {
  type Cart,
  type AddProductToCart,
  type ProductCartResponse
}

import type { Product } from './products.types'

interface ProductCart {
  id: number
  cartId: number
  product: Product
  productId: number
  quantity: number
  optionSelectedIndex: number
}

export {
  type ProductCart
}

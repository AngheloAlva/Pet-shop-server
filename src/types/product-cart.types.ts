import type { Product } from './products.types'

interface ProductCart {
  id: number
  cartId: number
  quantity: number
  product?: Product
  productId: number
  optionSelectedIndex: number
}

interface CreateProductCart {
  cartId: number
  quantity: number
  productId: number
  optionSelectedIndex: number
}

export {
  type ProductCart,
  type CreateProductCart
}

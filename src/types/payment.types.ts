import type { ProductCart } from './product-cart.types'
import type { Order } from './order.types'

interface Payment {
  id: number
  order?: Order
  orderId: number
  amount: number
  currency: string
  stripeSessionId?: string | null | undefined
  status: 'PENDING' | 'PAID' | 'FAILED'
  createdAt: Date
}

interface CreatePayment {
  userId: number
  productsCart: ProductCart[]
  orderId: number
  shippingMethod: 'CHILEXPRESS' | 'STARKEN' | 'CORREOS_CHILE' | 'SHOP_PICKUP'
}

export {
  type Payment,
  type CreatePayment
}

import type { OrderItem } from './order-item.types'
import type { Payment } from './payment.types'

interface Order {
  id: number
  userId: number
  orderDate: Date
  shippingMethod: 'CHILEXPRESS' | 'STARKEN' | 'CORREOS_CHILE' | 'SHOP_PICKUP'
  addressId: number
  paid: boolean
  checkoutSessionId?: string
  items: OrderItem[]
  payment?: Payment
}

export {
  type Order
}

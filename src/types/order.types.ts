import type { Payment } from './payment.types'
import type { OrderItem } from './order-item.types'

interface Order {
  id: number
  userId: number
  orderDate: Date
  shippingMethod: 'CHILEXPRESS' | 'STARKEN' | 'CORREOS_CHILE' | 'SHOP_PICKUP'
  addressId: number
  paid: boolean
  checkoutSessionId?: string | null
  items: OrderItem[]
  payment?: Payment | null | undefined
}

interface CreateOrder {
  userId: number
  shippingMethod: 'CHILEXPRESS' | 'STARKEN' | 'CORREOS_CHILE' | 'SHOP_PICKUP'
  addressId: number
  cartId: number
}

export {
  type Order,
  type CreateOrder
}

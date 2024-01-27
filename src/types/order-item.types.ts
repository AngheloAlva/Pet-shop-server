import type { Order } from './order.types'

interface OrderItem {
  id: number
  order: Order
  orderId: number
  productName: string
  productImage: string
  productDescription: string
  productPrice: number
  quantity: number
}

interface CreateOrderItem {
  productName: string
  productImage: string
  productDescription: string
  productPrice: number
  quantity: number
}

export {
  type OrderItem,
  type CreateOrderItem
}

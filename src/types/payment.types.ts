import type { Order } from './order.types'

interface Payment {
  id: number
  order: Order
  orderId: number
  ammount: number
  currency: string
  stripeSessionId?: string
  status: 'PENDING' | 'PAID' | 'FAILED'
  createdAt: Date
}

export {
  type Payment
}

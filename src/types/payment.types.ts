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

export {
  type Payment
}

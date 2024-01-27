import type { Address } from './address.types'
import type { Order } from './order.types'
import type { Cart } from './cart.types'

interface User {
  id: number
  name: string
  lastName: string
  email: string
  password: string
  rut: string
  role: 'ADMIN' | 'USER'
  createdAt: Date
  isActive: boolean
  address: Address[]
  phone: string
  orders: Order[]
  cart?: Cart
}

interface CreateUser {
  name: string
  lastName: string
  email: string
  password: string
  rut: string
  role: 'ADMIN' | 'USER'
  phone: string
}

interface UpdateUser {
  name?: string
  lastName?: string
  email?: string
  password?: string
  rut?: string
  role?: 'ADMIN' | 'USER'
  phone?: string
}

export {
  type User,
  type CreateUser,
  type UpdateUser
}

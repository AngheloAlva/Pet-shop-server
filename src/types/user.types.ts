import type { Address } from './address.types'
import type { Order } from './order.types'
import type { Cart } from './cart.types'

interface User {
  id: number
  authId: string
  name?: string | null
  lastName?: string | null
  email: string
  rut?: string | null
  role: string | null
  createdAt: Date
  isActive: boolean
  address?: Address[]
  phone?: string | null
  orders?: Order[]
  cart?: Cart
}

interface CreateUser {
  email: string
  authId: string
}

interface UpdateUser {
  name?: string
  lastName?: string
  email?: string
  password?: string
  rut?: string
  phone?: string
}

export {
  type User,
  type CreateUser,
  type UpdateUser
}

import type { Order } from './order.types'
import type { User } from './user.types'

interface Address {
  id: number
  user?: User
  userId: number
  name: string
  street: string
  number: string
  zipCode: string
  commune: string
  region: string
  isApartment: boolean
  apartmentNumber: string | null
  orders?: Order[]
}

interface CreateAddress {
  name: string
  street: string
  number: string
  zipCode: string
  commune: string
  region: string
  authId: string
  isApartment: boolean
  apartmentNumber: string
}

interface UpdateAddress {
  name?: string
  street?: string
  number?: string
  zipCode?: string
  commune?: string
  region?: string
  isApartment?: boolean
  apartmentNumber?: string
}

export {
  type Address,
  type CreateAddress,
  type UpdateAddress
}

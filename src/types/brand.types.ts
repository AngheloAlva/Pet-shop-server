import type { Product } from './products.types'

interface Brand {
  id: number
  name: string
  isAvailable: boolean
  image: string
  products: Product[]
}

interface CreateBrand {
  name: string
  image: string
}

interface UpdateBrand {
  name?: string
  image?: string
}

export {
  type Brand,
  type CreateBrand,
  type UpdateBrand
}

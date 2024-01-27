interface Option {
  id: number
  price: number
  stock: number
  discount: number
  productId: number
  lastModified: Date
}

interface CreateOption {
  price: number
  stock: number
  discount: number
  productId: number
}

interface UpdateOption {
  price?: number
  stock?: number
  discount?: number
}

export {
  type Option,
  type CreateOption,
  type UpdateOption
}

import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { GetProductsWithFilters } from '../../types/shared.types'
import type {
  Product,
  CreateProduct,
  UpdateProduct,
  UpdatedDataUpdatedProduct
} from '../../types/products.types'

export class ProductService {
  async createProduct ({
    name, description, brandId, categoryId, options, images, lifeStage, miniDesc, petType, slug
  }: CreateProduct): Promise<Product> {
    try {
      const descriptionString: string = JSON.stringify(description)

      const product = await prisma.product.create({
        data: {
          name,
          slug,
          images,
          petType,
          brandId,
          miniDesc,
          lifeStage,
          categoryId,
          description: descriptionString,
          options: {
            create: options
          }
        }
      })

      return product
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAllProducts ({
    page,
    limit,
    order,
    search,
    sortBy,
    petType,
    brandSlug,
    maxPrice,
    minPrice,
    lifeStage,
    categorySlug,
    isAvailable,
    isDiscounted
  }: GetProductsWithFilters): Promise<{ products: Product[], total: number }> {
    const filters: any = {
      isAvailable
    }

    if (petType != null) filters.petType = petType
    if (lifeStage != null) filters.lifeStage = lifeStage
    if (isDiscounted != null) filters.discount = { gt: 0 }
    if (brandSlug != null) filters.brand = { slug: brandSlug }
    if (minPrice != null) filters.price = { gte: Number(minPrice) }
    if (categorySlug != null) filters.category = { slug: categorySlug }
    if (maxPrice != null) filters.price = { ...filters.price, lte: Number(maxPrice) }

    if (search != null) {
      filters.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const orderBy = (sortBy != null) ? { [sortBy]: order } : undefined

    try {
      const [total, products] = await Promise.all([
        prisma.product.count({ where: filters }),
        prisma.product.findMany({
          where: filters,
          skip: (page - 1) * limit,
          take: limit,
          orderBy,
          include: {
            brand: true,
            options: true,
            category: true
          }
        })
      ])

      return { total, products }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getProductById (id: number): Promise<Product> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id
        },
        include: {
          brand: true,
          options: true,
          category: true
        }
      })

      if (product == null) {
        throw CustomError.notFound('Product not found')
      }

      return product
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getProductBySlug (slug: string): Promise<Product> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          slug
        },
        include: {
          brand: true,
          options: true,
          category: true
        }
      })

      if (product == null) {
        throw CustomError.notFound('Product not found')
      }

      return product
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async updateProduct (id: number, {
    name, description, brandId, categoryId, images, lifeStage, miniDesc, petType, slug
  }: UpdateProduct): Promise<Product> {
    try {
      const updatedData: UpdatedDataUpdatedProduct = {}

      if (description != null) updatedData.description = JSON.stringify(description)
      if (categoryId != null) updatedData.categoryId = categoryId
      if (lifeStage != null) updatedData.lifeStage = lifeStage
      if (miniDesc != null) updatedData.miniDesc = miniDesc
      if (brandId != null) updatedData.brandId = brandId
      if (petType != null) updatedData.petType = petType
      if (images != null) updatedData.images = images
      if (name != null) updatedData.name = name
      if (slug != null) updatedData.slug = slug

      const product = await prisma.product.update({
        where: {
          id
        },
        data: {
          ...updatedData
        }
      })

      return product
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async deleteProduct (id: number): Promise<void> {
    try {
      await prisma.product.update({
        where: {
          id
        },
        data: {
          isAvailable: false
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async restoreProduct (id: number): Promise<void> {
    try {
      await prisma.product.update({
        where: {
          id
        },
        data: {
          isAvailable: true
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

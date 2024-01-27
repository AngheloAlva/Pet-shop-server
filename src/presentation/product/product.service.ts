import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { AvailableWithPagination } from '../../types/shared.types'
import type {
  Product,
  CreateProduct,
  UpdateProduct
} from '../../types/products.types'

export class ProductService {
  async createProduct ({
    name, description, brandId, categoryId, options, images, lifeStage, miniDesc, petType, slug
  }: CreateProduct): Promise<Product> {
    try {
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
          description,
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
    limit, page, isAvailable
  }: AvailableWithPagination): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: {
          isAvailable
        },
        skip: (page - 1) * limit,
        take: limit
      })

      return products
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getProductById (id: number): Promise<Product> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id
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
      const updatedData: UpdateProduct = {}

      if (description != null) updatedData.description = description
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

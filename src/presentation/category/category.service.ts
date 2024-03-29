import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import { isAdmin } from '../../helpers/is-admin'

import type {
  Category,
  CreateCategory,
  UpdateCategory
} from '../../types/category.types'

export class CategoryService {
  async createCategory ({
    name, description, image, slug, petType, authId
  }: CreateCategory): Promise<Category> {
    try {
      await isAdmin(authId)

      const category = await prisma.category.create({
        data: {
          name,
          slug,
          image,
          petType,
          description
        }
      })

      return category
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAllCategories (
    { page, limit, isAvailable }: { page: number, limit: number, isAvailable: boolean }
  ): Promise<{ total: number, categories: Category[] }> {
    try {
      const [total, categories] = await Promise.all([
        prisma.category.count(),
        prisma.category.findMany({
          where: {
            isAvailable
          },
          skip: (page - 1) * limit,
          take: limit
        })
      ])

      return {
        total,
        categories
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getCategoryById (id: number): Promise<Category> {
    try {
      const category = await prisma.category.findUnique({
        where: {
          id
        }
      })

      if (category == null) throw CustomError.notFound('Category not found')

      return category
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getCategoryBySlug (slug: string): Promise<Category> {
    try {
      const category = await prisma.category.findUnique({
        where: {
          slug
        }
      })

      if (category == null) throw CustomError.notFound('Category not found')

      return category
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async updateCategory (id: number, authId: string,
    { name, slug, image, description, petType }: UpdateCategory
  ): Promise<Category> {
    try {
      await isAdmin(authId)

      const updateData: UpdateCategory = {}

      if (name != null) updateData.name = name
      if (slug != null) updateData.slug = slug
      if (image != null) updateData.image = image
      if (petType != null) updateData.petType = petType
      if (description != null) updateData.description = description

      const category = await prisma.category.update({
        where: {
          id
        },
        data: {
          ...updateData
        }
      })

      return category
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async deleteCategory (id: number, authId: string): Promise<Category> {
    try {
      await isAdmin(authId)

      const category = await prisma.category.update({
        where: {
          id
        },
        data: {
          isAvailable: false
        }
      })

      return category
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async restoreCategory (id: number, authId: string): Promise<Category> {
    try {
      await isAdmin(authId)

      const category = await prisma.category.update({
        where: {
          id
        },
        data: {
          isAvailable: true
        }
      })

      return category
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

import { CustomError } from '../../domain/errors/custom.error'
import { verifyBrandExist } from '../../helpers/brand-helpers'
import { prisma } from '../../domain/shared/prismaClient'
import { isAdmin } from '../../helpers/is-admin'

import type { AvailableWithPagination } from '../../types/shared.types'
import type {
  Brand,
  CreateBrand,
  UpdateBrand
} from '../../types/brand.types'

export class BrandService {
  async createBrand ({
    image, name, slug, authId
  }: CreateBrand): Promise<Brand> {
    try {
      await isAdmin(authId)
      await verifyBrandExist(name)

      const brand = await prisma.brand.create({
        data: {
          image,
          name,
          slug
        }
      })

      return brand
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAllBrands ({
    limit = 1, page = 1, isAvailable = true
  }: AvailableWithPagination): Promise<Brand[]> {
    try {
      const brands = await prisma.brand.findMany({
        where: {
          isAvailable
        },
        skip: (page - 1) * limit,
        take: limit
      })

      return brands
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getBrandById (id: number): Promise<Brand> {
    try {
      const brand = await prisma.brand.findUnique({
        where: {
          id
        }
      })

      if (brand == null) {
        throw CustomError.notFound('Brand not found')
      }

      return brand
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getBrandBySlug (slug: string): Promise<Brand> {
    try {
      const brand = await prisma.brand.findUnique({
        where: {
          slug
        }
      })

      if (brand == null) {
        throw CustomError.notFound('Brand not found')
      }

      return brand
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async updateBrand (id: number, authId: string, {
    image, name, slug
  }: UpdateBrand): Promise<Brand> {
    try {
      await isAdmin(authId)

      const updateData: UpdateBrand = {}

      if (image != null) updateData.image = image
      if (name != null) updateData.name = name
      if (slug != null) updateData.slug = slug

      const brand = await prisma.brand.update({
        where: {
          id
        },
        data: {
          ...updateData
        }
      })

      if (brand == null) {
        throw CustomError.notFound('Brand not found')
      }

      return brand
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async deleteBrand (id: number, authId: string): Promise<void> {
    try {
      await isAdmin(authId)

      await prisma.brand.update({
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

  async restoreBrand (id: number, authId: string): Promise<void> {
    try {
      await isAdmin(authId)

      await prisma.brand.update({
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

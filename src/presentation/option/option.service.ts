import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import { isAdmin } from '../../helpers/is-admin'

import type { UpdateOption } from '../../types/option.types'

export class OptionService {
  async updateOption (id: number, authId: string, {
    discount, price, stock
  }: UpdateOption): Promise<void> {
    try {
      await isAdmin(authId)

      const updatedData: UpdateOption = {}

      if (discount !== undefined) updatedData.discount = discount
      if (price !== undefined) updatedData.price = price
      if (stock !== undefined) updatedData.stock = stock

      await prisma.option.update({
        where: { id },
        data: {
          ...updatedData,
          lastModified: new Date()
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async deleteOption (id: number, authId: string): Promise<void> {
    try {
      await isAdmin(authId)

      await prisma.option.delete({
        where: { id }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

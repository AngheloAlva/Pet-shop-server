import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { UpdateOption } from '../../types/option.types'

export class OptionService {
  async updateOption (id: number, {
    discount, price, stock
  }: UpdateOption): Promise<void> {
    try {
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

  async deleteOption (id: number): Promise<void> {
    try {
      await prisma.option.delete({
        where: { id }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

import { CustomError } from '../domain/errors/custom.error'
import { prisma } from '../domain/shared/prismaClient'

export const verifyBrandExist = async (name: string): Promise<void> => {
  const brandExist = await prisma.brand.findFirst({
    where: {
      name
    }
  })
  if (brandExist != null) {
    throw CustomError.badRequest('Brand already exists')
  }
}

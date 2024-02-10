import { CustomError } from '../domain/errors/custom.error'
import { prisma } from '../domain/shared/prismaClient'

export const isAdmin = async (authId: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      authId
    }
  })

  if (user == null) {
    throw CustomError.notFound('User not found')
  }

  if (user.role !== 'ADMIN') {
    throw CustomError.unauthorized('User is not an admin')
  }
}

import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import { isAdmin } from '../../helpers/is-admin'

import type { CreateUser, UpdateUser, User } from '../../types/user.types'
import type { AvailableWithPagination } from '../../types/shared.types'

export class UserService {
  async createUser ({
    email, authId
  }: CreateUser): Promise<{ message: string }> {
    try {
      await prisma.user.create({
        data: {
          email,
          authId,
          cart: {
            create: {}
          }
        }
      })

      return {
        message: 'User created successfully'
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAllUsers (authId: string, {
    limit, page, isAvailable
  }: AvailableWithPagination): Promise<{ total: number, users: User[] }> {
    try {
      await isAdmin(authId)

      const [total, users] = await Promise.all([
        prisma.user.count({
          where: {
            isActive: isAvailable
          }
        }),
        prisma.user.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            isActive: isAvailable
          }
        })
      ])

      return {
        users,
        total
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getUserById (authId: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          authId
        },
        include: {
          address: true
        }
      })

      if (user == null) {
        throw CustomError.notFound('User not found')
      }

      return user
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getUserByEmail (email: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (user == null) {
        throw CustomError.notFound('User not found')
      }

      return user
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async updateUser (authId: string, {
    email, lastName, name, password, phone, rut
  }: UpdateUser): Promise<{ message: string }> {
    try {
      const updatedData: UpdateUser = {}

      if (email !== undefined) updatedData.email = email
      if (lastName !== undefined) updatedData.lastName = lastName
      if (name !== undefined) updatedData.name = name
      if (password !== undefined) updatedData.password = password
      if (phone !== undefined) updatedData.phone = phone
      if (rut !== undefined) updatedData.rut = rut

      await prisma.user.update({
        where: {
          authId
        },
        data: {
          ...updatedData
        }
      })

      return {
        message: 'User updated successfully'
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async deleteUser (id: number): Promise<{ message: string }> {
    try {
      await prisma.user.update({
        where: {
          id
        },
        data: {
          isActive: false
        }
      })

      return {
        message: 'User deleted successfully'
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async activateUser (id: number): Promise<{ message: string }> {
    try {
      await prisma.user.update({
        where: {
          id
        },
        data: {
          isActive: true
        }
      })

      return {
        message: 'User activated successfully'
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

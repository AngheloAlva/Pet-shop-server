import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import bcrypt from 'bcrypt'

import type { CreateUser, UpdateUser, User } from '../../types/user.types'
import type { AvailableWithPagination } from '../../types/shared.types'
import { generateVerificationCode } from '../../helpers/verificationCodeGenerator'
import { sendEmail } from '../../utils/mailjet'

export class UserService {
  async createUser ({
    email, lastName, name, password, phone, rut
  }: CreateUser): Promise<{ message: string }> {
    try {
      const passwordHash = await bcrypt.hash(password, 10)

      const verificationCode = generateVerificationCode(6)

      await prisma.user.create({
        data: {
          rut,
          name,
          phone,
          email,
          lastName,
          verificationCode,
          password: passwordHash
        }
      })

      const subject = 'Verifica tu cuenta'
      const text = `Tu código de verificación es ${verificationCode}`
      const html = `<h1>Tu código de verificación es ${verificationCode}</h1>`

      await sendEmail({
        to: email,
        name: `${name} ${lastName}`,
        subject,
        text,
        html
      })

      return {
        message: 'User created successfully'
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAllUsers ({
    limit, page, isAvailable
  }: AvailableWithPagination): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          isActive: isAvailable
        }
      })

      return users
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getUserById (id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
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

  async updateUser (id: number, {
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
          id
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

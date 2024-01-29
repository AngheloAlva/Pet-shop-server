import { envs } from '../../config/envs'
import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

interface LoginParams {
  email: string
  password: string
}

export class AuthService {
  async login (
    { email, password }: LoginParams
  ): Promise<{ accessToken: string, refreshToken: string }> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user == null) throw CustomError.notFound('User not found')
      if (!user.emailVerified) throw CustomError.badRequest('User not verified')

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) throw CustomError.unauthorized('Invalid password')

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        envs.SECRET_KEY,
        { expiresIn: '1h' }
      )

      const refreshToken = jwt.sign(
        { id: user.id, role: user.role },
        envs.SECRET_KEY,
        { expiresIn: '7d' }
      )

      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async refreshAccessToken (refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, envs.SECRET_KEY) as { id: number, role: string }
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id
        }
      })
      if (user == null) throw CustomError.notFound('User not found')

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        envs.SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        accessToken
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async verifyEmail (
    email: string, code: string
  ): Promise<{ accessToken: string, refreshToken: string }> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user == null) throw CustomError.notFound('User not found')

      if (user.verificationCode !== code) throw CustomError.badRequest('Invalid code')

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: true
        }
      })

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        envs.SECRET_KEY,
        { expiresIn: '1h' }
      )

      const refreshToken = jwt.sign(
        { id: user.id, role: user.role },
        envs.SECRET_KEY,
        { expiresIn: '7d' }
      )

      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async handlePasswordResetRequest (email: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user == null) throw CustomError.notFound('User not found')

      const resetPasswordToken = jwt.sign(
        { id: user.id, role: user.role },
        envs.SECRET_KEY,
        { expiresIn: '1h' }
      )

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          resetPasswordToken
        }
      })

      // TODO: Send email with resetPasswordToken
      // Like this:
      // const resetLink = `${envs.CLIENT_URL}/auth/forgot-password?token=${resetToken}`
      // const subject = 'Reset your password'
      // const text = `Click on this link to reset your password: ${resetLink}`
      // const html = `<p>Click on this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async resetPassword (resetPasswordToken: string, newPassword: string): Promise<void> {
    try {
      const decoded = jwt.verify(resetPasswordToken, envs.SECRET_KEY) as { id: number, role: string }
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id
        }
      })
      if (user == null) throw CustomError.notFound('User not found')

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          password: hashedPassword
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

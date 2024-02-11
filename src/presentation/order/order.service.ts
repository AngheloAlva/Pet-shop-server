import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import { isAdmin } from '../../helpers/is-admin'

import type { PaginationDto } from '../../domain/shared/pagination.dto'
import type { Order } from '../../types/order.types'

export class OrderService {
  async getOrders (authId: string, {
    limit = 10, page = 1
  }: PaginationDto): Promise<{ total: number, orders: Order[] }> {
    try {
      await isAdmin(authId)

      const [total, orders] = await Promise.all([
        prisma.order.count(),
        prisma.order.findMany({
          skip: (page - 1) * limit,
          take: limit,
          include: {
            items: true,
            payment: true
          }
        })
      ])

      return {
        total,
        orders
      }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getOrderById (id: number): Promise<Order> {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id
        },
        include: {
          items: true,
          payment: true
        }
      })
      if (order == null) throw CustomError.notFound('Order not found')

      return order
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getOrdersByUserId (authId: string): Promise<Order[]> {
    try {
      const orders = await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient.user.findUnique({
          where: {
            authId
          }
        })
        if (user == null) throw CustomError.notFound('User not found')

        const orders = await prismaClient.order.findMany({
          where: {
            userId: user.id
          },
          include: {
            items: true,
            payment: true,
            address: true
          }
        })

        return orders
      })

      return orders
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { PaginationDto } from '../../domain/shared/pagination.dto'
import type { Order } from '../../types/order.types'

export class OrderService {
  async getOrders ({
    limit = 10, page = 1
  }: PaginationDto): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        include: {
          items: true,
          payment: true
        }
      })

      return orders
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

  async getOrdersByUserId (userId: number): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId
        },
        include: {
          items: true,
          payment: true
        }
      })

      return orders
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

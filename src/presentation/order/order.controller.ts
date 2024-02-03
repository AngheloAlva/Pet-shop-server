import { CustomError } from '../../domain/errors/custom.error'

import type { OrderService } from './order.service'
import type { Request, Response } from 'express'

export class OrderController {
  constructor (
    private readonly orderService: OrderService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  getOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { page, limit } = req.query

      const orders = await this.orderService.getOrders({
        page: Number(page),
        limit: Number(limit)
      })

      return res.status(200).json(orders)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getOrderById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      const order = await this.orderService.getOrderById(Number(id))

      return res.status(200).json(order)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getOrdersByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authId } = req.params

      const orders = await this.orderService.getOrdersByUserId(authId)

      return res.status(200).json(orders)
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

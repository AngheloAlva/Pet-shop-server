import { CustomError } from '../../domain/errors/custom.error'

import type { PaymentService } from './payment.service'
import type { Request, Response } from 'express'
import type Stripe from 'stripe'

export class PaymentController {
  constructor (
    private readonly paymentService: PaymentService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createCheckoutSession = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        orderId,
        productsCart,
        shippingMethod,
        userId
      } = req.body

      await this.paymentService.createCheckoutSession({
        orderId,
        productsCart,
        shippingMethod,
        userId
      })

      return res.status(200).json({ message: 'Checkout session created' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  stripeWebhook = async (req: Request, res: Response): Promise<Response> => {
    try {
      const event = req.body

      await this.paymentService.stripeWebhook(
        event as Stripe.Event
      )

      return res.status(200).json({
        message: 'Webhook received'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

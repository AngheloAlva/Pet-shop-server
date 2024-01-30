/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { createCheckoutSessionValidation } from '../../middleware/models-validations/payment-validations'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { Router } from 'express'

export class PaymentRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new PaymentService()
    const controller = new PaymentController(service)

    router.post('/payment/checkout-session', createCheckoutSessionValidation, controller.createCheckoutSession)
    router.post('/payment/webhook', controller.stripeWebhook)

    return router
  }
}

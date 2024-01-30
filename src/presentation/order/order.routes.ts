/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { idValidation } from '../../middleware/id-validation'
import {
  getOrderByUserIdValidations,
  getOrdersValidations
} from '../../middleware/models-validations/order-validations'

export class OrderRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new OrderService()
    const controller = new OrderController(service)

    router.get('/order/', getOrdersValidations, controller.getOrders)
    router.get('/order/:id', idValidation, controller.getOrderById)
    router.get('/order/user/:userId', getOrderByUserIdValidations, controller.getOrdersByUserId)

    return router
  }
}

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { idValidation } from '../../middleware/id-validation'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { Router } from 'express'
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
    router.get('/order/user/:authId', getOrderByUserIdValidations, controller.getOrdersByUserId)

    return router
  }
}

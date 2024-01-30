/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import {
  UserRoutes,
  AuthRoutes,
  CartRoutes,
  OrderRoutes,
  BrandRoutes,
  OptionRoutes,
  AddressRoutes,
  ProductRoutes,
  CategoryRoutes
} from './routes-exports'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.use('/api', UserRoutes.routes)
    router.use('/api', AuthRoutes.routes)
    router.use('/api', CartRoutes.routes)
    router.use('/api', OrderRoutes.routes)
    router.use('/api', BrandRoutes.routes)
    router.use('/api', OptionRoutes.routes)
    router.use('/api', ProductRoutes.routes)
    router.use('/api', AddressRoutes.routes)
    router.use('/api', CategoryRoutes.routes)

    return router
  }
}

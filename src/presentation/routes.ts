/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import {
  UserRoutes,
  BrandRoutes,
  OptionRoutes,
  ProductRoutes,
  CategoryRoutes
} from './routes-exports'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.use('/api', UserRoutes.routes)
    router.use('/api', BrandRoutes.routes)
    router.use('/api', OptionRoutes.routes)
    router.use('/api', ProductRoutes.routes)
    router.use('/api', CategoryRoutes.routes)

    return router
  }
}

/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import {
  BrandRoutes,
  ProductRoutes
} from './routes-exports'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.use('/api', BrandRoutes.routes)
    router.use('/api', ProductRoutes.routes)

    return router
  }
}

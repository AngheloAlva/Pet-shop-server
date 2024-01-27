/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import { BrandRoutes } from './brand/brand.routes'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.use('/api', BrandRoutes.routes)

    return router
  }
}

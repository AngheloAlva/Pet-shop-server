/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { slugValidation } from '../../middleware/slug-validation'
import { idValidation } from '../../middleware/id-validation'
import { BrandController } from './brand.controller'
import { BrandService } from './brand.service'
import { Router } from 'express'
import { createBrandValidation, updateBrandValidation } from '../../middleware/models-validations/brand-validations'
import { getAllModelValidation } from '../../middleware/get-all-model-validation'

export class BrandRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new BrandService()
    const controller = new BrandController(service)

    router.post('/brand', createBrandValidation, controller.createBrand)

    router.get('/brand', getAllModelValidation, controller.getAllBrands)
    router.get('/brand/:id', idValidation, controller.getBrandById)
    router.get('/brand/by-slug/:slug', slugValidation, controller.getBrandBySlug)

    router.put('/brand/:id', updateBrandValidation, controller.updateBrand)

    router.patch('/brand/:id', idValidation, controller.restoreBrand)

    router.delete('/brand/:id', idValidation, controller.deleteBrand)

    return router
  }
}

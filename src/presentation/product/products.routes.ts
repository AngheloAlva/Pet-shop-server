/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { getAllModelValidation } from '../../middleware/get-all-model-validation'
import { slugValidation } from '../../middleware/slug-validation'
import { idValidation } from '../../middleware/id-validation'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { Router } from 'express'
import {
  createProductValidation,
  updateProductValidation
} from '../../middleware/models-validations/product-validations'

export class ProductRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new ProductService()
    const controller = new ProductController(service)

    router.post('/product', createProductValidation, controller.createProduct)

    router.get('/product', getAllModelValidation, controller.getAllProducts)
    router.get('/product/:id', idValidation, controller.getProductById)
    router.get('/product/by-slug/:slug', slugValidation, controller.getProductBySlug)

    router.put('/product/:id', updateProductValidation, controller.updateProduct)

    router.patch('/product/activate/:id', idValidation, controller.restoreProduct)

    router.delete('/product/:id', idValidation, controller.deleteProduct)

    return router
  }
}

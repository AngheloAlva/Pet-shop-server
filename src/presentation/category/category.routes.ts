/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { getAllModelValidation } from '../../middleware/get-all-model-validation'
import { slugValidation } from '../../middleware/slug-validation'
import { idValidation } from '../../middleware/id-validation'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Router } from 'express'
import {
  createCategoryValidations,
  updateCategoryValidations
} from '../../middleware/models-validations/category-validations'
import { idAndAuthIdValidation } from '../../middleware/id-and-authId-validation'

export class CategoryRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new CategoryService()
    const controller = new CategoryController(service)

    router.post('/category', createCategoryValidations, controller.createCategory)

    router.get('/category', getAllModelValidation, controller.getAllCategories)
    router.get('/category/:id', idValidation, controller.getCategoryById)
    router.get('/category/by-slug/:slug', slugValidation, controller.getCategoryBySlug)

    router.put('/category/:id', updateCategoryValidations, controller.updateCategory)
    router.patch('/category/activate/:id', idAndAuthIdValidation, controller.restoreCategory)

    router.delete('/category/:id', idAndAuthIdValidation, controller.deleteCategory)

    return router
  }
}

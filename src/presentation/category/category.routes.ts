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
    router.patch('/category/:id', idValidation, controller.restoreCategory)

    router.delete('/category/:id', idValidation, controller.deleteCategory)

    return router
  }
}

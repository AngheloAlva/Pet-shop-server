/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { createCategoryValidations, updateCategoryValidations } from '../../middleware/models-validations/category-validations'
import { idValidation } from '../../middleware/id-validation'
import { slugValidation } from '../../middleware/slug-validation'

export class CategoryRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new CategoryService()
    const controller = new CategoryController(service)

    router.post('/category', createCategoryValidations, controller.createCategory)

    router.get('/category', controller.getAllCategories)
    router.get('/category/:id', idValidation, controller.getCategoryById)
    router.get('/category/by-slug/:slug', slugValidation, controller.getCategoryBySlug)

    router.put('/category/:id', updateCategoryValidations, controller.updateCategory)
    router.patch('/category/:id', idValidation, controller.restoreCategory)

    router.delete('/category/:id', idValidation, controller.deleteCategory)

    return router
  }
}

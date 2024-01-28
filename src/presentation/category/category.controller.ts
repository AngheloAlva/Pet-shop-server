import { CustomError } from '../../domain/errors/custom.error'

import type { Request, Response } from 'express'
import type { CategoryService } from './category.service'

export class CategoryController {
  constructor (
    private readonly categoryService: CategoryService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, description, image, slug } = req.body

      const category = await this.categoryService.createCategory({
        name, description, image, slug
      })

      return res.status(201).json(category)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getAllCategories = async (req: Request, res: Response): Promise<Response> => {
    try {
      const categories = await this.categoryService.getAllCategories()

      return res.status(200).json(categories)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getCategoryById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      const category = await this.categoryService.getCategoryById(Number(id))

      return res.status(200).json(category)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getCategoryBySlug = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { slug } = req.params

      const category = await this.categoryService.getCategoryBySlug(slug)

      return res.status(200).json(category)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { name, description, image, slug } = req.body

      await this.categoryService.updateCategory(Number(id), {
        name, description, image, slug
      })

      return res.status(200).json({
        message: 'Category updated successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      await this.categoryService.deleteCategory(Number(id))

      return res.status(200).json({
        message: 'Category deleted successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  restoreCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      await this.categoryService.restoreCategory(Number(id))

      return res.status(200).json({
        message: 'Category restored successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

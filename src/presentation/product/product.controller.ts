import { CustomError } from '../../domain/errors/custom.error'

import type { ProductService } from './product.service'
import type { Request, Response } from 'express'

export class ProductController {
  constructor (
    private readonly productService: ProductService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        name,
        slug,
        authId,
        images,
        brandId,
        options,
        petType,
        miniDesc,
        lifeStage,
        categoryId,
        description
      } = req.body

      const product = await this.productService.createProduct({
        name,
        slug,
        authId,
        images,
        options,
        petType,
        brandId,
        miniDesc,
        lifeStage,
        categoryId,
        description
      })

      return res.status(201).json(product)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        limit,
        page,
        search,
        petType,
        maxPrice,
        minPrice,
        lifeStage,
        brandSlug,
        isAvailable,
        categorySlug
      } = req.query

      let isAvailableParsed: boolean

      if (isAvailable === 'true') {
        isAvailableParsed = true
      } else if (isAvailable === 'false') {
        isAvailableParsed = false
      } else {
        isAvailableParsed = true
      }

      const { products, total } = await this.productService.getAllProducts({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        petType: petType as string,
        maxPrice: maxPrice as string,
        minPrice: minPrice as string,
        lifeStage: lifeStage as string,
        brandSlug: brandSlug as string,
        isAvailable: isAvailableParsed,
        categorySlug: categorySlug as string
      })

      return res.status(200).json({
        products,
        total
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      const product = await this.productService.getProductById(Number(id))

      return res.status(200).json(product)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const {
        name,
        slug,
        authId,
        images,
        brandId,
        petType,
        miniDesc,
        lifeStage,
        categoryId,
        description
      } = req.body

      const product = await this.productService.updateProduct(Number(id), authId as string, {
        name,
        slug,
        images,
        petType,
        brandId,
        miniDesc,
        lifeStage,
        categoryId,
        description
      })

      return res.status(200).json(product)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getProductBySlug = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { slug } = req.params

      const product = await this.productService.getProductBySlug(slug)

      return res.status(200).json(product)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { authId } = req.body

      await this.productService.deleteProduct(Number(id), authId as string)

      return res.status(200).json({
        message: 'Product deleted successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  restoreProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { authId } = req.body

      await this.productService.restoreProduct(Number(id), authId as string)

      return res.status(200).json({
        message: 'Product restored successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

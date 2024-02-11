import { CustomError } from '../../domain/errors/custom.error'

import type { BrandService } from './brand.service'
import type { Request, Response } from 'express'

export class BrandController {
  constructor (
    private readonly brandService: BrandService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createBrand = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, slug, image, authId } = req.body

      const brand = await this.brandService.createBrand({
        name,
        slug,
        image,
        authId
      })

      return res.status(201).json(brand)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getAllBrands = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { limit, page, isAvailable } = req.query

      let isAvailableParsed: boolean

      if (isAvailable === 'true') {
        isAvailableParsed = true
      } else if (isAvailable === 'false') {
        isAvailableParsed = false
      } else {
        isAvailableParsed = true
      }

      const { total, brands } = await this.brandService.getAllBrands({
        isAvailable: isAvailableParsed,
        limit: Number(limit),
        page: Number(page)
      })

      return res.status(200).json({
        total,
        brands
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getBrandById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      const brand = await this.brandService.getBrandById(Number(id))

      return res.status(200).json(brand)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getBrandBySlug = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { slug } = req.params

      const brand = await this.brandService.getBrandBySlug(slug)

      return res.status(200).json(brand)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateBrand = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { name, slug, image, authId } = req.body

      const brand = await this.brandService.updateBrand(
        Number(id),
        authId as string,
        { name, slug, image }
      )

      return res.status(200).json(brand)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteBrand = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { authId } = req.body

      await this.brandService.deleteBrand(Number(id), authId as string)

      return res.status(200).json({
        message: 'Brand deleted successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  restoreBrand = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { authId } = req.body

      await this.brandService.restoreBrand(Number(id), authId as string)

      return res.status(200).json({
        message: 'Brand restored successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

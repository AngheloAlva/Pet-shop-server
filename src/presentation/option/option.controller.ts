import { CustomError } from '../../domain/errors/custom.error'

import type { OptionService } from './option.service'
import type { Request, Response } from 'express'

export class OptionController {
  constructor (
    private readonly optionService: OptionService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  updateOption = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { discount, price, stock, authId } = req.body

      await this.optionService.updateOption(Number(id), authId as string, {
        discount, price, stock
      })

      return res.status(200).json({
        message: 'Option updated successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteOption = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { authId } = req.body

      await this.optionService.deleteOption(Number(id), authId as string)

      return res.status(200).json({
        message: 'Option deleted successfully'
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

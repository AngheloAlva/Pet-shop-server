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
      const { discount, price, stock } = req.body

      await this.optionService.updateOption(Number(id), {
        discount, price, stock
      })

      return res.status(204).send()
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteOption = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      await this.optionService.deleteOption(Number(id))

      return res.status(204).send()
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

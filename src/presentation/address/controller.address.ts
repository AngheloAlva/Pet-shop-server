import { CustomError } from '../../domain/errors/custom.error'

import type { AddressService } from './address.service'
import type { Request, Response } from 'express'

export class AddressController {
  constructor (
    private readonly addressService: AddressService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createAddress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        name, number, region, street, userId, commune, zipCode, isApartment, apartmentNumber
      } = req.body

      await this.addressService.createAddress({
        name,
        number,
        region,
        street,
        userId,
        zipCode,
        commune,
        isApartment,
        apartmentNumber
      })

      return res.status(201).json({ message: 'Address created successfully' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getAddressByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params

      const address = await this.addressService.getAddressByUserId(Number(userId))

      return res.status(200).json(address)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getAddressById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      const address = await this.addressService.getAddressById(Number(id))

      return res.status(200).json(address)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateAddress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const {
        apartmentNumber, commune, isApartment, name, number, region, street, zipCode
      } = req.body

      await this.addressService.updateAddress(Number(id), {
        apartmentNumber, commune, isApartment, name, number, region, street, zipCode
      })

      return res.status(200).json({ message: 'Address updated successfully' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteAddress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      await this.addressService.deleteAddress(Number(id))

      return res.status(200).json({ message: 'Address deleted successfully' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { Address, CreateAddress, UpdateAddress } from '../../types/address.types'

export class AddressService {
  async createAddress ({
    apartmentNumber, commune, isApartment, name, number, region, street, zipCode, userId
  }: CreateAddress): Promise<void> {
    try {
      await prisma.address.create({
        data: {
          name,
          number,
          region,
          street,
          userId,
          zipCode,
          commune,
          isApartment,
          apartmentNumber
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAddressByUserId (userId: number): Promise<Address[]> {
    try {
      const address = await prisma.address.findMany({
        where: {
          userId
        }
      })
      if (address === null) throw CustomError.notFound('Address not found')

      return address
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getAddressById (id: number): Promise<Address> {
    try {
      const address = await prisma.address.findUnique({
        where: {
          id
        }
      })
      if (address === null) throw CustomError.notFound('Address not found')

      return address
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async updateAddress (id: number, {
    apartmentNumber, commune, isApartment, name, number, region, street, zipCode
  }: UpdateAddress): Promise<void> {
    try {
      const updatedData: UpdateAddress = {}

      if (name != null) updatedData.name = name
      if (number != null) updatedData.number = number
      if (region != null) updatedData.region = region
      if (street != null) updatedData.street = street
      if (zipCode != null) updatedData.zipCode = zipCode
      if (commune != null) updatedData.commune = commune
      if (isApartment != null) updatedData.isApartment = isApartment
      if (apartmentNumber != null) updatedData.apartmentNumber = apartmentNumber

      await prisma.address.update({
        where: {
          id
        },
        data: {
          ...updatedData
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async deleteAddress (id: number): Promise<void> {
    try {
      await prisma.address.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}

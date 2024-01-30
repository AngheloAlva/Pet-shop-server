/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import { AddressService } from './address.service'
import { AddressController } from './controller.address'
import { createAddressValidation, getAddressByUserIdValidation, updateAddressValidation } from '../../middleware/models-validations/address-validations'
import { idValidation } from '../../middleware/id-validation'

export class AddressRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new AddressService()
    const controller = new AddressController(service)

    router.post('/address', createAddressValidation, controller.createAddress)

    router.get('/address/by-user/:userId', getAddressByUserIdValidation, controller.getAddressByUserId)
    router.get('/address/:id', idValidation, controller.getAddressById)

    router.put('/address/:id', updateAddressValidation, controller.updateAddress)

    router.delete('/address/:id', idValidation, controller.deleteAddress)

    return router
  }
}

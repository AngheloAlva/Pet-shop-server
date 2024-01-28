/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { idValidation } from '../../middleware/id-validation'
import { updateOptionValidation } from '../../middleware/models-validations/option-validations'
import { OptionController } from './option.controller'
import { OptionService } from './option.service'
import { Router } from 'express'

export class OptionRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new OptionService()
    const controller = new OptionController(service)

    router.put('/:id', updateOptionValidation, controller.updateOption)

    router.delete('/:id', idValidation, controller.deleteOption)

    return router
  }
}

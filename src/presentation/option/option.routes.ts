/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { updateOptionValidation } from '../../middleware/models-validations/option-validations'
import { idAndAuthIdValidation } from '../../middleware/id-and-authId-validation'
import { OptionController } from './option.controller'
import { OptionService } from './option.service'
import { Router } from 'express'

export class OptionRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new OptionService()
    const controller = new OptionController(service)

    router.put('/option/:id', updateOptionValidation, controller.updateOption)

    router.delete('/option/:id', idAndAuthIdValidation, controller.deleteOption)

    return router
  }
}

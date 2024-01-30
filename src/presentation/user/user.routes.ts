/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Router } from 'express'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { idValidation } from '../../middleware/id-validation'
import { createUserValidation, emailValidation, updateUserValidation } from '../../middleware/models-validations/user-validations'
import { getAllModelValidation } from '../../middleware/get-all-model-validation'

export class UserRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new UserService()
    const controller = new UserController(service)

    router.post('/user', createUserValidation, controller.createUser)

    router.get('/user', getAllModelValidation, controller.getAllUsers)
    router.get('/user/:id', idValidation, controller.getUserById)
    router.get('/user/by-email/:email', emailValidation, controller.getUserByEmail)

    router.put('/user/:id', updateUserValidation, controller.updateUser)
    router.patch('/user/:id', idValidation, controller.activateUser)

    router.delete('/user/:id', idValidation, controller.deleteUser)

    return router
  }
}
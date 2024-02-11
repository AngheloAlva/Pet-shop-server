/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { authIdValidation } from '../../middleware/get-all-model-validation'
import { idValidation } from '../../middleware/id-validation'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Router } from 'express'
import {
  emailValidation,
  createUserValidation,
  updateUserValidation,
  getAllUsersValidation
} from '../../middleware/models-validations/user-validations'

export class UserRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new UserService()
    const controller = new UserController(service)

    router.post('/user', createUserValidation, controller.createUser)

    router.get('/user', getAllUsersValidation, controller.getAllUsers)
    router.get('/user/:authId', authIdValidation, controller.getUserById)
    router.get('/user/by-email/:email', emailValidation, controller.getUserByEmail)

    router.put('/user/:authId', updateUserValidation, controller.updateUser)
    router.patch('/user/activate/:id', idValidation, controller.activateUser)

    router.delete('/user/:id', idValidation, controller.deleteUser)

    return router
  }
}

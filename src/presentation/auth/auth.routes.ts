// /* eslint-disable @typescript-eslint/no-misused-promises */
// /* eslint-disable @typescript-eslint/no-extraneous-class */

// import { AuthController } from './auth.controller'
// import { AuthService } from './auth.service'
// import { Router } from 'express'
// import {
//   handleResetPasswordRequestValidation,
//   loginValidation,
//   resetPasswordValidation,
//   verifyEmailValidation
// } from '../../middleware/models-validations/auth-validations'

// export class AuthRoutes {
//   static get routes (): Router {
//     const router = Router()
//     const service = new AuthService()
//     const controller = new AuthController(service)

//     router.post('/auth/login', loginValidation, controller.login)
//     router.post('/auth/refresh-access-token', controller.refreshAccessToken)
//     router.post('/auth/logout', controller.logout)
//     router.post('/auth/verify-email', verifyEmailValidation, controller.verifyEmail)
//     router.post('/auth/forgot-password', handleResetPasswordRequestValidation, controller.handlePasswordResetRequest)
//     router.post('/auth/reset-password', resetPasswordValidation, controller.resetPassword)

//     return router
//   }
// }

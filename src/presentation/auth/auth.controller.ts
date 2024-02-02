// import { CustomError } from '../../domain/errors/custom.error'
// import { envs } from '../../config/envs'

// import type { AuthService } from './auth.service'
// import type { Request, Response } from 'express'

// export class AuthController {
//   constructor (
//     private readonly authService: AuthService
//   ) {}

//   private readonly handleError = (error: unknown, res: Response): Response => {
//     if (error instanceof CustomError) {
//       return res.status(error.statusCode).json({ message: error.message })
//     }

//     return res.status(500).json({ message: 'Internal server error' })
//   }

//   login = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { email, password } = req.body

//       const { accessToken, refreshToken } = await this.authService.login({ email, password })

//       res.cookie('accessToken', accessToken, {
//         httpOnly: true,
//         secure: envs.NODE_ENV === 'production',
//         sameSite: 'strict'
//       })

//       res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: envs.NODE_ENV === 'production',
//         sameSite: 'strict'
//       })

//       return res.status(200).json({
//         message: 'Login successfully'
//       })
//     } catch (error) {
//       return this.handleError(error, res)
//     }
//   }

//   refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { refreshToken } = req.cookies

//       const { accessToken } = await this.authService.refreshAccessToken(refreshToken as string)

//       res.cookie('accessToken', accessToken, {
//         httpOnly: true,
//         secure: envs.NODE_ENV === 'production',
//         sameSite: 'strict'
//       })

//       return res.status(200).json({
//         message: 'Access token refreshed'
//       })
//     } catch (error) {
//       return this.handleError(error, res)
//     }
//   }

//   logout = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       res.clearCookie('accessToken')
//       res.clearCookie('refreshToken')

//       return res.status(200).json({
//         message: 'Logout successfully'
//       })
//     } catch (error) {
//       return this.handleError(error, res)
//     }
//   }

//   verifyEmail = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { email, code } = req.body

//       const { accessToken, refreshToken } = await this.authService.verifyEmail(email as string, code as string)

//       res.cookie('accessToken', accessToken, {
//         httpOnly: true,
//         secure: envs.NODE_ENV === 'production',
//         sameSite: 'strict'
//       })

//       res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: envs.NODE_ENV === 'production',
//         sameSite: 'strict'
//       })

//       return res.status(200).json({
//         message: 'User verified'
//       })
//     } catch (error) {
//       return this.handleError(error, res)
//     }
//   }

//   handlePasswordResetRequest = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { email } = req.body

//       await this.authService.handlePasswordResetRequest(email as string)

//       return res.status(200).json({
//         message: 'Password reset request handled'
//       })
//     } catch (error) {
//       return this.handleError(error, res)
//     }
//   }

//   resetPassword = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { email, newPassword } = req.body

//       await this.authService.resetPassword(email as string, newPassword as string)

//       return res.status(200).json({
//         message: 'Password reset successfully'
//       })
//     } catch (error) {
//       return this.handleError(error, res)
//     }
//   }
// }

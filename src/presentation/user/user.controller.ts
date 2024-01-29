import { CustomError } from '../../domain/errors/custom.error'

import type { UserService } from './user.service'
import type { Request, Response } from 'express'

export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, lastName, name, password, phone, rut } = req.body

      const result = await this.userService.createUser({
        email,
        lastName,
        name,
        password,
        phone,
        rut
      })

      return res.status(201).json(result)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { limit, page, isAvailable } = req.query

      let isActiveParsed: boolean

      if (isAvailable === 'true') {
        isActiveParsed = true
      } else if (isAvailable === 'false') {
        isActiveParsed = false
      } else {
        isActiveParsed = true
      }

      const users = await this.userService.getAllUsers({
        limit: Number(limit),
        page: Number(page),
        isAvailable: isActiveParsed
      })

      return res.status(200).json(users)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      const user = await this.userService.getUserById(Number(id))

      return res.status(200).json(user)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getUserByEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.params

      const user = await this.userService.getUserByEmail(email)

      return res.status(200).json(user)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const { email, lastName, name, password, phone, rut } = req.body

      const result = await this.userService.updateUser(Number(id), {
        email,
        lastName,
        name,
        password,
        phone,
        rut
      })

      return res.status(200).json(result)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      await this.userService.deleteUser(Number(id))

      return res.status(204).json()
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  activateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params

      await this.userService.activateUser(Number(id))

      return res.status(204).json()
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}

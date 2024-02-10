import { body, param } from 'express-validator'
import { validate } from './validation'

export const idAndAuthIdValidation = [
  param('id').notEmpty().isNumeric().withMessage('Id must be a number'),
  body('authId').notEmpty().isString().withMessage('AuthId must be a string'),
  validate
]

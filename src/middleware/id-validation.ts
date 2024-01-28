import { param } from 'express-validator'
import { validate } from './validation'

export const idValidation = [
  param('id').notEmpty().isNumeric().withMessage('Id must be a number'),
  validate
]

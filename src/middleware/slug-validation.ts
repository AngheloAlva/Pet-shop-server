import { param } from 'express-validator'
import { validate } from './validation'

export const slugValidation = [
  param('slug').notEmpty().isString().withMessage('Slug must be a string'),
  validate
]

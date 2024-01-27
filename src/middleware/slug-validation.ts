import { param } from 'express-validator'

export const slugValidation = [
  param('slug').notEmpty().isString().withMessage('Slug must be a string')
]

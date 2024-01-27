import { param } from 'express-validator'

export const idValidation = [
  param('id').notEmpty().isNumeric().withMessage('Id must be a number')
]

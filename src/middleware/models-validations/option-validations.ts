import { body } from 'express-validator'
import { validate } from '../validation'

export const updateOptionValidation = [
  body('authId').isString().notEmpty().withMessage('AuthId is required'),
  body('discount').optional().isInt({ min: 0, max: 100 }),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  validate
]

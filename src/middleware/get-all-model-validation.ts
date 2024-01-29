import { query } from 'express-validator'
import { validate } from './validation'

export const getAllModelValidation = [
  query('isAvailable').isBoolean().withMessage('IsAvailable must be a boolean'),
  query('limit').isNumeric().withMessage('Limit must be a number'),
  query('page').isNumeric().withMessage('Page must be a number'),
  validate
]

import { param, query } from 'express-validator'
import { validate } from '../validation'

export const getOrdersValidations = [
  query('page').notEmpty().isInt({ min: 1 }),
  query('limit').notEmpty().isInt({ min: 1 }),
  validate
]

export const getOrderByUserIdValidations = [
  param('userId').isInt().notEmpty().withMessage('userId must be a number'),
  validate
]

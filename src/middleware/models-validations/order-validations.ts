import { body, param, query } from 'express-validator'
import { validate } from '../validation'

export const getOrdersValidations = [
  query('page').notEmpty().isInt({ min: 1 }),
  query('limit').notEmpty().isInt({ min: 1 }),
  body('authId').isString().notEmpty().withMessage('authId must be a string'),
  validate
]

export const getOrderByUserIdValidations = [
  param('authId').isString().notEmpty().withMessage('userId must be a number'),
  validate
]

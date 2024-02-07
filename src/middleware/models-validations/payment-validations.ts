import { body } from 'express-validator'
import { validate } from '../validation'

const shippingMethods = ['CHILEXPRESS', 'STARKEN', 'CORREOS_CHILE', 'SHOP_PICKUP']

export const createCheckoutSessionValidation = [
  body('authId').isString().notEmpty().withMessage('User id must be a number'),
  body('shippingMethod').notEmpty().isIn(shippingMethods).withMessage('Shipping method must be a string'),
  validate
]

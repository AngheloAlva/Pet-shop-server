import { body } from 'express-validator'
import { validate } from '../validation'

const shippingMethods = ['CHILEXPRESS', 'STARKEN', 'CORREOS_CHILE', 'SHOP_PICKUP']

export const createCheckoutSessionValidation = [
  body('authId').isString().notEmpty().withMessage('User id must be a number'),
  body('orderId').isNumeric().notEmpty().withMessage('Order id must be a number'),
  body('shippingMethod').notEmpty().isIn(shippingMethods).withMessage('Shipping method must be a string'),
  body('productsCart').isArray().notEmpty().withMessage('Products cart must be an array'),
  body('productsCart.*.productId').isNumeric().notEmpty().withMessage('Product id must be a number'),
  body('productsCart.*.optionSelectedIndex').isNumeric().notEmpty().withMessage('Option selected index must be a number'),
  body('productsCart.*.quantity').isNumeric().notEmpty().withMessage('Quantity must be a number'),
  body('productsCart.*.cartId').isNumeric().notEmpty().withMessage('Cart id must be a number'),
  validate
]

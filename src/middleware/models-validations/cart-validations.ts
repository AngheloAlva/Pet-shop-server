import { body } from 'express-validator'
import { validate } from '../validation'

export const userIdValidation = [
  body('userId').isNumeric().withMessage('User id must be a number'),
  validate
]

export const addProductToCartValidation = [
  body('userId').isNumeric().withMessage('User id must be a number'),
  body('cartId').isNumeric().withMessage('Cart id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('optionSelectedIndex').isNumeric().withMessage('Option selected index must be a number'),
  validate
]

export const removeProductFromCartValidation = [
  body('userId').isNumeric().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  validate
]

export const updateProductQuantityValidation = [
  body('userId').isNumeric().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  validate
]

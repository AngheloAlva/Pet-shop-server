import { body, param } from 'express-validator'
import { validate } from '../validation'

export const userIdValidation = [
  body('authId').isString().withMessage('User id must be a number'),
  validate
]

export const getCartValidation = [
  param('authId').isString().withMessage('User id must be a number'),
  validate
]

export const addProductToCartValidation = [
  body('authId').isString().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('optionSelectedIndex').isNumeric().withMessage('Option selected index must be a number'),
  validate
]

export const removeProductFromCartValidation = [
  body('authId').isString().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('optionSelectedIndex').isNumeric().withMessage('Option selected index must be a number'),
  validate
]

export const updateProductQuantityValidation = [
  body('authId').isString().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  validate
]

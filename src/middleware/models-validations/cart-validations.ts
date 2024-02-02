import { body, param } from 'express-validator'
import { validate } from '../validation'

export const userIdValidation = [
  body('authId').isNumeric().withMessage('User id must be a number'),
  validate
]

export const getCartValidation = [
  param('authId').isNumeric().withMessage('User id must be a number'),
  validate
]

export const addProductToCartValidation = [
  body('authId').isNumeric().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('optionSelectedIndex').isNumeric().withMessage('Option selected index must be a number'),
  validate
]

export const removeProductFromCartValidation = [
  body('authId').isNumeric().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  validate
]

export const updateProductQuantityValidation = [
  body('authId').isNumeric().withMessage('User id must be a number'),
  body('productId').isNumeric().withMessage('Product id must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  validate
]

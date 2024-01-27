import { body, param, query } from 'express-validator'

export const createBrandValidation = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('slug').isString().notEmpty().withMessage('Slug is required'),
  body('image').isString().notEmpty().withMessage('Image is required')
]

export const getAllBrandsValidation = [
  query('isAvailable').isBoolean().withMessage('IsAvailable must be a boolean'),
  query('limit').isNumeric().withMessage('Limit must be a number'),
  query('page').isNumeric().withMessage('Page must be a number')
]

export const updateBrandValidation = [
  param('id').isNumeric().optional().withMessage('Id must be a number'),
  body('name').isString().optional().withMessage('Name is required'),
  body('slug').isString().optional().withMessage('Slug is required'),
  body('image').isString().optional().withMessage('Image is required')
]

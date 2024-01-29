import { body, param } from 'express-validator'
import { validate } from '../validation'

export const createBrandValidation = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('slug').isString().notEmpty().withMessage('Slug is required'),
  body('image').isString().notEmpty().withMessage('Image is required'),
  validate
]

export const updateBrandValidation = [
  param('id').isNumeric().optional().withMessage('Id must be a number'),
  body('name').isString().optional().withMessage('Name is required'),
  body('slug').isString().optional().withMessage('Slug is required'),
  body('image').isString().optional().withMessage('Image is required'),
  validate
]

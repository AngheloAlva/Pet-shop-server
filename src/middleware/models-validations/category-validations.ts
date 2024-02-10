import { body, param } from 'express-validator'
import { validate } from '../validation'

const petTypes = ['DOG', 'CAT', 'BIRD', 'FISH', 'REPTILE', 'SMALL_ANIMAL']

export const createCategoryValidations = [
  body('authId').isString().notEmpty().withMessage('AuthId is required'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('image').isString().notEmpty().withMessage('Image is required'),
  body('slug').isString().notEmpty().withMessage('Slug is required'),
  body('petType').isIn(petTypes).notEmpty().withMessage('Pet type is required'),
  validate
]

export const updateCategoryValidations = [
  param('id').isNumeric().notEmpty().withMessage('Id is required'),
  body('authId').isString().notEmpty().withMessage('AuthId is required'),
  body('name').isString().optional(),
  body('description').isString().optional(),
  body('image').isString().optional(),
  body('slug').isString().optional(),
  validate
]

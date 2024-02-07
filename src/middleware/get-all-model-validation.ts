import { query } from 'express-validator'
import { validate } from './validation'

export const getAllModelValidation = [
  query('page').isNumeric().withMessage('Page must be a number'),
  query('limit').isNumeric().withMessage('Limit must be a number'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('isAvailable').isBoolean().withMessage('IsAvailable must be a boolean'),
  query('petType').optional().isString().withMessage('PetType must be a string'),
  query('brandSlug').optional().isString().withMessage('BrandId must be a number'),
  query('maxPrice').optional().isNumeric().withMessage('MaxPrice must be a number'),
  query('minPrice').optional().isNumeric().withMessage('MinPrice must be a number'),
  query('lifeStage').optional().isString().withMessage('LifeStage must be a string'),
  query('categorySlug').optional().isString().withMessage('CategoryId must be a number'),
  validate
]

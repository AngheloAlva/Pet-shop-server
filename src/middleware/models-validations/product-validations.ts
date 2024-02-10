import { body, param } from 'express-validator'
import { validate } from '../validation'

const petTypes = ['DOG', 'CAT', 'BIRD', 'FISH', 'REPTILE', 'SMALL_ANIMAL']
const lifeStages = ['PUPPY', 'ADULT', 'SENIOR', 'KITTEN', 'ALL_LIFE_STAGES']

export const createProductValidation = [
  body('authId').isString().notEmpty().withMessage('AuthId is required'),
  body('name').isString().notEmpty().isLength({ min: 3, max: 255 }),
  body('slug').isString().notEmpty().isLength({ min: 3, max: 255 }),
  body('miniDesc').isString().notEmpty().withMessage('Mini description must be a string'),
  body('description').isArray().notEmpty().withMessage('Description must be an array'),
  body('description.*.title').isString().notEmpty().isLength({ min: 3, max: 255 }),
  body('description.*.content').isString().notEmpty(),
  body('images').isArray().notEmpty().withMessage('Images must be an array'),
  body('brandId').isNumeric().notEmpty().withMessage('Brand id must be a number'),
  body('categoryId').isNumeric().notEmpty().withMessage('Category id must be a number'),
  body('images.*').isString().notEmpty().withMessage('Images must be an array of strings'),
  body('petType').isArray().notEmpty().withMessage('Pet type must be an array'),
  body('petType.*').notEmpty().isIn(petTypes).withMessage('Pet type must be one of: DOG, CAT, BIRD, FISH, REPTILE, SMALL_ANIMAL'),
  body('lifeStage').notEmpty().isIn(lifeStages).withMessage('Life stage must be one of: PUPPY, ADULT, SENIOR, KITTEN'),
  body('options').isArray().notEmpty().withMessage('Options must be an array'),
  body('options.*.name').isString().notEmpty().isLength({ min: 3, max: 255 }),
  body('options.*.price').isNumeric().notEmpty().withMessage('Option price must be a number'),
  body('options.*.stock').isNumeric().notEmpty().withMessage('Option stock must be a number'),
  body('options.*.discount').isNumeric().notEmpty().withMessage('Option discount must be a number'),
  validate
]

export const updateProductValidation = [
  param('id').isNumeric().notEmpty().withMessage('Product id must be a number'),
  body('authId').isString().notEmpty().withMessage('AuthId is required'),
  body('name').optional().isString().notEmpty().isLength({ min: 3, max: 255 }),
  body('slug').optional().isString().notEmpty().isLength({ min: 3, max: 255 }),
  body('miniDesc').optional().isString().notEmpty().isLength({ min: 20, max: 255 }),
  body('description').optional().isString().notEmpty().isLength({ min: 50, max: 1000 }),
  body('images').optional().isArray().notEmpty().withMessage('Images must be an array'),
  body('brandId').optional().isNumeric().notEmpty().withMessage('Brand id must be a number'),
  body('categoryId').optional().isNumeric().notEmpty().withMessage('Category id must be a number'),
  body('images.*').optional().isString().notEmpty().withMessage('Images must be an array of strings'),
  body('petType').optional().notEmpty().isIn(petTypes).withMessage('Pet type must be one of: DOG, CAT, BIRD, FISH, REPTILE, SMALL_ANIMAL'),
  body('lifeStage').optional().notEmpty().isIn(lifeStages).withMessage('Life stage must be one of: PUPPY, ADULT, SENIOR, KITTEN'),
  validate
]

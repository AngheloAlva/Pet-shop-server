import { body, param } from 'express-validator'
import { validate } from '../validation'

export const createUserValidation = [
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('lastName').isString().withMessage('Last name must be a string'),
  body('name').isString().withMessage('Name must be a string'),
  body('password').isString().withMessage('Password must be a string'),
  body('phone').isString().withMessage('Phone must be a string'),
  body('rut').isString().withMessage('Rut must be a string'),
  validate
]

export const updateUserValidation = [
  param('id').isInt().withMessage('Id must be a number'),
  body('email').optional().isEmail().withMessage('Email must be a valid email'),
  body('lastName').optional().isString().withMessage('Last name must be a string'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('password').optional().isString().withMessage('Password must be a string'),
  body('phone').optional().isString().withMessage('Phone must be a string'),
  body('rut').optional().isString().withMessage('Rut must be a string'),
  validate
]

export const emailValidation = [
  param('email').isEmail().withMessage('Email must be a valid email'),
  validate
]

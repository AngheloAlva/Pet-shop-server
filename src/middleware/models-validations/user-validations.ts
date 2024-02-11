import { body, param, query } from 'express-validator'
import { validate } from '../validation'

export const createUserValidation = [
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('authId').isString().withMessage('AuthId must be a string'),
  validate
]

export const getAllUsersValidation = [
  query('limit').notEmpty().isInt({ min: 1 }),
  query('page').notEmpty().isInt({ min: 1 }),
  query('isAvailable').optional().isBoolean().withMessage('IsAvailable must be a boolean'),
  query('authId').optional().isString().withMessage('authId must be a string'),
  validate
]

export const updateUserValidation = [
  param('authId').isString().withMessage('AuthId must be a string'),
  body('email').optional().isEmail().withMessage('Email must be a valid email'),
  body('lastName').optional().isString().withMessage('Last name must be a string'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('password').optional().isString().withMessage('Password must be a string'),
  body('phone').optional().isString().withMessage('Phone must be a string'),
  body('rut').optional().isString().withMessage('Rut must be a string'),
  validate
]

export const verifyEmailValidation = [
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('verificationCode').isString().withMessage('Verification code must be a string'),
  validate
]

export const emailValidation = [
  param('email').isEmail().withMessage('Email must be a valid email'),
  validate
]

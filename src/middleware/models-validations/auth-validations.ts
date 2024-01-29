import { body } from 'express-validator'
import { validate } from '../validation'

export const loginValidation = [
  body('email').isEmail().notEmpty().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).notEmpty().withMessage('Invalid password'),
  validate
]

export const verifyEmailValidation = [
  body('email').isString().notEmpty().withMessage('Invalid token'),
  body('code').isString().notEmpty().withMessage('Invalid token'),
  validate
]

export const handleResetPasswordRequestValidation = [
  body('email').isEmail().notEmpty().withMessage('Invalid email'),
  validate
]

export const resetPasswordValidation = [
  body('newPassword').isLength({ min: 6 }).notEmpty().withMessage('Invalid password'),
  body('email').isString().notEmpty().withMessage('Invalid email'),
  validate
]

import { body, param } from 'express-validator'
import { validate } from '../validation'

export const createAddressValidation = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('number').isString().notEmpty().withMessage('Number is required'),
  body('region').isString().notEmpty().withMessage('Region is required'),
  body('street').isString().notEmpty().withMessage('Street is required'),
  body('authId').isString().notEmpty().withMessage('UserId is required'),
  body('zipCode').isString().notEmpty().withMessage('ZipCode is required'),
  body('commune').isString().notEmpty().withMessage('Commune is required'),
  body('isApartment').isBoolean().notEmpty().withMessage('IsApartment is required'),
  body('apartmentNumber').isString().optional().withMessage('ApartmentNumber is required'),
  validate
]

export const getAddressByUserIdValidation = [
  param('authId').isString().notEmpty().withMessage('UserId is required'),
  validate
]

export const updateAddressValidation = [
  param('id').isNumeric().optional().withMessage('Id is required'),
  body('name').isString().optional().withMessage('Name is required'),
  body('number').isString().optional().withMessage('Number is required'),
  body('region').isString().optional().withMessage('Region is required'),
  body('street').isString().optional().withMessage('Street is required'),
  body('zipCode').isString().optional().withMessage('ZipCode is required'),
  body('commune').isString().optional().withMessage('Commune is required'),
  body('isApartment').isBoolean().optional().withMessage('IsApartment is required'),
  body('apartmentNumber').isString().optional().withMessage('ApartmentNumber is required'),
  validate
]

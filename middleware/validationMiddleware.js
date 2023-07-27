import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js'
import mongoose from 'mongoose'

// Schema
import SchoolLocker from '../models/SchoolLockerModel.js'
import Rumor from '../models/RumorModel.js'
import Newsmonger from '../models/NewsmongerModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith("Can't find")) {
          throw new NotFoundError(errorMessages)
        }

        if (errorMessages[0].startsWith('Not authorized')) {
          throw new UnauthorizedError(errorMessages)
        }

        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateLogin = withValidationErrors([
  body('email').notEmpty().isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
])

export const validateRegisterLocker = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const locker = await SchoolLocker.findOne({ email })
      if (locker) throw new BadRequestError('Email address already used! Please enter another email')
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 })
    .withMessage('Please use strong password: min 8 characters , min 1 uppercase letter, min 1 symbol'),
  body('title').notEmpty().withMessage('title is required').trim(),
  body('student').notEmpty().withMessage('student name is required').trim(),
  body('schoolName').notEmpty().withMessage('school name is required').trim(),
  body('classroom').notEmpty().withMessage('classroom is required').trim(),
  body('img').optional().isString().withMessage('image must be a string'),
  body('privacy').optional().isString().withMessage('must be a string'),
])

export const validateUpdateLocker = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const locker = await SchoolLocker.findOne({ email })
      if (locker && locker._id.toString() !== req.locker.lockerId)
        throw new BadRequestError('Email address already used! Please enter another email')
    }),
  body('title').notEmpty().withMessage('title is required').trim(),
  body('student').notEmpty().withMessage('student name is required').trim(),
  body('schoolName').notEmpty().withMessage('school name is required').trim(),
  body('classroom').notEmpty().withMessage('classroom is required').trim(),
  body('img').optional().isString().withMessage('image must be a string'),
  body('privacy').optional().isString().withMessage('must be a string'),
])

export const validateRumor = withValidationErrors([
  body('title')
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('title must be between 3 and 50 characters')
    .trim(),
  body('content')
    .notEmpty()
    .withMessage('content is required')
    .isLength({ min: 3, max: 150 })
    .withMessage('content must be between 3 and 150 characters')
    .trim(),
  body('likes').optional().isInt({ min: 0 }).withMessage('likes must be a positive integer'),
])

export const validatEmail = withValidationErrors([
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('Invalid MongoDB id')

    const foundLocker = await SchoolLocker.findById(value)
    if (!foundLocker) throw new NotFoundError(`Can't find locker with id: ${value}`)

    const isAdmin = req.locker.role === 'admin'
    const isOwner = req.locker.lockerId === foundLocker._id.toString()
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError('Not authorized to access this route')
    }
  }),
])

export const validateRumorIdParam = withValidationErrors([
  param('rumorId').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('Invalid MongoDB id')

    const foundRumor = await Rumor.findById(value)
    if (!foundRumor) throw new NotFoundError(`Can't find rumor with id: ${value}`)
    const isAdmin = req.locker.role === 'admin'
    const isOwner = req.locker.lockerId === foundRumor.userId.toString()
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError('Not authorized to access this route')
    }
  }),
])

export const validateNewsmongerIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('Invalid MongoDB id')

    const foundSubscription = await Newsmonger.findById(value)
    if (!foundSubscription) throw new NotFoundError(`Can't find subscription with id: ${value}`)
  }),
])

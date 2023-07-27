import { Router } from 'express'
const router = Router()

import {
  getAllSubscriptions,
  subscribeToNewsmongers,
  unsubscribeNewsmongers,
} from '../controllers/newsmongersController.js'
import { validatEmail, validateNewsmongerIdParam } from '../middleware/validationMiddleware.js'
import { authorizePermissions } from '../middleware/authMiddleware.js'

router.route('/').get(authorizePermissions('admin'), getAllSubscriptions).post(validatEmail, subscribeToNewsmongers)
router.route('/:id').delete(validateNewsmongerIdParam, unsubscribeNewsmongers)

export default router

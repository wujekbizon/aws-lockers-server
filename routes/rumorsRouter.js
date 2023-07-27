import { Router } from 'express'
const router = Router({ mergeParams: true })

import {
  getAllRumors,
  getSingleRumor,
  createNewRumor,
  editRumor,
  deleteRumor,
} from '../controllers/rumorsController.js'

import { validateRumor, validateRumorIdParam } from '../middleware/validationMiddleware.js'
import { authorizePermissions } from '../middleware/authMiddleware.js'

router.route('/').get(authorizePermissions('admin'), getAllRumors).post(validateRumor, createNewRumor)
router
  .route('/:rumorId')
  .get(validateRumorIdParam, getSingleRumor)
  .patch(validateRumorIdParam, validateRumor, editRumor)
  .delete(validateRumorIdParam, deleteRumor)

export default router

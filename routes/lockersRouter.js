import { Router } from 'express'
const router = Router()
import {
  getAllLockers,
  getSingleLocker,
  createNewLocker,
  updateLocker,
  deleteLocker,
  login,
  logout,
  getApplicationStats,
} from '../controllers/lockersController.js'
import { validateRegisterLocker, validateLogin, validateUpdateLocker } from '../middleware/validationMiddleware.js'
import { authenticateUser, authorizePermissions } from '../middleware/authMiddleware.js'

router.get('/', authenticateUser, authorizePermissions('admin'), getAllLockers)
router.get('/current-locker', authenticateUser, getSingleLocker)
router.patch('/update-locker', authenticateUser, validateUpdateLocker, updateLocker)
router.delete('/delete-locker', authenticateUser, deleteLocker)
router.get('/admin/app-stats', [authenticateUser, authorizePermissions('admin'), getApplicationStats])

router.post('/register', validateRegisterLocker, createNewLocker)
router.post('/login', validateLogin, login)
router.get('/logout', logout)

export default router

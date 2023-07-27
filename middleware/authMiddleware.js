import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/jwtToken.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError('Authentication invalid!')

  try {
    const { lockerId, role } = verifyJWT(token)
    req.locker = { lockerId, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid!')
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.locker.role)) {
      throw new UnauthorizedError('Not authorized to access this route')
    }
    next()
  }
}

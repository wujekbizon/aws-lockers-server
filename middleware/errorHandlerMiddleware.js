import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  const message = err.message || 'Something went wrong, try again later'
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  res.status(statusCode).json({ message })
}

export default errorHandlerMiddleware

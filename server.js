import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { StatusCodes } from 'http-status-codes'
import { connectToDatabase } from './utils/db.js'

const app = express()

// routers
import lockersRouter from './routes/lockersRouter.js'
import rumorsRouter from './routes/rumorsRouter.js'
import newsmongerRouter from './routes/newsmongersRouter.js'

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/lockers', lockersRouter)
app.use('/api/v1/rumors', authenticateUser, rumorsRouter)
app.use('/api/v1/newsmongers', authenticateUser, newsmongerRouter)

// Not found middleware
app.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
})

// Error Middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100
// connect mongodb with mongoose
try {
  await connectToDatabase('rn-lockers')
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}

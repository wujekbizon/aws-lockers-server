import { StatusCodes } from 'http-status-codes'
import Newsmonger from '../models/NewsmongerModel.js'

export const getAllSubscriptions = async (req, res) => {
  const emails = await Newsmonger.find()
  res.status(StatusCodes.OK).json(emails)
}

export const subscribeToNewsmongers = async (req, res) => {
  const { email } = req.body
  const allEmails = await Newsmonger.find({})
  const isEmailAlreadyRegistered = allEmails.some((item) => {
    return item.email === email
  })

  if (isEmailAlreadyRegistered) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Email address already registered!' })
  }

  const registeredEmail = await Newsmonger.create({ email })
  res.status(StatusCodes.CREATED).json({ message: 'Thank you for signing to our daily newsmonger!', registeredEmail })
}

export const unsubscribeNewsmongers = async (req, res) => {
  const { id } = req.params
  const removedEmail = await Newsmonger.findByIdAndDelete(id)
  res
    .status(StatusCodes.OK)
    .json({ message: 'Unsubscribed successfully from newsmongers', unsubscribedEmail: removedEmail })
}

import { StatusCodes } from 'http-status-codes'
import Rumor from '../models/RumorModel.js'

export const getAllRumors = async (req, res) => {
  const { lockerId } = req.locker
  const rumors = await Rumor.find({ userId: lockerId })
  res.status(StatusCodes.OK).json(rumors)
}

export const getSingleRumor = async (req, res) => {
  const { rumorId } = req.params
  const foundRumor = await Rumor.findById(rumorId)
  res.status(StatusCodes.OK).json(foundRumor)
}

export const createNewRumor = async (req, res) => {
  const { lockerId } = req.locker
  const { title, content } = req.body
  const rumor = await Rumor.create({ userId: lockerId, title, content })
  res.status(StatusCodes.CREATED).json({ message: 'Rumor created', rumor })
}

export const editRumor = async (req, res) => {
  const { rumorId } = req.params
  const updatedRumor = req.body
  const editedRumor = await Rumor.findByIdAndUpdate(rumorId, updatedRumor, { new: true })
  res.status(StatusCodes.OK).json({ message: 'Rumor has been updated', editedRumor })
}

export const deleteRumor = async (req, res) => {
  const { rumorId } = req.params
  const removedRumor = await Rumor.findByIdAndDelete(rumorId)
  res.status(StatusCodes.OK).json({ message: 'Rumor successfully deleted!', rumor: removedRumor })
}

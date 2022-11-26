import User from '../models/userModel.js';
import * as baseController from '../controllers/baseController.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getAllUsers = baseController.getAll(User);
export const getUserById = baseController.getOneById(User);
export const createUser = baseController.createOne(User);
export const updateUser = baseController.updateOne(User);
export const deleteUser = baseController.deleteOne(User);

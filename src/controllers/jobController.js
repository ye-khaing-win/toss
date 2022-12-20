import Job from '../models/jobModel.js';
import * as baseController from './baseController.js';

export const getAllJobs = baseController.getAll(Job);
export const getJobById = baseController.getOneById(Job);
export const createJob = baseController.createOne(Job);
export const updateJob = baseController.updateOne(Job);
export const deleteJob = baseController.deleteOne(Job);

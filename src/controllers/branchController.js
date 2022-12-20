import Branch from '../models/branchModel.js';
import * as baseController from './baseController.js';

export const getAllBranches = baseController.getAll(Branch);
export const getBranchById = baseController.getOneById(Branch);
export const createBranch = baseController.createOne(Branch);
export const updateBranch = baseController.updateOne(Branch);
export const deleteBranch = baseController.deleteOne(Branch);

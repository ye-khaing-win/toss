import express from 'express';
import * as branchController from '../controllers/branchController.js';

const router = express.Router();

router
  .route('/')
  .get(branchController.getAllBranches)
  .post(branchController.createBranch);

router
  .route('/:id')
  .get(branchController.getBranchById)
  .patch(branchController.updateBranch)
  .delete(branchController.deleteBranch);

export default router;

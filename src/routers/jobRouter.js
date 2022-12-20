import express from 'express';
import * as jobController from '../controllers/jobController.js';

const router = express.Router();

router.route('/').get(jobController.getAllJobs).post(jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJobById)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

export default router;

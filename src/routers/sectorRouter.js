import express from 'express';
import * as sectorController from '../controllers/sectorController.js';

const router = express.Router();

router
  .route('/')
  .get(sectorController.getAllSectors)
  .post(sectorController.createSector);

router
  .route('/:id')
  .get(sectorController.getSectorById)
  .patch(sectorController.updateSector)
  .delete(sectorController.deleteSector);

export default router;

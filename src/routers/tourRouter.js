import express from 'express';
import * as tourController from '../controllers/tourController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// PROTECT THE ROUTE
router.use(authMiddleware.protect);

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(authMiddleware.authorize('tour', 'list'), tourController.getAllTours)
  .post(authMiddleware.authorize('tour', 'create'), tourController.createTour);
router
  .route('/:id')
  .get(authMiddleware.authorize('tour', 'detail'), tourController.getTourById)
  .patch(authMiddleware.authorize('tour', 'update'), tourController.updateTour)
  .delete(
    authMiddleware.authorize('tour', 'delete'),
    tourController.deleteTour
  );

export default router;

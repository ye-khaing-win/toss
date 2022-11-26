import Tour from "../models/tourModel.js";
import * as baseController from "./baseController.js";

export const getAllTours = baseController.getAll(Tour);
export const getTourById = baseController.getOneById(Tour);
export const createTour = baseController.createOne(Tour);
export const updateTour = baseController.updateOne(Tour);
export const deleteTour = baseController.deleteOne(Tour);

export const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";

  next();
};

import Sector from '../models/sectorModel.js';
import * as baseController from './baseController.js';

export const getAllSectors = baseController.getAll(Sector);
export const getSectorById = baseController.getOneById(Sector);
export const createSector = baseController.createOne(Sector);
export const updateSector = baseController.updateOne(Sector);
export const deleteSector = baseController.deleteOne(Sector);

import Role from "../models/roleModel.js";
import * as baseController from "./baseController.js";

export const getAllRoles = baseController.getAll(Role);
export const getRoleById = baseController.getOneById(Role);
export const createRole = baseController.createOne(Role);
export const updateRole = baseController.updateOne(Role);
export const deleteRole = baseController.deleteOne(Role);

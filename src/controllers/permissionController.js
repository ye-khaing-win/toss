import Permission from "../models/permissionModel.js";
import * as baseController from "./baseController.js";

export const getAllPermissions = baseController.getAll(Permission);
export const getPermissionById = baseController.getOneById(Permission);
export const createPermission = baseController.createOne(Permission);
export const updatePermission = baseController.updateOne(Permission);
export const deletePermission = baseController.deleteOne(Permission);

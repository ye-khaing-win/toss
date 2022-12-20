import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const count = await Model.countDocuments();

    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .select()
      .populate()
      .paginate(count);

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      result: docs.length,
      pagination: features.pagination,
      data: docs,
    });
  });

export const getOneById = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.findById(req.params.id), req.query)
      .select()
      .populate();

    const doc = await features.query;

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Check the user in req object, and set createdBy and companyId by default
    if (req.user) {
      req.body.createdBy = req.user._id;
      req.body.companyId = req.user.companyId;
    }

    const newDoc = await Model.create(req.body);

    const features = new APIFeatures(Model.findById(newDoc._id), req.query)
      .select()
      .populate();

    const doc = await features.query;

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc)
      return next(new AppError('No tour found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: updatedDoc,
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const isDeletable =
      typeof Model.checkIsDeletable === 'function'
        ? await Model.checkIsDeletable(req.params.id)
        : true;

    if (!isDeletable) {
      return next(
        new AppError('This item has already applied, cannot be deleted', 400)
      );
    }

    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc)
      return next(new AppError('No tour found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

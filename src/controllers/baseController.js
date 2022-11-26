import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let query;

    // 1) FILTERING
    // 1.1) Clone Query Object
    const queryClone = { ...req.query };

    // 1.2) Exclude SORT, PAGE, LIMIT and SELECT fields
    const excludedFields = ['sort', 'page', 'limit', 'select'];

    excludedFields.forEach((field) => delete queryClone[field]);

    // 1.3) Replace operators with MONGO operators
    let queryStr = JSON.stringify(queryClone);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);

    // 1.4) Parse query list (with comma) to Array
    const queryClean = {};

    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === 'string' && queryObj[key].includes(',')) {
        const values = queryObj[key].split(',').map((val) => val.trim());

        queryClean[key] = values;
      } else {
        queryClean[key] = queryObj[key];
      }
    });

    query = Model.find(queryClean);

    // 2) SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) SELECTING
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) PAGINATION
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};

    const total = await Model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    // 5) POPULATION
    // 6) FILTERING DELETED DOCUMENTS
    query = query.find({
      isDeleted: { $ne: true },
    });

    const docs = await query;

    res.status(200).json({
      status: 'success',
      result: docs.length,
      pagination,
      data: docs,
    });
  });

export const getOneById = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newDoc,
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
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc)
      return next(new AppError('No tour found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

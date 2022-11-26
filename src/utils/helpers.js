// FILTER OBJECT
export const filterObj = (obj, ...allowedFields) => {
  // 1) Create fresh object
  const newObj = {};

  // 2) Define allowable fields
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  // 3) Return filtered object
  return newObj;
};

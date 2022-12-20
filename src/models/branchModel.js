import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    sectorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Sector',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUAL POPULATION
branchSchema.virtual('jobs', {
  ref: 'Job',
  foreignField: 'branchId',
  localField: '_id',
});

// MIDDLEWARE
branchSchema.pre(/^find/, function (next) {
  this.populate('jobs');

  next();
});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;

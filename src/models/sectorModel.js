import mongoose from 'mongoose';

const sectorSchema = new mongoose.Schema(
  {
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
sectorSchema.virtual('branches', {
  ref: 'Branch',
  foreignField: 'sectorId',
  localField: '_id',
});

// MIDDLEWARE
sectorSchema.pre(/^find/, function (next) {
  this.populate('branches');

  next();
});

const Sector = mongoose.model('Sector', sectorSchema);

export default Sector;

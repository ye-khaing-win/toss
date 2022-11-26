import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: [true, 'Please add coordinates'],
  },
});

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      minLength: [10, 'A tour name must have more or equal than 10 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'Please add duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Please add group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Please add difficulity'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty value ({VALUE}) is not supported',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be less than price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Please add a cover image'],
    },
    images: [String],
    startDates: [Date],
    startLocation: {
      type: LocationSchema,
    },
    locations: {
      type: [LocationSchema],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

TourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', TourSchema);

export default Tour;

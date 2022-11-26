import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please add a type'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    permissions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Permission',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Role = mongoose.model('Role', RoleSchema);

export default Role;

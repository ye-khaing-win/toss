import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
      required: [true, 'Please add a role'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [8, 'Password should have more than or equal 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetWebToken: String,
    passwordResetExpires: Date,
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// ENCRYPT PASSWORD WITH BCRYPT
UserSchema.pre('save', async function (next) {
  // 1) Check the password field is modified
  if (!this.isModified('password')) return next();

  // 2) Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  // 3) Delte password confirm field
  this.passwordConfirm = undefined;

  next();
});

// UPDATE PASSWORD CHANGED TIMESTAMP
UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  console.log('called');
  this.passwordChangedAt = Date.now();

  next();
});

// GENERATE JWT TOKEN
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// CHECK PASSWORD MATCHED
UserSchema.methods.checkPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// CHECK PASSWORD CHANGED AFTER TOKEN ISSUED
UserSchema.methods.checkPasswordChangedAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    return tokenIssuedAt * 1000 < this.passwordChangedAt.getTime();
  }

  return false;
};

// GENERATE RESET PASSWORD TOKEN
UserSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetWebToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', UserSchema);

export default User;

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: 'first name is required',
    },
    lastName: {
      type: String,
      trim: true,
      required: 'last name is required',
    },
    phone: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: 'Email already exists',
      // eslint-disable-next-line no-useless-escape
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required',
    },
    postalCode: {
      type: Number,
      trim: true,
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      required: 'Country is required',
    },
    state: {
      type: String,
      trim: true,
      required: 'State is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    IdImg: {
      type: String,
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: '/img/default.png',
    },
    wallets: {
      usdt: {
        type: String,
      },
      btc: {
        type: String,
      },
    },
    TwoFA: {
      type: Boolean,
      default: false,
    },
    referer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const User =  mongoose.model('User', UserSchema);

export default User;

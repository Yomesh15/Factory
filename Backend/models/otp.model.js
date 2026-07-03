import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OTP", otpSchema);
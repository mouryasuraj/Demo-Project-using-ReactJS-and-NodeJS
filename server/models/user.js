import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
  [
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  {
    timestamps: true,
  }
);

userSchema.methods.signJwt = function (userData) {
  const token = jwt.sign(userData, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;

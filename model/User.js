const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    photo: {
      type: String,
    },
    profileType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = User = mongoose.model("user" /*ref*/, userSchema);

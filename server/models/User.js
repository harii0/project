const mongoose = require("mongoose");
const crypto = require("crypto");
const exp = require("constants");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 16,
    },
    bio: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 12,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin", "doctor"],
      default: "user",
    },
    UnseenNotifications: {
      type: Array,
      default: [],
    },
    SeenNotifications: {
      type: Array,
      default: [],
    },
    resetpasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamp: true },
  { collection: "users" }
);
userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetpasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 5 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

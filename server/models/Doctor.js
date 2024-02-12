const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    rating: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    PhoneNumber: {
      type: String,
      default: "",
    },
    AvalibilityFrom: {
      type: String,
      default: "",
    },
    AvalibilityTo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
  { collection: "doctors" }
);

module.exports = mongoose.model("Doctor", doctorSchema);

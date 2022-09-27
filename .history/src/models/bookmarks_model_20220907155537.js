const mongoose = require("mongoose");
const userModel = require("../models/user_model");
const bookmarkSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, " description is required"],
      minlength: [100, "description length minimum is 100"],
      maxlength: [1000, "description length maximum is 1000"],
      trim: true,
    },

    byUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const mongoose = require("mongoose");
const diseasesSchema = mongoose.Schema(
  {
    diseases: { type: String, required: true },
    food: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
diseasesSchema.virtual("useFullIn", {
  ref: "FoodModel",
  localField: "food",
  foreignField: "name",
  justOne: false,
  // options: {
  // match: {
  //     byUser: this._id,
  // },
  // },
});

const diseasesModel = mongoose.model("diseases", diseasesSchema);
module.exports = diseasesModel;

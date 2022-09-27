const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
  type: {
    type: String,
    enum: [
      "Beans Legumes",
      "Fruits",
      "Grains",
      "NutsSeeds Oils",
      "Seafood",
      "Vegetables",
    ],
    required: true,
    default: "user",
  },

  name: {
    type: String,
    required: true,
    minlength: [3, "name is too short"],
    maxlength: [40, "name is too big"],
  },
  image: {
    type: String,
  },

  description: {
    type: String,
    required: true,
    minlength: [3, "name is too short"],
  },
  NutritionalBenefits: {
    type: String,
  },
  HealthBenefits: {
    type: String,
  },
  ConsumptionTips: {
    type: String,
  },
  Caution: {
    type: String,
  },
});
module.exports = mongoose.model("FoodModel", foodSchema);

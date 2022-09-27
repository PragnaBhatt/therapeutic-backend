const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
type : {
    type: String,
    enum: [
"Beans Legumes",
"Fruits",
"Grains",
"NutsSeeds Oils",
"Seafood",
"Vegetables"






    ],
    required: true,
    default: "user"
},

  name: {
    type: String,
    required: true,
    minlength: [3, "name is too short"],
    maxlength: [40, "name is too big"],
  },
});
module.exports = mongoose.model("FoodModel", foodSchema);

const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
  // category:{
  //     type:mongoose.Schema.ObjectId
  //     ref
  // }
  name: {
    type: String,
    required: true,
    minlength: [3,'name is too short'],
    maxlength: [40,,
  },
});
module.exports = mongoose.model("FoodModel", foodSchema);

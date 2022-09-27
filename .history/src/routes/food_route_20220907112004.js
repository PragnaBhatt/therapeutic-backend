const {
  fetchFoodProducts,
  addFoodProducts,
  updateTimeFoodProducts,
} = require("../controllers/food_controller");
const express = require("express");
const foodRoute = express.Router();
foodRoute.route("/fetchFoodProducts").get(fetchFoodProducts);
foodRoute.route("/addFoodProducts").post(addFoodProducts);
foodRoute.route("/updateTimeFoodProducts").post(updateTimeFoodProducts);

module.exports = foodRoute;

const {
  fetchFoodProducts,
  addFoodProducts,
} = require("../controllers/food_controller");
const express = require("express");
const foodRoute = express.Router();
foodRoute.route("/fetchFoodProducts").get(fetchFoodProducts);
foodRoute.route("/addFoodProducts").post(addFoodProducts);

module.exports = foodRoute;

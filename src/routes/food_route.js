const {
  fetchFoodProducts,
  addFoodProducts,
  updateTimeFoodProducts,
  fetchFoodTypes,
} = require("../controllers/food_controller");
const {
  authBeforeLogin,
} = require("../middlewares/authentication_middleware.js");

const express = require("express");
const foodRoute = express.Router();
foodRoute.route("/fetchFoodProducts").get(authBeforeLogin, fetchFoodProducts);

foodRoute.route("/addFoodProducts").post(addFoodProducts);
foodRoute.route("/updateTimeFoodProducts").put(updateTimeFoodProducts);
foodRoute.route("/fetchFoodTypes").get(fetchFoodTypes);

module.exports = foodRoute;

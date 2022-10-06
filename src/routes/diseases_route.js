const { addDiseases, fetch } = require("../controllers/diseases_controller");

require("../middlewares/authentication_middleware.js");

const express = require("express");
const diseasesRoute = express.Router();

// foodRoute.route("/fetchFoodProducts").get(authBeforeLogin, fetchFoodProducts);

diseasesRoute.route("/add").post(addDiseases);
diseasesRoute.route("/fetch").get(fetch);

// foodRoute.route("/updateTimeFoodProducts").put(updateTimeFoodProducts);
// foodRoute.route("/fetchFoodTypes").get(fetchFoodTypes);

module.exports = diseasesRoute;

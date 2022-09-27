const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
const statusCodes = require("http-status-codes");
require("mongoose-query-random");

const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  const data = await foodModel.find().random(5, true);

  res.status(statusCodes.OK).json({ data });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res
    .status(statusCodes.StatusCodes.CREATED)
    .json({ status: 1, message: "inserted !!" });
});

module.exports = { fetchFoodProducts, addFoodProducts };

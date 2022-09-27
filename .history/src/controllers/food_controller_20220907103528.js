const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
const statusCodes = require("http-status-codes");
const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  res.status(statusCodes.OK).json({ data: "test" });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res
    .status(statusCodes.StatusCodes.cre)
    .json({ status: 1, message: "inserted !!" });
});

module.exports = { fetchFoodProducts, addFoodProducts };

const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
var random = require("mongoose-random");

const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  const data = await foodModel.find({});

  res.status(statusCodes.StatusCodes.OK).json({ total: data.length, data });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res
    .status(statusCodes.StatusCodes.CREATED)
    .json({ status: 1, message: "inserted !!" });
});

module.exports = { fetchFoodProducts, addFoodProducts };

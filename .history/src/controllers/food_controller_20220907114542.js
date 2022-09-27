const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
var random = require("mongoose-random");
const { StatusCodes } = require("http-status-codes");

const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  var skip = Date.now().se;
  const data = await foodModel.find({}).limit(60).skip(32).order;

  res.status(StatusCodes.OK).json({ total: data.length, data });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res.status(StatusCodes.CREATED).json({ status: 1, message: "inserted !!" });
});
const updateTimeFoodProducts = asyncWrapper(async (req, res, next) => {
  const update = await foodModel.updateMany({}, { inc: "1" });

  res.status(StatusCodes.CREATED).json({ status: 1, message: update });
});

module.exports = {
  fetchFoodProducts,
  addFoodProducts,
  updateTimeFoodProducts,
};

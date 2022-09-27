const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
var random = require("mongoose-random");
const { StatusCodes } = require("http-status-codes");

const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  // const data =  foodModel.findRandom().limit(10);

  // res.status(StatusCodes.OK).json({ total: data.length, data });
  foodModel
    .findRandom()
    .limit(10)
    .exec(function (err, songs) {
      console.log(err);
      console.log(songs);
    });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res.status(StatusCodes.CREATED).json({ status: 1, message: "inserted !!" });
});

module.exports = { fetchFoodProducts, addFoodProducts };
